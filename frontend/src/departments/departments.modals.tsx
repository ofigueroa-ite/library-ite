import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { isHttpError } from "~/api";
import { DepartmentsCreateForm } from "./components/forms/departments-create.form";
import { DepartmentsUpdateForm } from "./components/forms/departments-update.form";
import type { Department } from "./interfaces/departments.interface";

export const openCreateDepartmentModal = () => {
  modals.open({
    title: "Nuevo departamento",
    children: (
      <DepartmentsCreateForm
        onCancel={() => modals.closeAll()}
        onError={(e) => {
          if (isHttpError(e)) {
            if (e.status === 409) {
              notifications.show({
                color: "orange",
                message: "Departamento ya existe.",
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
            message: "Departamento creado exitosamente.",
          });
          modals.closeAll();
        }}
      />
    ),
  });
};

export const openUpdateDepartmentModal = (
  departmentId: string,
  data: Partial<Department>
) => {
  modals.open({
    title: "Editar departamento",
    children: (
      <DepartmentsUpdateForm
        data={data}
        departmentId={departmentId}
        onCancel={() => {
          modals.closeAll();
        }}
        onError={(e) => {
          if (isHttpError(e)) {
            if (e.status === 409) {
              notifications.show({
                color: "orange",
                message: "Departamento ya existe.",
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
            message: "Departamento actualizado exitosamente.",
          });
          modals.closeAll();
        }}
      />
    ),
  });
};
