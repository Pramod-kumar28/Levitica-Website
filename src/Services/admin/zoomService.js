import { api } from "../api";

export const zoomApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ CREATE MEETING
    createMeeting: builder.mutation({
      query: (data) => ({
        url: "/admin/zoom",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Meeting"],
    }),

    // ✅ GET MEETINGS
    getMeetings: builder.query({
      query: () => ({
        url: "/admin/zoom",
        method: "GET",
      }),
      providesTags: ["Meeting"],
    }),

    // ✅ START LIVE CLASS
    startLiveClass: builder.mutation({
      query: (id) => ({
        url: `/admin/zoom/start/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Meeting"],
    }),

    // ✅ UPDATE MEETING
    updateMeeting: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/zoom/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Meeting"],
    }),

    // ✅ DELETE MEETING
    deleteMeeting: builder.mutation({
      query: (id) => ({
        url: `/admin/zoom/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Meeting"],
    }),

  }),

  overrideExisting: false,
});

export const {
  useCreateMeetingMutation,
  useGetMeetingsQuery,
  useUpdateMeetingMutation,
  useStartLiveClassMutation,
  useDeleteMeetingMutation,
} = zoomApi;