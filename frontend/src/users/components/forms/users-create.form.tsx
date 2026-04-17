import { TextInput } from "@mantine/core";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { api } from "~/api";
import { Form, type FormProps } from "~/common/components/form";
import { RolesInput } from "~/roles/components/inputs/roles.input";
import type { User } from "~/users/interfaces/user.interface";
import { usersCreateSchema } from "~/users/schemas/users-create.schema";
import { useCreateUserMutation } from "~/users/users.api";
import { useCreateUserRoleMutation } from "~/users-roles/users-roles.api";

interface UsersCreateFormProps
  extends Omit<FormProps<User>, "onError" | "onSuccess"> {
  onError?: (error: FetchBaseQueryError | SerializedError) => void;
  onSuccess?: (data: User) => void;
}

export function UsersCreateForm({
  onError,
  onSuccess,
  ...props
}: UsersCreateFormProps) {
  const [createUser] = useCreateUserMutation();
  const [createUserRoles] = useCreateUserRoleMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (values: User) => {
    const { roles, ...user } = values;
    const { error: createUserError, data } = await createUser(user);

    if (createUserError) {
      onError?.(createUserError);
    } else {
      const { error: createUserRoleError } = await createUserRoles({
        userId: data.id,
        roleIds: roles as unknown as string[],
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
      initialValues={{ name: "", surname: "", email: "", roles: [] }}
      onSubmit={handleSubmit}
      schema={usersCreateSchema}
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
