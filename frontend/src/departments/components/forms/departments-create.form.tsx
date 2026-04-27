import { TextInput } from "@mantine/core";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Form, type FormProps } from "~/common/components/form";
import { useCreateDepartmentMutation } from "~/departments/departments.api";
import type { Department } from "~/departments/interfaces/departments.interface";
import { departmentsCreateSchema } from "~/departments/schemas/departments-create.schema";

interface DepartmentsCreateFormProps
  extends Omit<FormProps<Department>, "onError" | "onSuccess"> {
  onError?: (error: FetchBaseQueryError | SerializedError) => void;
  onSuccess?: (data: Department) => void;
}

export function DepartmentsCreateForm({
  onError,
  onSuccess,
  ...props
}: DepartmentsCreateFormProps) {
  const [createDepartment] = useCreateDepartmentMutation();

  const handleSubmit = async (values: Department) => {
    const { error: createDepartmentError, data } =
      await createDepartment(values);

    if (createDepartmentError) {
      onError?.(createDepartmentError);
    } else {
      onSuccess?.(data);
    }
  };

  return (
    <Form
      {...props}
      initialValues={{ name: "" }}
      onSubmit={handleSubmit}
      schema={departmentsCreateSchema}
    >
      {(form) => (
        <div className="flex flex-col gap-3">
          <TextInput label="Nombre" {...form.getInputProps("name")} />
        </div>
      )}
    </Form>
  );
}
