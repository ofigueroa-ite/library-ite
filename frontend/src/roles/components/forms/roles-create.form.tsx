import { NumberInput, TextInput } from "@mantine/core";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Form } from "../../../common/components/form";
import type { Role } from "../../interfaces/role.interface";
import { useCreateRoleMutation } from "../../roles.api";
import { rolesCreateSchema } from "../../schemas/roles-create.schema";

interface RolesCreateFormProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, "onError"> {
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
    <Form
      {...props}
      initialValues={{ name: "", priority: 0 }}
      onSubmit={handleSubmit}
      schema={rolesCreateSchema}
    >
      {(form) => (
        <div className="flex flex-col gap-3">
          <TextInput label="Nombre" {...form.getInputProps("name")} />
          <NumberInput
            allowDecimal={false}
            label="Prioridad"
            trimLeadingZeroesOnBlur
            {...form.getInputProps("priority")}
          />
        </div>
      )}
    </Form>
  );
}
