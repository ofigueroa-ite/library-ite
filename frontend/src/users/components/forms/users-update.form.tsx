import { TextInput } from "@mantine/core";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { api } from "~/api";
import { Form, type FormProps } from "~/common/components/form";
import { RolesInput } from "~/roles/components/inputs/roles.input";
import type { User } from "~/users/interfaces/user.interface";
import { usersUpdateSchema } from "~/users/schemas/users-update.schema";
import { useUpdateUserMutation } from "~/users/users.api";
import { useCreateUserRoleMutation } from "~/users-roles/users-roles.api";

interface UsersUpdateFormProps extends Omit<FormProps<User>, "onError"> {
  data: Partial<User>;
  onError?: (error: FetchBaseQueryError | SerializedError) => void;
  onSuccess?: (data: User) => void;
  userId: string;
}

export function UsersUpdateForm({
  data,
  onError,
  onSuccess,
  userId,
  ...props
}: UsersUpdateFormProps) {
  const [updateUser] = useUpdateUserMutation();
  const [createUserRoles] = useCreateUserRoleMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (values: User) => {
    const { error, data } = await updateUser({ data: values, id: userId });
    if (error) {
      onError?.(error);
    }
    if (data) {
      const { error: createUserRoleError } = await createUserRoles({
        userId: data.id,
        roleIds: values.roles as unknown as string[],
      });

      if (createUserRoleError) {
        onError?.(createUserRoleError);
      } else {
        dispatch(api.util.invalidateTags(["Users"]));
        onSuccess?.(data);
      }
    }
  };

  return (
    <Form
      {...props}
      initialValues={
        data
          ? {
              name: data.name,
              surname: data.surname,
              email: data.email,
              roles: data.roles?.map((r) => r.id),
            }
          : { name: "", surname: "", email: "", roles: [] }
      }
      onSubmit={handleSubmit}
      schema={usersUpdateSchema}
    >
      {(form) => (
        <div className="flex flex-col gap-3">
          <TextInput label="Nombre" {...form.getInputProps("name")} />
          <TextInput label="Apellido" {...form.getInputProps("surname")} />
          <TextInput label="Email" {...form.getInputProps("email")} />
          <RolesInput label="Roles" {...form.getInputProps("roles")} />
        </div>
      )}
    </Form>
  );
}
