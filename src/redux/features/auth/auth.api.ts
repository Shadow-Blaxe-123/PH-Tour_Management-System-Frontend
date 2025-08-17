import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfor) => ({
        url: "/user/register",
        method: "POST",
        body: userInfor,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
