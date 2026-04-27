import { api } from "~/api";
import type {
  PaginationDto,
  PaginationResult,
  PaginationSortOrder,
} from "~/common/interfaces/pagination";
import type { Gender } from "./interfaces/genders.interface";

export enum GendersPaginationSortByDto {
  ID = "id",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  NAME = "name",
}

interface GendersPaginationDto extends PaginationDto {
  search?: string;
  sortBy?: GendersPaginationSortByDto;
  sortOrder?: PaginationSortOrder;
}

export const gendersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGendersPage: builder.query<
      PaginationResult<Gender>,
      GendersPaginationDto
    >({
      query: (params?: GendersPaginationDto) => ({
        url: "/genders/",
        method: "GET",
        params,
      }),
      providesTags: ["Genders"],
    }),
    createGender: builder.mutation<Gender, Partial<Gender>>({
      query: (gender) => ({
        url: "/genders/",
        method: "POST",
        body: gender,
      }),
      invalidatesTags: ["Genders"],
    }),
    updateGender: builder.mutation<
      Gender,
      { id: string; data: Partial<Gender> }
    >({
      query: ({ id, data }) => ({
        url: `/genders/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Genders"],
    }),
    deleteGender: builder.mutation<void, string>({
      query: (id) => ({
        url: `/genders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Genders"],
    }),
  }),
});

export const {
  useCreateGenderMutation,
  useDeleteGenderMutation,
  useGetGendersPageQuery,
  useUpdateGenderMutation,
} = gendersApi;
