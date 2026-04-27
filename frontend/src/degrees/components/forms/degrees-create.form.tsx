import { TextInput } from "@mantine/core";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Form, type FormProps } from "~/common/components/form";
import { useCreateDegreeMutation } from "~/degrees/degrees.api";
import type { Degree } from "~/degrees/interfaces/degrees.interface";
import { degreesCreateSchema } from "~/degrees/schemas/degrees-create.schema";

interface DegreesCreateFormProps
  extends Omit<FormProps<Degree>, "onError" | "onSuccess"> {
  onError?: (error: FetchBaseQueryError | SerializedError) => void;
  onSuccess?: (data: Degree) => void;
}

export function DegreesCreateForm({
  onError,
  onSuccess,
  ...props
}: DegreesCreateFormProps) {
  const [createDegree] = useCreateDegreeMutation();

  const handleSubmit = async (values: Degree) => {
    const { error: createDegreeError, data } = await createDegree(values);

    if (createDegreeError) {
      onError?.(createDegreeError);
    } else {
      onSuccess?.(data);
    }
  };

  return (
    <Form
      {...props}
      initialValues={{ name: "" }}
      onSubmit={handleSubmit}
      schema={degreesCreateSchema}
    >
      {(form) => (
        <div className="flex flex-col gap-3">
          <TextInput label="Nombre" {...form.getInputProps("name")} />
        </div>
      )}
    </Form>
  );
}
