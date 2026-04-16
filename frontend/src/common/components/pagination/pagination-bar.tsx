import type { ComboboxData } from "@mantine/core";
import { Pagination, Select, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { PaginationSortOrder } from "./../../interfaces/pagination";
import { PaginationSortOrderButton } from "./pagination-sort-order-button";

export interface PaginationBarProps {
  currentPage: number;
  defaultSortOrder?: PaginationSortOrder;
  sortByOptions?: ComboboxData<string>;
  totalPages: number;
}

export function PaginationBar(props: PaginationBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const handleParamChange = useDebouncedCallback(
    (key: string, value: unknown) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }

      navigate(`${location.pathname}?${params.toString()}`);
    },
    400
  );

  return (
    <div className="flex flex-col gap-3">
      <TextInput
        className="col-span-10"
        defaultValue={searchParams.get("search") ?? ""}
        leftSection={<IconSearch />}
        onChange={(e) => handleParamChange("search", e.target.value)}
      />
      <div className="flex items-end justify-between">
        <div className="flex items-end gap-3">
          <Select
            allowDeselect={false}
            data={props.sortByOptions}
            defaultValue={
              searchParams.get("sortBy") ?? props.sortByOptions?.[0]?.value
            }
            label="Ordenar"
            onChange={(value) => handleParamChange("sortBy", value)}
          />
          <PaginationSortOrderButton
            defaultValue={
              PaginationSortOrder[
                props.defaultSortOrder ??
                  (searchParams.get(
                    "sortOrder"
                  ) as keyof typeof PaginationSortOrder)
              ] ?? PaginationSortOrder.ASC
            }
            onChange={(value) => handleParamChange("sortOrder", value)}
            size="lg"
            variant="white"
          />
        </div>
        <Pagination
          onChange={(value) => handleParamChange("page", value)}
          total={props.totalPages}
          value={props.currentPage}
        />
      </div>
    </div>
  );
}
