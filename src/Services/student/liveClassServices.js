import { api } from '@/Services/api';

export const liveClassesApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // 🔍 FETCH UPCOMING LIVE CLASSES
    getLiveClasses: builder.query({
      query: () => ({
        url: "/student/classes/upcoming",
        method: "GET",
      }),
      providesTags: ["LiveClasses"],
    }),

    // 🚪 JOIN LIVE CLASS
    joinLiveClass: builder.mutation({
      query: (id) => ({
        url: `/student/classes/join/${id}`,
        method: "GET",
      }),
    }),

  }),

  overrideExisting: false,
});

export const {
  useGetLiveClassesQuery,
  useJoinLiveClassMutation,
} = liveClassesApi;