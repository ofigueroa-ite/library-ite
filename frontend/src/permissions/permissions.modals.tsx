import { modals } from "@mantine/modals";
import { PermissionsCreateForm } from "./components/forms/permissions-create.form";
import { PermissionsDeleteForm } from "./components/forms/permissions-delete.form";

export const openCreatePermissionModal = (roleId: string) => {
  modals.open({
    title: "Nuevo permiso",
    children: (
      <PermissionsCreateForm
        onCancel={() => modals.closeAll()}
        onSuccess={() => modals.closeAll()}
        roleId={roleId}
      />
    ),
  });
};

export const openDeletePermissionModal = (permissionId: string) => {
  modals.open({
    title: "Eliminar permiso",
    children: (
      <PermissionsDeleteForm
        onCancel={() => modals.closeAll()}
        onSuccess={() => modals.closeAll()}
        permissionId={permissionId}
      />
    ),
  });
};
