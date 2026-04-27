import { TextInput } from "@mantine/core";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Form, type FormProps } from "~/common/components/form";
import { useUpdateDegreeMutation } from "~/degrees/degrees.api";
import type { Degree } from "~/degrees/interfaces/degrees.interface";
import { degreesUpdateSchema } from "~/degrees/schemas/degrees-update.schema";

interface DegreesUpdateFormProps extends Omit<FormProps<Degree>, "onError"> {
  data: Partial<Degree>;
  degreeId: string;
  onError?: (error: FetchBaseQueryError | SerializedError) => void;
  onSuccess?: (data: Degree) => void;
}

export function DegreesUpdateForm({
  data,
  onError,
  onSuccess,
  degreeId,
  ...props
}: DegreesUpdateFormProps) {
  const [updateDegree] = useUpdateDegreeMutation();

  const handleSubmit = async (values: Degree) => {
    const { error, data } = await updateDegree({ data: values, id: degreeId });
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
      schema={degreesUpdateSchema}
    >
      {(form) => (
        <div className="flex flex-col gap-3">
          <TextInput label="Nombre" {...form.getInputProps("name")} />
        </div>
      )}
    </Form>
  );
}
