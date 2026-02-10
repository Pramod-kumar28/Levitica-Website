import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiService } from "../../config/apiConfig";

export const studentReportsApi = createApi({
  ...createApiService({
    reducerPath: 'studentReportsApi',
    baseUrl: '/admin/student-reports',
    tagTypes: ["Students Report"],
  }),
  endpoints: (builder) => ({
    
   
      getStudents: builder.query({
      query: ({ page = 1, limit = 10, search = '' }) => ({
        url: '/',
        params: { page, limit, search },
      }),
      providesTags: ['Students'],
    }),
    
    downloadStudentsExcel: builder.mutation({
      query: (filters = {}) => ({
        url: 'excel',
        params: filters,
        responseHandler: (response) => response.blob(),
        cache: 'no-cache',
      }),
    }),
  }),
});

export const {useDownloadStudentsExcelMutation,useGetStudentsQuery} = studentReportsApi;