import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { isHttpError } from "../api";
import { RolesCreateForm } from "./components/forms/roles-create.form";
import { RolesDeleteForm } from "./components/forms/roles-delete.form";
import { RolesUpdateForm } from "./components/forms/roles-update.form";
import type { Role } from "./interfaces/role.interface";

export const openCreateRoleModal = () => {
  modals.open({
    title: "Nuevo rol",
    children: (
      <RolesCreateForm
        onCancel={() => modals.closeAll()}
        onError={(e) => {
          if (isHttpError(e)) {
            if (e.status === 409) {
              notifications.show({
                color: "orange",
                message: "Prioridad y/o nombre ya existen.",
              });
            }
            if (e.status === 500) {
              notifications.show({
                color: "red",
                message: "Error interno del servidor.",
              });
            }
          }
        }}
        onSuccess={() => {
          notifications.show({
            color: "teal",
            message: "Rol creado exitosamente.",
          });
          modals.closeAll();
        }}
      />
    ),
  });
};

export const openUpdateRoleModal = (roleId: string, data: Partial<Role>) => {
  modals.open({
    title: "Editar rol",
    children: (
      <RolesUpdateForm
        data={data}
        onCancel={() => modals.closeAll()}
        onSuccess={() => {
          notifications.show({
            color: "green",
            message: "Rol actualizado exitosamente.",
          });
          modals.closeAll();
        }}
        roleId={roleId}
      />
    ),
  });
};

export const openDeleteRoleModal = (roleId: string) => {
  modals.open({
    title: "Eliminar rol",
    children: (
      <RolesDeleteForm
        onCancel={() => modals.closeAll()}
        onSuccess={() => {
          notifications.show({
            color: "green",
            message: "Rol eliminado exitosamente.",
          });
          modals.closeAll();
        }}
        roleId={roleId}
      />
    ),
  });
};
