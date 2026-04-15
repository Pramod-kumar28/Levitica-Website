import { api } from '@/Services/api';

export const adminCourseApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ ADD COURSE
    addCourse: builder.mutation({
      query: (course) => ({
        url: "/admin/courses",
        method: "POST",
        body: course,
      }),
      invalidatesTags: [{ type: "Course", id: "LIST" }],
    }),

    // ✅ UPDATE COURSE
    updateCourse: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/admin/courses/${id}`,
        method: "PUT",
        body: updatedData,
      }),

      async onQueryStarted({ id, ...updatedData }, { dispatch, queryFulfilled }) {

        const patchResult = dispatch(
          api.util.updateQueryData("getCourses", undefined, (draft) => {
            const course = draft.find(c => c._id === id);
            if (course) {
              Object.assign(course, updatedData);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // ✅ DELETE COURSE
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/admin/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Course", id: "LIST" }],
    }),

    // ✅ ADD COURSE DETAILS
    addCourseDetails: builder.mutation({
      query: ({ courseId, body }) => ({
        url: `/admin/courses/${courseId}/details`,
        method: "POST",
        body,
      }),
      invalidatesTags: (r, e, { courseId }) => [
        { type: "Course", id: courseId },
      ],
    }),

    // ✅ UPDATE COURSE DETAILS
    updateCourseDetails: builder.mutation({
      query: ({ courseId, body }) => ({
        url: `/admin/courses/${courseId}/details`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (r, e, { courseId }) => [
        { type: "Course", id: courseId },
      ],
    }),

    // ✅ UPDATE CURRICULUM
    updateCurriculum: builder.mutation({
      query: ({ courseId, curriculum }) => ({
        url: `/admin/courses/${courseId}/details/curriculum`,
        method: "PATCH",
        body: { curriculum },
      }),
      invalidatesTags: (r, e, { courseId }) => [
        { type: "Course", id: courseId },
      ],
    }),

  }),

  overrideExisting: false,
});

export const {
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useAddCourseDetailsMutation,
  useUpdateCourseDetailsMutation,
  useUpdateCurriculumMutation,
} = adminCourseApi;