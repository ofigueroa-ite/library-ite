import { api } from "~/api";
import type {
  PaginationDto,
  PaginationResult,
  PaginationSortOrder,
} from "~/common/interfaces/pagination";
import type { User } from "./interfaces/user.interface";

export enum UsersPaginationSortByDto {
  ID = "id",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  NAME = "name",
  SURNAME = "surname",
  EMAIL = "email",
}

interface UsersPaginationDto extends PaginationDto {
  search?: string;
  sortBy?: UsersPaginationSortByDto;
  sortOrder?: PaginationSortOrder;
}

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsersPage: builder.query<PaginationResult<User>, UsersPaginationDto>({
      query: (params?: UsersPaginationDto) => ({
        url: "/users/",
        method: "GET",
        params,
      }),
      providesTags: ["Users"],
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: "/users/",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersPageQuery,
  useUpdateUserMutation,
} = usersApi;
