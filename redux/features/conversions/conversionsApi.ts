import { baseApi } from "@/redux/app/baseApi";
import { GetConversionsResponse, IStatus } from "@/types/conversions";

const conversionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // /machine/conversions
    getConversions: builder.query<GetConversionsResponse, void>({
      query: () => ({
        url: "/machine/conversions",
        method: "GET",
      }),
      providesTags: ["Conversions"],
    }),

    // update Status
    updateStatus: builder.mutation<
      void,
      {
        id: string;
        status: IStatus;
      }
    >({
      query: ({ id, status }) => ({
        url: `machine/updateConversionStatus/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Conversions"],
    }),
  }),
});

export const { useGetConversionsQuery, useUpdateStatusMutation } =
  conversionsApi;
