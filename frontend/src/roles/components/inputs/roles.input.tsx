import { MultiSelect, type MultiSelectProps } from "@mantine/core";
import { useGetRolesPageQuery } from "~/roles/roles.api";

export function RolesInput(props: MultiSelectProps) {
  const { data: roles, isLoading } = useGetRolesPageQuery({ limit: 100 });
  return (
    <MultiSelect
      data={roles?.data?.map((role) => ({ label: role.name, value: role.id }))}
      loading={isLoading}
      {...props}
    />
  );
}
