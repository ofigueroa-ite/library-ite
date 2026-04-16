import type {
  PaginationDto,
  PaginationResult,
  PaginationSortOrder,
} from "~/common/interfaces";
import { api } from "../api";
import type { Role } from "./interfaces/role.interface";

export enum RolesPaginationSortByDto {
  ID = "id",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  NAME = "name",
  PRIORITY = "priority",
}

interface RolesPaginationDto extends PaginationDto {
  search?: string;
  sortBy?: RolesPaginationSortByDto;
  sortOrder?: PaginationSortOrder;
}

export const rolesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRolesPage: builder.query<PaginationResult<Role>, RolesPaginationDto>({
      query: (params?: RolesPaginationDto) => ({
        url: "/roles/",
        method: "GET",
        params,
      }),
      providesTags: ["Roles"],
    }),
    createRole: builder.mutation<Role, Partial<Role>>({
      query: (data) => ({
        url: "/roles/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Roles"],
    }),
    updateRole: builder.mutation<Role, { id: string; data: Partial<Role> }>({
      query: ({ id, data }) => ({
        url: `/roles/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Roles"],
    }),
    deleteRole: builder.mutation<void, string>({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Roles"],
    }),
  }),
});

export const {
  useGetRolesPageQuery,
  useUpdateRoleMutation,
  useCreateRoleMutation,
  useDeleteRoleMutation,
} = rolesApi;
