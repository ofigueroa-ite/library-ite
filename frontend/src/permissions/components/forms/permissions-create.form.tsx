import { Switch } from "@mantine/core";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { CaslActionSelect } from "../../../casl/components/casl-action-select";
import { CaslSubjectSelect } from "../../../casl/components/casl-subject-select";
import { Form } from "../../../common/components/form";
import type { Permissions } from "../../interfaces/permissions.interface";
import { useCreatePermissionsMutation } from "../../permissions.api";
import { permissionsCreateSchema } from "../../schemas/permissions-create.schema";

interface PermissionsCreateFormProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, "onError"> {
  onError?: (error: FetchBaseQueryError | SerializedError) => void;
  onSuccess?: (data: Permissions) => void;
  roleId: string;
}

export function PermissionsCreateForm({
  roleId,
  onError,
  onSuccess,
  ...props
}: PermissionsCreateFormProps) {
  const [createPermission] = useCreatePermissionsMutation();

  const handleSubmit = async (values: Permissions) => {
    const { error, data } = await createPermission({ ...values, roleId });

    if (error) {
      onError?.(error);
    } else {
      onSuccess?.(data);
    }
  };

  return (
    <Form
      {...props}
      initialValues={{ subject: "", action: "", inverted: false }}
      onSubmit={handleSubmit}
      schema={permissionsCreateSchema}
    >
      {(form) => (
        <div className="flex flex-col gap-3">
          <CaslActionSelect label="Acción" {...form.getInputProps("action")} />
          <CaslSubjectSelect label="Tema" {...form.getInputProps("subject")} />
          <Switch
            label="Invertido"
            {...form.getInputProps("inverted", { type: "checkbox" })}
          />
        </div>
      )}
    </Form>
  );
}
