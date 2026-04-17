import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { isHttpError } from "~/api";
import { UsersCreateForm } from "./components/forms/users-create.form";
import { UsersUpdateForm } from "./components/forms/users-update.form";
import type { User } from "./interfaces/user.interface";

export const openCreateUserModal = () => {
  modals.open({
    title: "Nuevo usuario",
    children: (
      <UsersCreateForm
        onCancel={() => modals.closeAll()}
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
  modals.open({
    title: "Editar usuario",
    children: (
      <UsersUpdateForm
        data={data}
        onCancel={() => {
          modals.closeAll();
        }}
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
