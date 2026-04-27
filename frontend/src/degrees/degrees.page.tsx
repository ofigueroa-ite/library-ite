import { ActionIcon, Button, Table, Title } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useSearchParams } from "react-router";
import CaslProtectedRoute from "~/casl/components/casl-protected-route";
import { CaslAction } from "~/casl/interfaces/casl-action.enum";
import { CaslSubject } from "~/casl/interfaces/casl-subject.enum";
import { PaginationBar } from "~/common/components/pagination/pagination-bar";
import { PaginationSortOrder } from "~/common/interfaces/pagination";
import {
  DegreesPaginationSortByDto,
  useGetDegreesPageQuery,
} from "./degrees.api";
import { openCreateDegreeModal, openUpdateDegreeModal } from "./degrees.modals";

export default function DegreesPage() {
  const [searchParams] = useSearchParams();

  const { data: degrees } = useGetDegreesPageQuery({
    search: searchParams.get("search") ?? "",
    sortBy:
      DegreesPaginationSortByDto[
        searchParams.get("sortBy") as keyof typeof DegreesPaginationSortByDto
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
      <title>ITE - Grados</title>
      <CaslProtectedRoute
        action={CaslAction.READ}
        subject={CaslSubject.DEGREES}
      >
        <div className="flex flex-col gap-3">
          <Title>Grados</Title>
          <div className="flex justify-end">
            <Button onClick={openCreateDegreeModal}>Nuevo</Button>
          </div>
          <PaginationBar
            currentPage={Number.parseInt(searchParams.get("page") ?? "1", 10)}
            sortByOptions={[{ label: "Nombre", value: "name" }]}
            totalPages={degrees?.meta?.totalPages ?? 0}
          />
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Nombre</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {degrees?.data?.map((degree) => (
                <Table.Tr key={degree.id}>
                  <Table.Td>{degree.name}</Table.Td>
                  <Table.Td>
                    <ActionIcon
                      onClick={() =>
                        openUpdateDegreeModal(degree.id, { name: degree.name })
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
