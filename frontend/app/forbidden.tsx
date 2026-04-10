import { Text } from "@mantine/core";
import { IconForbid } from "@tabler/icons-react";

export default function Forbidded() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10">
      <IconForbid />
      <div>
        <Text ta="center">
          No tienes permisos suficientes para realizar esta acción
        </Text>
        <Text ta="center">Contacta a tu administrador</Text>
      </div>
    </div>
  );
}
