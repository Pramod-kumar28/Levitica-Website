import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiService } from "../../config/apiConfig";

export const batchDetailsApi = createApi({
  ...createApiService({
    reducerPath: "batchDetailsApi",
    baseUrl: "/admin/batchs",
    tagTypes: ["Batch", "BatchStudents"], // Add both tag types you need
  }),
  endpoints: (builder) => ({

    getBatches: builder.query({
      query: ({ page = 1, limit = 10, status } = {}) => ({
        url: "/",
        params: {
          page,
          limit,
          ...(status ? { status } : {}), // 👈 only send if exists
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
            ...result.data.map(({ _id }) => ({
              type: "Batch",
              id: _id,
            })),
            { type: "Batch", id: "LIST" },
          ]
          : [{ type: "Batch", id: "LIST" }],
    }),

    getBatchstudents: builder.query({
      query: ({ batchId, page = 1, limit = 10 }) => ({
        url: `/${batchId}`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),

      providesTags: (result, error, { batchId }) => [
        { type: "BatchStudents", id: batchId },
        { type: "Batch", id: batchId },
      ],

      refetchOnMountOrArgChange: true,
    }),

    addBatch: builder.mutation({
      query: (newBatchData) => ({
        url: "/newbatch",
        method: "POST",
        body: newBatchData,
      }),
      // Invalidate the batch list when a new batch is added
      invalidatesTags: [{ type: "Batch", id: "LIST" }],
    }),
    updateBatch: builder.mutation({
      query: ({ batchId, updatedData }) => ({
        url: `/${batchId}`,
        method: "PUT",
        body: updatedData,
      }),
      // Invalidate both the specific batch and the list
      invalidatesTags: (result, error, { batchId }) => [
        { type: "Batch", id: batchId },
        { type: "Batch", id: "LIST" },
        // Also invalidate the students for this batch
        { type: "BatchStudents", id: batchId },
      ],
    }),
    deleteBatch: builder.mutation({
      query: (batchId) => ({
        url: `/deleteBatch/${batchId}`,
        method: "DELETE",
      }),
      // Invalidate both the specific batch and the list
      invalidatesTags: (result, error, batchId) => [
        { type: "Batch", id: batchId },
        { type: "Batch", id: "LIST" },
        // Also invalidate the students for this batch
        { type: "BatchStudents", id: batchId },
      ],
    }),
    getBatchesByCourse: builder.query({
      query: (courseId) => `/by-course/${courseId}`,
    }),
  }),
});

export const {

  useGetBatchesQuery,
  useGetBatchesByCourseQuery,
  useGetBatchstudentsQuery,
  useAddBatchMutation,
  useUpdateBatchMutation,
  useDeleteBatchMutation,
} = batchDetailsApi;