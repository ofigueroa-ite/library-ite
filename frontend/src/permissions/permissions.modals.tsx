import { modals } from "@mantine/modals";
import { PermissionsCreateForm } from "./components/forms/permissions-create.form";
import { PermissionsDeleteForm } from "./components/forms/permissions-delete.form";

export const openCreatePermissionModal = (roleId: string) => {
  const formId = crypto.randomUUID();
  modals.openConfirmModal({
    title: "Nuevo permiso",
    labels: {
      confirm: "Crear",
      cancel: "Cancelar",
    },
    closeOnConfirm: false,
    confirmProps: {
      form: formId,
      type: "submit",
    },
    children: (
      <PermissionsCreateForm
        id={formId}
        onSuccess={() => modals.closeAll()}
        roleId={roleId}
      />
    ),
  });
};

export const openDeletePermissionModal = (permissionId: string) => {
  const formId = crypto.randomUUID();
  modals.openConfirmModal({
    title: "Eliminar permiso",
    labels: {
      confirm: "Eliminar",
      cancel: "Cancelar",
    },
    closeOnConfirm: false,
    confirmProps: {
      form: formId,
      type: "submit",
      color: "red",
    },
    children: (
      <PermissionsDeleteForm
        id={formId}
        onSuccess={() => modals.closeAll()}
        permissionId={permissionId}
      />
    ),
  });
};
