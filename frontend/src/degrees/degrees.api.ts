import { api } from "~/api";
import type {
  PaginationDto,
  PaginationResult,
  PaginationSortOrder,
} from "~/common/interfaces/pagination";
import type { Degree } from "./interfaces/degrees.interface";

export enum DegreesPaginationSortByDto {
  ID = "id",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  NAME = "name",
}

interface DegreesPaginationDto extends PaginationDto {
  search?: string;
  sortBy?: DegreesPaginationSortByDto;
  sortOrder?: PaginationSortOrder;
}

export const degreesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDegreesPage: builder.query<
      PaginationResult<Degree>,
      DegreesPaginationDto
    >({
      query: (params?: DegreesPaginationDto) => ({
        url: "/degrees/",
        method: "GET",
        params,
      }),
      providesTags: ["Degrees"],
    }),
    createDegree: builder.mutation<Degree, Partial<Degree>>({
      query: (degree) => ({
        url: "/degrees/",
        method: "POST",
        body: degree,
      }),
      invalidatesTags: ["Degrees"],
    }),
    updateDegree: builder.mutation<
      Degree,
      { id: string; data: Partial<Degree> }
    >({
      query: ({ id, data }) => ({
        url: `/degrees/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Degrees"],
    }),
    deleteDegree: builder.mutation<void, string>({
      query: (id) => ({
        url: `/degrees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Degrees"],
    }),
  }),
});

export const {
  useCreateDegreeMutation,
  useDeleteDegreeMutation,
  useGetDegreesPageQuery,
  useUpdateDegreeMutation,
} = degreesApi;
