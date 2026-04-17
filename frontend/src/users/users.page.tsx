import { ActionIcon, Badge, Button, Table, Title } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useSearchParams } from "react-router";
import { PaginationBar } from "~/common/components/pagination/pagination-bar";
import { PaginationSortOrder } from "~/common/interfaces/pagination";
import CaslProtectedRoute from "../casl/components/casl-protected-route";
import { CaslAction } from "../casl/interfaces/casl-action.enum";
import { CaslSubject } from "../casl/interfaces/casl-subject.enum";
import { UsersPaginationSortByDto, useGetUsersPageQuery } from "./users.api";
import { openCreateUserModal, openUpdateUserModal } from "./users.modals";

export default function UsersPage() {
  const [searchParams] = useSearchParams();

  const { data: users } = useGetUsersPageQuery({
    search: searchParams.get("search") ?? "",
    sortBy:
      UsersPaginationSortByDto[
        searchParams.get("sortBy") as keyof typeof UsersPaginationSortByDto
      ],
    sortOrder:
      PaginationSortOrder[
        searchParams.get("sortOrder") as keyof typeof PaginationSortOrder
      ],
    page: Number.parseInt(searchParams.get("page") ?? "1", 10),
    limit: 10,
  });

  return (
    <CaslProtectedRoute action={CaslAction.MANAGE} subject={CaslSubject.USERS}>
      <div className="flex flex-col gap-3">
        <Title>Usuarios</Title>
        <div className="flex justify-end">
          <Button onClick={openCreateUserModal}>Nuevo</Button>
        </div>
        <PaginationBar
          currentPage={Number.parseInt(searchParams.get("page") ?? "1", 10)}
          sortByOptions={[
            { label: "Nombre", value: "name" },
            { label: "Apellido", value: "surname" },
            { label: "Correo", value: "email" },
          ]}
          totalPages={users?.meta?.totalPages ?? 0}
        />
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Nombre</Table.Th>
              <Table.Th>Apellido</Table.Th>
              <Table.Th>Correo</Table.Th>
              <Table.Th>Roles</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {users?.data?.map((user) => (
              <Table.Tr key={user.id}>
                <Table.Td>{user.name}</Table.Td>
                <Table.Td>{user.surname}</Table.Td>
                <Table.Td>{user.email}</Table.Td>
                <Table.Td>
                  {user.roles?.map((role) => (
                    <Badge key={role.id}>{role.name}</Badge>
                  ))}
                </Table.Td>
                <Table.Td>
                  <ActionIcon
                    onClick={() => openUpdateUserModal(user.id, user)}
                  >
                    <IconPencil />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </CaslProtectedRoute>
  );
}
