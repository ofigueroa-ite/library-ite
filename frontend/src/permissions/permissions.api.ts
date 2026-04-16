import { api } from "../api";
import { CaslAction } from "../casl/interfaces/casl-action.enum";
import { CaslSubject } from "../casl/interfaces/casl-subject.enum";
import type { Permissions } from "./interfaces/permissions.interface";

export interface PermissionsCreateDto {
  action: CaslAction;
  inverted?: boolean;
  roleId: string;
  subject: CaslSubject;
}

export const permissionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPermissions: builder.mutation<Permissions, PermissionsCreateDto>({
      query: (body: PermissionsCreateDto) => ({
        url: "/permissions/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Roles"],
    }),
    deletePermission: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/permissions/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Roles"],
    }),
  }),
});

export const { useCreatePermissionsMutation, useDeletePermissionMutation } =
  permissionsApi;
