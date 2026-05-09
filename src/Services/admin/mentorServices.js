import { api } from '@/Services/api';

export const mentorManagementApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ CREATE MENTOR
    createMentor: builder.mutation({
      query: (body) => ({
        url: "/mentor/mentors",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Mentor", id: "LIST" }],
    }),

    // ✅ GET ALL MENTORS
    getMentors: builder.query({
      query: () => ({
        url: "/mentor/mentors",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Mentor", id: "LIST" },
              ...result.data.map((mentor) => ({
                type: "Mentor",
                id: mentor._id,
              })),
            ]
          : [{ type: "Mentor", id: "LIST" }],
    }),

    // ✅ GET SINGLE MENTOR
    getMentorById: builder.query({
      query: (id) => ({
        url: `/mentor/mentors/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: "Mentor", id },
      ],
    }),

    // ✅ UPDATE MENTOR
    updateMentor: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/mentor/mentors/${id}`,
        method: "PUT",
        body,
      }),

      async onQueryStarted({ id, ...body }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getMentors", undefined, (draft) => {
            const mentor = draft?.data?.find((m) => m._id === id);
            if (mentor) {
              Object.assign(mentor, body);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: (r, e, { id }) => [
        { type: "Mentor", id },
      ],
    }),

    // ✅ DELETE MENTOR
    deleteMentor: builder.mutation({
      query: (id) => ({
        url: `/mentor/mentors/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getMentors", undefined, (draft) => {
            draft.data = draft.data.filter((m) => m._id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: [{ type: "Mentor", id: "LIST" }],
    }),

  }),

  overrideExisting: false,
});

// Export all hooks
export const {
  useCreateMentorMutation,
  useGetMentorsQuery,
  useGetMentorByIdQuery,
  useUpdateMentorMutation,
  useDeleteMentorMutation,
} = mentorManagementApi;