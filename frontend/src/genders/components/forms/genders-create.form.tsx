import { TextInput } from "@mantine/core";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Form, type FormProps } from "~/common/components/form";
import { useCreateGenderMutation } from "~/genders/genders.api";
import type { Gender } from "~/genders/interfaces/genders.interface";
import { gendersCreateSchema } from "~/genders/schemas/genders-create.schema";
import type { User } from "~/users/interfaces/user.interface";

interface GendersCreateFormProps
  extends Omit<FormProps<User>, "onError" | "onSuccess"> {
  onError?: (error: FetchBaseQueryError | SerializedError) => void;
  onSuccess?: (data: Gender) => void;
}

export function GendersCreateForm({
  onError,
  onSuccess,
  ...props
}: GendersCreateFormProps) {
  const [createGender] = useCreateGenderMutation();

  const handleSubmit = async (values: Gender) => {
    const { error: createGenderError, data } = await createGender(values);

    if (createGenderError) {
      onError?.(createGenderError);
    } else {
      onSuccess?.(data);
    }
  };

  return (
    <Form
      {...props}
      initialValues={{ name: "" }}
      onSubmit={handleSubmit}
      schema={gendersCreateSchema}
    >
      {(form) => (
        <div className="flex flex-col gap-3">
          <TextInput label="Nombre" {...form.getInputProps("name")} />
        </div>
      )}
    </Form>
  );
}
