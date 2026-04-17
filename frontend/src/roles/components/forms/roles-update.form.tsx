import { NumberInput, TextInput } from "@mantine/core";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Form, type FormProps } from "../../../common/components/form";
import type { Role } from "../../interfaces/role.interface";
import { useUpdateRoleMutation } from "../../roles.api";
import { rolesUpdateSchema } from "../../schemas/roles-update.schema";

interface RolesUpdateFormProps extends Omit<FormProps<Role>, "onError"> {
  data: Partial<Role>;
  onError?: (error: FetchBaseQueryError | SerializedError) => void;
  onSuccess?: (data: Role) => void;
  roleId: string;
}

export function RolesUpdateForm({
  onError,
  onSuccess,
  roleId,
  data,
  ...props
}: RolesUpdateFormProps) {
  const [updateRole] = useUpdateRoleMutation();

  const handleSubmit = async (values: Role) => {
    const { error, data } = await updateRole({ data: values, id: roleId });

    if (error) {
      onError?.(error);
    } else {
      onSuccess?.(data);
    }
  };

  return (
    <Form
      {...props}
      initialValues={data}
      onSubmit={handleSubmit}
      schema={rolesUpdateSchema}
    >
      {(form) => (
        <>
          <TextInput label="Nombre" {...form.getInputProps("name")} />
          <NumberInput
            allowDecimal={false}
            label="Prioridad"
            trimLeadingZeroesOnBlur
            {...form.getInputProps("priority")}
          />
        </>
      )}
    </Form>
  );
}
