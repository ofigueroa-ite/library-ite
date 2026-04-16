import { api } from "../api";
import type { User } from "../users/interfaces/user.interface";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (email: string) => ({
        url: "/auth/login",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["Me"],
    }),
    verify: builder.mutation({
      query: ({ email, otp }: { email: string; otp: string }) => ({
        url: "auth/verify",
        method: "POST",
        body: { email, otp },
      }),
    }),
    signOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Me"],
    }),
    me: builder.query<User, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["Me"],
    }),
  }),
});

export const {
  useSignInMutation,
  useVerifyMutation,
  useSignOutMutation,
  useMeQuery,
} = authApi;
