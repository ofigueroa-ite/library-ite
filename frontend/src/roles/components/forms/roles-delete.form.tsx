import { Text } from "@mantine/core";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { Role } from "~/roles/interfaces/role.interface";
import { Form, type FormProps } from "../../../common/components/form";
import { useDeleteRoleMutation } from "../../roles.api";

interface RolesDeleteFormProps extends Omit<FormProps<Role>, "onError"> {
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
