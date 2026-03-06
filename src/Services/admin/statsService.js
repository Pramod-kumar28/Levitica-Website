import { api } from "../api";

export const statsApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ GET ADMIN STATS
    getStats: builder.query({
      query: () => ({
        url: "/admin/stats/get-stats",
        method: "GET",
      }),
      providesTags: ["adminstats"],
    }),

    // ✅ CREATE USER (affects stats)
    createUser: builder.mutation({
      query: (data) => ({
        url: "/admin/user/create-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["adminstats"],
    }),

  }),

  overrideExisting: false,
});

export const {
  useGetStatsQuery,
  useCreateUserMutation,
} = statsApi;