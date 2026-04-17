import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { isHttpError } from "~/api";
import { UsersCreateForm } from "./components/forms/users-create.form";
import { UsersUpdateForm } from "./components/forms/users-update.form";
import type { User } from "./interfaces/user.interface";

export const openCreateUserModal = () => {
  const formId = crypto.randomUUID();
  modals.openConfirmModal({
    title: "Nuevo usuario",
    labels: { confirm: "Crear", cancel: "Cancelar" },
    closeOnConfirm: false,
    confirmProps: {
      form: formId,
      type: "submit",
    },
    children: (
      <UsersCreateForm
        id={formId}
        onError={(e) => {
          if (isHttpError(e)) {
            if (e.status === 409) {
              notifications.show({
                color: "orange",
                message: "Email ya existe.",
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
            message: "Usuario creado exitosamente.",
          });
          modals.closeAll();
        }}
      />
    ),
  });
};

export const openUpdateUserModal = (userId: string, data: Partial<User>) => {
  const formId = crypto.randomUUID();
  modals.openConfirmModal({
    title: "Editar usuario",
    labels: { confirm: "Guardar", cancel: "Cancelar" },
    closeOnConfirm: false,
    confirmProps: {
      form: formId,
      type: "submit",
    },
    children: (
      <UsersUpdateForm
        data={data}
        id={formId}
        onError={(e) => {
          if (isHttpError(e)) {
            if (e.status === 409) {
              notifications.show({
                color: "orange",
                message: "Email ya existe.",
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
            message: "Usuario actualizado exitosamente.",
          });
          modals.closeAll();
        }}
        userId={userId}
      />
    ),
  });
};
