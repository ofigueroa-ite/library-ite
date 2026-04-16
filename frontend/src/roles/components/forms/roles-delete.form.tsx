import { Text } from "@mantine/core";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Form } from "../../../common/components/form";
import { useDeleteRoleMutation } from "../../roles.api";

interface RolesDeleteFormProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, "onError"> {
  onError?: (error: FetchBaseQueryError | SerializedError) => void;
  onSuccess?: () => void;
  roleId: string;
}

export function RolesDeleteForm({
  roleId,
  onError,
  onSuccess,
  ...props
}: RolesDeleteFormProps) {
  const [deleteRole] = useDeleteRoleMutation();

  const handleSubmit = async () => {
    const { error } = await deleteRole(roleId);
    if (error) {
      onError?.(error);
    } else {
      onSuccess?.();
    }
  };
  return (
    <Form onSubmit={handleSubmit} {...props}>
      {() => (
        <>
          <Text>Estás seguro de que quieres eliminar esta rol?</Text>
        </>
      )}
    </Form>
  );
}
