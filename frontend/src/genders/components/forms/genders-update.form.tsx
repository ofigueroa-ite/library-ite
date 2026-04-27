import { TextInput } from "@mantine/core";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Form, type FormProps } from "~/common/components/form";
import { useUpdateGenderMutation } from "~/genders/genders.api";
import type { Gender } from "~/genders/interfaces/genders.interface";
import { gendersUpdateSchema } from "~/genders/schemas/genders-update.schema";

interface GendersUpdateFormProps extends Omit<FormProps<Gender>, "onError"> {
  data: Partial<Gender>;
  genderId: string;
  onError?: (error: FetchBaseQueryError | SerializedError) => void;
  onSuccess?: (data: Gender) => void;
}

export function GendersUpdateForm({
  data,
  onError,
  onSuccess,
  genderId,
  ...props
}: GendersUpdateFormProps) {
  const [updateGender] = useUpdateGenderMutation();

  const handleSubmit = async (values: Gender) => {
    const { error, data } = await updateGender({ data: values, id: genderId });
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
      initialValues={data ?? { name: "" }}
      onSubmit={handleSubmit}
      schema={gendersUpdateSchema}
    >
      {(form) => (
        <div className="flex flex-col gap-3">
          <TextInput label="Nombre" {...form.getInputProps("name")} />
        </div>
      )}
    </Form>
  );
}
