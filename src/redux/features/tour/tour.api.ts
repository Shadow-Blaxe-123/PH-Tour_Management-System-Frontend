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
      invalidatesTags: ["TourType"],
    }),
    addTour: builder.mutation({
      query: (data) => ({
        url: "/tour/create",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Tour"],
    }),
    removeTourType: builder.mutation<IResponse<null>, string>({
      query: (id) => ({
        url: `/tour/tour-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TourType"],
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
      providesTags: ["TourType"],
    }),
  }),
});

export const {
  useAddTourTypeMutation,
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
  useAddTourMutation,
} = tourApi;
