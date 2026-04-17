import { TextInput } from "@mantine/core";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Form } from "~/common/components/form";
import type { User } from "~/users/interfaces/user.interface";
import { usersUpdateSchema } from "~/users/schemas/users-update.schema";
import { useUpdateUserMutation } from "~/users/users.api";

interface UsersUpdateFormProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, "onError"> {
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

  const handleSubmit = async (values: User) => {
    const { error, data } = await updateUser({ data: values, id: userId });
    if (error) {
      onError?.(error);
    }
    if (data) {
      onSuccess?.(data);
    }
  };

  return (
    <Form
      {...props}
      initialValues={data ?? { name: "", surname: "", email: "" }}
      onSubmit={handleSubmit}
      schema={usersUpdateSchema}
    >
      {(form) => (
        <div className="flex flex-col gap-3">
          <TextInput label="Nombre" {...form.getInputProps("name")} />
          <TextInput label="Apellido" {...form.getInputProps("surname")} />
          <TextInput label="Email" {...form.getInputProps("email")} />
        </div>
      )}
    </Form>
  );
}
