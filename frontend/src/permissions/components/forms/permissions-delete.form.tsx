import { Text } from "@mantine/core";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Form, type FormProps } from "../../../common/components/form";
import { useDeletePermissionMutation } from "../../permissions.api";

interface PermissionsDeleteFormProps
  extends Omit<FormProps<Permissions>, "onError"> {
  onError?: (error: FetchBaseQueryError | SerializedError) => void;
  onSuccess?: () => void;
  permissionId: string;
}

export function PermissionsDeleteForm({
  permissionId,
  onError,
  onSuccess,
  ...props
}: PermissionsDeleteFormProps) {
  const [deletePermission] = useDeletePermissionMutation();

  const handleSubmit = async () => {
    const { error } = await deletePermission(permissionId);
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
          <Text>Estás seguro de que quieres eliminar esta permiso?</Text>
        </>
      )}
    </Form>
  );
}
