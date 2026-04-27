import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { isHttpError } from "~/api";
import { DegreesCreateForm } from "./components/forms/degrees-create.form";
import { DegreesUpdateForm } from "./components/forms/degrees-update.form";
import type { Degree } from "./interfaces/degrees.interface";

export const openCreateDegreeModal = () => {
  modals.open({
    title: "Nuevo grado",
    children: (
      <DegreesCreateForm
        onCancel={() => modals.closeAll()}
        onError={(e) => {
          if (isHttpError(e)) {
            if (e.status === 409) {
              notifications.show({
                color: "orange",
                message: "Grado ya existe.",
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
            message: "Grado creado exitosamente.",
          });
          modals.closeAll();
        }}
      />
    ),
  });
};

export const openUpdateDegreeModal = (
  degreeId: string,
  data: Partial<Degree>
) => {
  modals.open({
    title: "Editar grado",
    children: (
      <DegreesUpdateForm
        data={data}
        degreeId={degreeId}
        onCancel={() => {
          modals.closeAll();
        }}
        onError={(e) => {
          if (isHttpError(e)) {
            if (e.status === 409) {
              notifications.show({
                color: "orange",
                message: "Grado ya existe.",
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
            message: "Grado actualizado exitosamente.",
          });
          modals.closeAll();
        }}
      />
    ),
  });
};
