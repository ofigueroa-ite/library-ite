import type { ComboboxData, SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { CaslAction } from "../interfaces/casl-action.enum";

const data: ComboboxData<CaslAction> = [
  { label: "Todo", value: CaslAction.MANAGE },
  { label: "Crear", value: CaslAction.CREATE },
  { label: "Leer", value: CaslAction.READ },
  { label: "Actualizar", value: CaslAction.UPDATE },
  { label: "Eliminar", value: CaslAction.DELETE },
];

export function CaslActionSelect(props: SelectProps) {
  return <Select data={data} {...props} />;
}
