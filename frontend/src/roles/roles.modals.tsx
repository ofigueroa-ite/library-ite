import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { isHttpError } from "../api";
import { RolesCreateForm } from "./components/forms/roles-create.form";
import { RolesDeleteForm } from "./components/forms/roles-delete.form";
import { RolesUpdateForm } from "./components/forms/roles-update.form";
import type { Role } from "./interfaces/role.interface";

export const openCreateRoleModal = () => {
  const formId = crypto.randomUUID();
  modals.openConfirmModal({
    title: "Nuevo rol",
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
      <RolesCreateForm
        id={formId}
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
  const formId = crypto.randomUUID();
  modals.openConfirmModal({
    title: "Editar rol",
    labels: {
      confirm: "Guardar",
      cancel: "Cancelar",
    },
    closeOnConfirm: false,
    confirmProps: {
      form: formId,
      type: "submit",
    },
    children: (
      <RolesUpdateForm
        data={data}
        id={formId}
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
  const formId = crypto.randomUUID();
  modals.openConfirmModal({
    title: "Eliminar rol",
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
      <RolesDeleteForm
        id={formId}
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
