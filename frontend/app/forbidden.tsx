import { Text } from "@mantine/core";

export default function Forbidded() {
  return (
    <div className="item-center flex flex-col justify-center bg-red-500">
      <Text ta="center">
        No tienes permisos suficientes para realizar esta acción
      </Text>
      <Text ta="center">Contacta a tu administrador</Text>
    </div>
  );
}
