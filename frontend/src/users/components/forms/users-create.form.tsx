import { TextInput } from "@mantine/core";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Form } from "~/common/components/form";
import type { User } from "~/users/interfaces/user.interface";
import { usersCreateSchema } from "~/users/schemas/users-create.schema";
import { useCreateUserMutation } from "~/users/users.api";

interface UsersCreateFormProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, "onError"> {
  onError?: (error: FetchBaseQueryError | SerializedError) => void;
  onSuccess?: (data: User) => void;
}

export function UsersCreateForm({
  onError,
  onSuccess,
  ...props
}: UsersCreateFormProps) {
  const [createUser] = useCreateUserMutation();

  const handleSubmit = async (values: User) => {
    const { error, data } = await createUser(values);

    if (error) {
      onError?.(error);
    } else {
      onSuccess?.(data);
    }
  };

  return (
    <Form
      {...props}
      initialValues={{ name: "", surname: "", email: "" }}
      onSubmit={handleSubmit}
      schema={usersCreateSchema}
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
