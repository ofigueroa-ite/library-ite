import { NumberInput, TextInput } from "@mantine/core";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Form } from "../../../common/components/form";
import type { Role } from "../../interfaces/role.interface";
import { useUpdateRoleMutation } from "../../roles.api";
import { rolesUpdateSchema } from "../../schemas/roles-update.schema";

interface RolesUpdateFormProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, "onError"> {
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
      initialValues={data ?? { name: "", priority: 0 }}
      onSubmit={handleSubmit}
      schema={rolesUpdateSchema}
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
