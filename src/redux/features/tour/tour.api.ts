import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourType } from "@/types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation<IResponse<ITourType>, ITourType>({
      query: (data) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: data,
      }),
    }),
    getTourTypes: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      transformResponse: (response: IResponse<ITourType[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
  }),
});

export const { useAddTourTypeMutation, useGetTourTypesQuery } = tourApi;
