import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivision: builder.mutation({
      query: (data) => ({
        url: "/division/create",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Division"],
    }),
  }),
});

export const { useAddDivisionMutation } = divisionApi;
