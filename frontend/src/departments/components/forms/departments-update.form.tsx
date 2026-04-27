import { TextInput } from "@mantine/core";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Form, type FormProps } from "~/common/components/form";
import { useUpdateDepartmentMutation } from "~/departments/departments.api";
import type { Department } from "~/departments/interfaces/departments.interface";
import { departmentsUpdateSchema } from "~/departments/schemas/departments-update.schema";

interface DepartmentsUpdateFormProps
  extends Omit<FormProps<Department>, "onError"> {
  data: Partial<Department>;
  departmentId: string;
  onError?: (error: FetchBaseQueryError | SerializedError) => void;
  onSuccess?: (data: Department) => void;
}

export function DepartmentsUpdateForm({
  data,
  onError,
  onSuccess,
  departmentId,
  ...props
}: DepartmentsUpdateFormProps) {
  const [updateDepartment] = useUpdateDepartmentMutation();

  const handleSubmit = async (values: Department) => {
    const { error, data } = await updateDepartment({
      data: values,
      id: departmentId,
    });
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
      schema={departmentsUpdateSchema}
    >
      {(form) => (
        <div className="flex flex-col gap-3">
          <TextInput label="Nombre" {...form.getInputProps("name")} />
        </div>
      )}
    </Form>
  );
}
