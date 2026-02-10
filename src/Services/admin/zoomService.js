import { createApi } from '@reduxjs/toolkit/query/react';
import { createApiService } from '../../config/apiConfig';

export const zoomApi = createApi({
  ...createApiService({
    reducerPath: 'zoomApi',
    baseUrl: '/admin/zoom',
    tagTypes: ['Meeting'],
  }),
  endpoints: (builder) => ({
    createMeeting: builder.mutation({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Meeting'],
    }),

    getMeetings: builder.query({
      query: () => '/',
      providesTags: ['Meeting'],
    }),
    startLiveClass: builder.mutation({
      query: (id) => ({
        url: `zoom/start/${id}`,
        method: "GET"
      }),
      providesTags: ['Meeting'],
    }),
    updateMeeting: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Meeting'],
    }),
    deleteMeeting: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ['Meeting'],
    })


  }),
});

export const {
  useCreateMeetingMutation,
  useGetMeetingsQuery,
  useUpdateMeetingMutation,
  useStartLiveClassMutation,
  useDeleteMeetingMutation,
} = zoomApi;