import { api } from "../api";
import type {
  PaginationDto,
  PaginationResult,
  PaginationSortOrder,
} from "../common/interfaces/pagination";
import type { UsersRoles } from "./interfaces/users-roles.interface";

export enum RolesPaginationSortByDto {
  ID = "id",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  USER_ID = "userId",
  ROLE_ID = "roleId",
}

interface UsersRolesPaginationDto extends PaginationDto {
  search?: string;
  sortBy?: RolesPaginationSortByDto;
  sortOrder?: PaginationSortOrder;
}

export const rolesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsersRolesPage: builder.query<
      PaginationResult<UsersRoles>,
      UsersRolesPaginationDto
    >({
      query: (params?: UsersRolesPaginationDto) => ({
        url: "/users-roles/",
        method: "GET",
        params,
      }),
      providesTags: ["UsersRoles"],
    }),
    createUserRole: builder.mutation<
      UsersRoles,
      { userId: string; roleIds: string[] }
    >({
      query: (data) => ({
        url: "/users-roles/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users", "UsersRoles"],
    }),
    deleteUserRole: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users-roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UsersRoles"],
    }),
  }),
});

export const {
  useCreateUserRoleMutation,
  useDeleteUserRoleMutation,
  useGetUsersRolesPageQuery,
} = rolesApi;
