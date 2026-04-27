import { ActionIcon, Button, Table, Title } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useSearchParams } from "react-router";
import CaslProtectedRoute from "~/casl/components/casl-protected-route";
import { CaslAction } from "~/casl/interfaces/casl-action.enum";
import { CaslSubject } from "~/casl/interfaces/casl-subject.enum";
import { PaginationBar } from "~/common/components/pagination/pagination-bar";
import { PaginationSortOrder } from "~/common/interfaces/pagination";
import {
  DepartmentsPaginationSortByDto,
  useGetDepartmentsPageQuery,
} from "./departments.api";
import {
  openCreateDepartmentModal,
  openUpdateDepartmentModal,
} from "./departments.modals";

export default function DepartmentsPage() {
  const [searchParams] = useSearchParams();

  const { data: departments } = useGetDepartmentsPageQuery({
    search: searchParams.get("search") ?? "",
    sortBy:
      DepartmentsPaginationSortByDto[
        searchParams.get(
          "sortBy"
        ) as keyof typeof DepartmentsPaginationSortByDto
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
      <title>ITE - Departamentos</title>
      <CaslProtectedRoute
        action={CaslAction.READ}
        subject={CaslSubject.DEPARTMENTS}
      >
        <div className="flex flex-col gap-3">
          <Title>Departamentos</Title>
          <div className="flex justify-end">
            <Button onClick={openCreateDepartmentModal}>Nuevo</Button>
          </div>
          <PaginationBar
            currentPage={Number.parseInt(searchParams.get("page") ?? "1", 10)}
            sortByOptions={[{ label: "Nombre", value: "name" }]}
            totalPages={departments?.meta?.totalPages ?? 0}
          />
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Nombre</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {departments?.data?.map((department) => (
                <Table.Tr key={department.id}>
                  <Table.Td>{department.name}</Table.Td>
                  <Table.Td>
                    <ActionIcon
                      onClick={() =>
                        openUpdateDepartmentModal(department.id, {
                          name: department.name,
                        })
                      }
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
    </>
  );
}
