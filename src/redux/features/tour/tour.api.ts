import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourType } from "@/types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation<IResponse<ITourType>, ITourType>({
      query: (data) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        body: data,
      }),
    }),
    getTourTypes: builder.query<IResponse<ITourType>, null>({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
    }),
  }),
});

export const { useAddTourTypeMutation, useGetTourTypesQuery } = tourApi;
