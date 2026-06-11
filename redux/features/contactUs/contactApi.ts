import { baseApi } from "@/redux/app/baseApi";
import { GetContactsResponse } from "@/types/contactUs";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendContactMessage: builder.mutation<
      void,
      {
        fullName: string;
        email: string;
        message: string;
        phoneNumber: string;
        country: string;
      }
    >({
      query: (body) => ({
        url: "/users/contactUs",
        method: "POST",
        body,
      }),
    }),

    // get contactUs
    getContactUs: builder.query<GetContactsResponse, void>({
      query: () => ({
        url: "/users/contactUs",
        method: "GET",
      }),
      providesTags: ["ContactUs"],
    }),
  }),
});

export const { useSendContactMessageMutation, useGetContactUsQuery } =
  contactApi;
