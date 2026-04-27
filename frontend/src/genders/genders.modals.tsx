import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { isHttpError } from "~/api";
import { GendersCreateForm } from "./components/forms/genders-create.form";
import { GendersUpdateForm } from "./components/forms/genders-update.form";
import type { Gender } from "./interfaces/genders.interface";

export const openCreateGenderModal = () => {
  modals.open({
    title: "Nuevo género",
    children: (
      <GendersCreateForm
        onCancel={() => modals.closeAll()}
        onError={(e) => {
          if (isHttpError(e)) {
            if (e.status === 409) {
              notifications.show({
                color: "orange",
                message: "Género ya existe.",
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
            message: "Género creado exitosamente.",
          });
          modals.closeAll();
        }}
      />
    ),
  });
};

export const openUpdateGenderModal = (
  genderId: string,
  data: Partial<Gender>
) => {
  modals.open({
    title: "Editar género",
    children: (
      <GendersUpdateForm
        data={data}
        genderId={genderId}
        onCancel={() => {
          modals.closeAll();
        }}
        onError={(e) => {
          if (isHttpError(e)) {
            if (e.status === 409) {
              notifications.show({
                color: "orange",
                message: "Género ya existe.",
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
            message: "Género actualizado exitosamente.",
          });
          modals.closeAll();
        }}
      />
    ),
  });
};
