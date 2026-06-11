import { baseApi } from "@/redux/app/baseApi";
import { IUser } from "@/types/profile";
import { ICreate, IUsersResponse } from "@/types/users";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all users By admin
    getAllUser: builder.query<IUsersResponse, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    // create amin user
    createUser: builder.mutation<void, ICreate>({
      query: (body) => ({
        url: "/users/createuser",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),

    // delete User
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
} = usersApi;
