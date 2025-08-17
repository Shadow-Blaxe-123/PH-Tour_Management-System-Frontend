import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfor) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfor,
      }),
    }),
    register: builder.mutation({
      query: (userInfor) => ({
        url: "/user/register",
        method: "POST",
        data: userInfor,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
