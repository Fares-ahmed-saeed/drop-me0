import { baseApi } from "@/redux/app/baseApi";
import { IConvertPointsResponse, IUser, IUserPoints } from "@/types/profile";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get user by id
    getUser: builder.query<IUser, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    getUserPoints: builder.query<IUserPoints, void>({
      query: () => ({
        url: "/users/points",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    convertPoints: builder.mutation<void, IConvertPointsResponse>({
      query: (body) => ({
        url: "/machine/convertPoints",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserPointsQuery,
  useConvertPointsMutation,
} = profileApi;
