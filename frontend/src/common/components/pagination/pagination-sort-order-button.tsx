import type { ActionIconProps } from "@mantine/core";
import { ActionIcon } from "@mantine/core";

import { useToggle } from "@mantine/hooks";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";

export enum PaginationSortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export interface PaginationSortOrderButtonProps extends ActionIconProps {
  defaultValue?: PaginationSortOrder;
  onChange?: (value: PaginationSortOrder) => void;
}

export function PaginationSortOrderButton({
  defaultValue,
  onChange,
  ...props
}: PaginationSortOrderButtonProps) {
  const [value, toggle] = useToggle(
    defaultValue === PaginationSortOrder.ASC
      ? [PaginationSortOrder.ASC, PaginationSortOrder.DESC]
      : [PaginationSortOrder.DESC, PaginationSortOrder.ASC]
  );

  const handleToggle = () => {
    toggle();
    onChange?.(value);
  };

  return (
    <ActionIcon onClick={handleToggle} {...props}>
      {value === PaginationSortOrder.ASC ? (
        <IconSortAscending />
      ) : (
        <IconSortDescending />
      )}
    </ActionIcon>
  );
}
