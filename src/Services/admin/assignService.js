import { api } from "../api";

export const assignApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUnassignedEnrollments: builder.query({
      query: () => ({
        url: "/admin/enroll/unassigned",
        method: "GET",
      }),
      providesTags: ["Enrollments"],
    }),

    assignStudentsToBatch: builder.mutation({
      query: (payload) => ({
        url: "/admin/enroll/assign",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Enrollments"],
    }),

    getAssignedEnrollments: builder.query({
      query: () => ({
        url: "/admin/enroll/assigned",
        method: "GET",
      }),
      providesTags: ["Enrollments"],
    }),
  }),

  overrideExisting: false, // safer for code splitting
});

export const {
  useLazyGetUnassignedEnrollmentsQuery,
  useAssignStudentsToBatchMutation,
  useGetAssignedEnrollmentsQuery,
} = assignApi;