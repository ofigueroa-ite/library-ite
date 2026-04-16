import type { ComboboxData, SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { CaslSubject } from "../interfaces/casl-subject.enum";

const data: ComboboxData<CaslSubject> = [
  { label: "Todos", value: CaslSubject.ALL },
  { label: "Permisos", value: CaslSubject.PERMISSIONS },
  { label: "Roles", value: CaslSubject.ROLES },
  { label: "Usuarios", value: CaslSubject.USERS },
];

export function CaslSubjectSelect(props: SelectProps) {
  return <Select data={data} {...props} />;
}
