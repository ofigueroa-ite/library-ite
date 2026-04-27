import {
  Accordion,
  ActionIcon,
  Button,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { IconCircleMinus, IconPencil, IconPlus } from "@tabler/icons-react";
import { useSearchParams } from "react-router";
import CaslProtectedRoute from "../casl/components/casl-protected-route";
import { CaslAction } from "../casl/interfaces/casl-action.enum";
import { CaslSubject } from "../casl/interfaces/casl-subject.enum";
import { PaginationBar } from "../common/components/pagination/pagination-bar";
import { PaginationSortOrder } from "../common/interfaces/pagination";
import {
  openCreatePermissionModal,
  openDeletePermissionModal,
} from "../permissions/permissions.modals";
import { RolesPaginationSortByDto, useGetRolesPageQuery } from "./roles.api";
import {
  openCreateRoleModal,
  openDeleteRoleModal,
  openUpdateRoleModal,
} from "./roles.modals";

export default function RolesPage() {
  const [searchParams] = useSearchParams();

  const { data: roles } = useGetRolesPageQuery({
    search: searchParams.get("search") ?? "",
    sortBy:
      RolesPaginationSortByDto[
        searchParams.get("sortBy") as keyof typeof RolesPaginationSortByDto
      ],
    sortOrder:
      PaginationSortOrder[
        searchParams.get("sortOrder") as keyof typeof PaginationSortOrder
      ],
    page: Number.parseInt(searchParams.get("page") ?? "1", 10),
    limit: 10,
  });

  return (
    <>
      <title>ITE - Roles</title>
      <CaslProtectedRoute action={CaslAction.READ} subject={CaslSubject.ROLES}>
        <div className="flex flex-col gap-3">
          <Title>Roles</Title>
          <div className="flex justify-end">
            <Button onClick={openCreateRoleModal}>Nuevo</Button>
          </div>
          <PaginationBar
            currentPage={Number.parseInt(searchParams.get("page") ?? "1", 10)}
            sortByOptions={[
              { label: "Nombre", value: "name" },
              { label: "Prioridad", value: "priority" },
            ]}
            totalPages={roles?.meta?.totalPages ?? 0}
          />
          <Accordion chevronPosition="left">
            {roles?.data.map((role) => (
              <Accordion.Item key={role.id} value={role.id}>
                <div className="mr-3 flex items-center gap-3">
                  <Accordion.Control color="iteGray">
                    <div className="flex gap-3">
                      <Text>{role.name}</Text>
                      <Text>({`${role.priority}`})</Text>
                    </div>
                  </Accordion.Control>
                  <div className="flex">
                    <ActionIcon
                      onClick={() =>
                        openUpdateRoleModal(role.id, {
                          name: role.name,
                          priority: role.priority,
                        })
                      }
                    >
                      <IconPencil />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      disabled={!!role.users?.length}
                      onClick={() => openDeleteRoleModal(role.id)}
                    >
                      <IconCircleMinus />
                    </ActionIcon>
                  </div>
                </div>
                <Accordion.Panel>
                  <div className="flex flex-col gap-3">
                    <Table>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Tema</Table.Th>
                          <Table.Th>Acción</Table.Th>
                          <Table.Th>Invertido</Table.Th>
                          <Table.Th />
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {role.permissions?.map((permission) => (
                          <Table.Tr key={permission.id}>
                            <Table.Td>
                              <Text>{permission.subject}</Text>
                            </Table.Td>
                            <Table.Td>
                              <Text>{permission.action}</Text>
                            </Table.Td>
                            <Table.Td>
                              <Text>{permission.inverted ? "Sí" : "No"}</Text>
                            </Table.Td>
                            <Table.Td>
                              <ActionIcon
                                color="red"
                                onClick={() =>
                                  openDeletePermissionModal(permission.id)
                                }
                              >
                                <IconCircleMinus />
                              </ActionIcon>
                            </Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                    </Table>
                    <div className="flex justify-center">
                      <ActionIcon
                        onClick={() => openCreatePermissionModal(role.id)}
                      >
                        <IconPlus />
                      </ActionIcon>
                    </div>
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </CaslProtectedRoute>
    </>
  );
}
