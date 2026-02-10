// adminCourseApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { createApiService } from "../../config/apiConfig";

export const adminCourseApi = createApi({
  ...createApiService({
    reducerPath: 'adminCourseApi',
    baseUrl: '/admin/courses',
    tagTypes: ['Course'],
  }),
  endpoints: (builder) => ({

    addCourse: builder.mutation({
      query: (course) => ({
        url: '/',
        method: 'POST',
        body: course,
      }),
      invalidatesTags: [{ type: 'Course', id: 'LIST' }],
    }),

    updateCourse: builder.mutation({
      query: ({ id, ...course }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: course,
      }),
      invalidatesTags: (r, e, { id }) => [{ type: 'Course', id }],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Course', id: 'LIST' }],
    }),

    addCourseDetails: builder.mutation({
      query: ({ courseId, body }) => ({
        url: `/${courseId}/details`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (r, e, { courseId }) => [
        { type: 'Course', id: courseId },
      ],
    }),

    updateCourseDetails: builder.mutation({
      query: ({ courseId, body }) => ({
        url: `/${courseId}/details`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (r, e, { courseId }) => [
        { type: 'Course', id: courseId },
      ],
    }),

    updateCurriculum: builder.mutation({
      query: ({ courseId, curriculum }) => ({
        url: `/${courseId}/details/curriculum`,
        method: 'PATCH',
        body: { curriculum },
      }),
      invalidatesTags: (r, e, { courseId }) => [
        { type: 'Course', id: courseId },
      ],
    }),

  }),
});

export const {
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useAddCourseDetailsMutation,
  useUpdateCourseDetailsMutation,
  useUpdateCurriculumMutation,
} = adminCourseApi;
