import { TableColumnOptions } from "typeorm";

export const baseColumns: TableColumnOptions[] = [
  {
    name: "id",
    type: "uuid",
    isPrimary: true,
    isGenerated: true,
    generationStrategy: "uuid",
    default: "uuid_generate_v4()",
  },
  {
    name: "created_at",
    type: "timestamp",
    isNullable: false,
    default: "now()",
  },
  {
    name: "updated_at",
    type: "timestamp",
    isNullable: false,
    default: "now()",
  },
  {
    name: "deleted_at",
    type: "timestamp",
    isNullable: true,
  },
];
