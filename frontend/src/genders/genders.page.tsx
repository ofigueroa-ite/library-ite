import { ActionIcon, Button, Table, Title } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useSearchParams } from "react-router";
import CaslProtectedRoute from "~/casl/components/casl-protected-route";
import { CaslAction } from "~/casl/interfaces/casl-action.enum";
import { CaslSubject } from "~/casl/interfaces/casl-subject.enum";
import { PaginationBar } from "~/common/components/pagination/pagination-bar";
import { PaginationSortOrder } from "~/common/interfaces/pagination";
import {
  GendersPaginationSortByDto,
  useGetGendersPageQuery,
} from "./genders.api";
import { openCreateGenderModal, openUpdateGenderModal } from "./genders.modals";

export default function GendersPage() {
  const [searchParams] = useSearchParams();

  const { data: genders } = useGetGendersPageQuery({
    search: searchParams.get("search") ?? "",
    sortBy:
      GendersPaginationSortByDto[
        searchParams.get("sortBy") as keyof typeof GendersPaginationSortByDto
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
      <title>ITE - Géneros</title>
      <CaslProtectedRoute
        action={CaslAction.READ}
        subject={CaslSubject.GENDERS}
      >
        <div className="flex flex-col gap-3">
          <Title>Géneros</Title>
          <div className="flex justify-end">
            <Button onClick={openCreateGenderModal}>Nuevo</Button>
          </div>
          <PaginationBar
            currentPage={Number.parseInt(searchParams.get("page") ?? "1", 10)}
            sortByOptions={[{ label: "Nombre", value: "name" }]}
            totalPages={genders?.meta?.totalPages ?? 0}
          />
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Nombre</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {genders?.data?.map((gender) => (
                <Table.Tr key={gender.id}>
                  <Table.Td>{gender.name}</Table.Td>
                  <Table.Td>
                    <ActionIcon
                      onClick={() =>
                        openUpdateGenderModal(gender.id, { name: gender.name })
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
