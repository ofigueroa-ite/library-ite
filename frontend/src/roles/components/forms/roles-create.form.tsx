import { NumberInput, TextInput } from "@mantine/core";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Form, type FormProps } from "../../../common/components/form";
import type { Role } from "../../interfaces/role.interface";
import { useCreateRoleMutation } from "../../roles.api";
import { rolesCreateSchema } from "../../schemas/roles-create.schema";

interface RolesCreateFormProps
  extends Omit<FormProps<Role>, "onError" | "onSuccess"> {
  onError?: (error: FetchBaseQueryError | SerializedError) => void;
  onSuccess?: (data: Role) => void;
}

export function RolesCreateForm({
  onError,
  onSuccess,
  ...props
}: RolesCreateFormProps) {
  const [createRole] = useCreateRoleMutation();

  const handleSubmit = async (values: Role) => {
    const { error, data } = await createRole(values);

    if (error) {
      onError?.(error);
    } else {
      onSuccess?.(data);
    }
  };

  return (
    <Form<Role> {...props} onSubmit={handleSubmit} schema={rolesCreateSchema}>
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
