import { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { User } from "../(admin)/users/interfaces/user.interface";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/v1/",
  credentials: "include",
});

export const baseQueryWithAuthRedirect: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    window.location.href = "/sign-in";
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuthRedirect,
  tagTypes: ["Me"],
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
