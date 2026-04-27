import { api } from "~/api";
import type {
  PaginationDto,
  PaginationResult,
  PaginationSortOrder,
} from "~/common/interfaces/pagination";
import type { Department } from "./interfaces/departments.interface";

export enum DepartmentsPaginationSortByDto {
  ID = "id",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  NAME = "name",
}

interface DepartmentsPaginationDto extends PaginationDto {
  search?: string;
  sortBy?: DepartmentsPaginationSortByDto;
  sortOrder?: PaginationSortOrder;
}

export const departmentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDepartmentsPage: builder.query<
      PaginationResult<Department>,
      DepartmentsPaginationDto
    >({
      query: (params?: DepartmentsPaginationDto) => ({
        url: "/departments/",
        method: "GET",
        params,
      }),
      providesTags: ["Departments"],
    }),
    createDepartment: builder.mutation<Department, Partial<Department>>({
      query: (department) => ({
        url: "/departments/",
        method: "POST",
        body: department,
      }),
      invalidatesTags: ["Departments"],
    }),
    updateDepartment: builder.mutation<
      Department,
      { id: string; data: Partial<Department> }
    >({
      query: ({ id, data }) => ({
        url: `/departments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Departments"],
    }),
    deleteDepartment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Departments"],
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentsPageQuery,
  useUpdateDepartmentMutation,
} = departmentsApi;
