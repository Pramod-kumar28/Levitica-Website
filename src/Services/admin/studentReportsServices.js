import { api } from "../api";

export const studentReportsApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ GET STUDENTS (Paginated + Search)
    getStudents: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: "/admin/student-reports",
        params: { page, limit, search },
      }),
      providesTags: ["Students"],
    }),

    // ✅ DOWNLOAD STUDENTS EXCEL (Blob)
    downloadStudentsExcel: builder.mutation({
      query: (filters = {}) => ({
        url: "/admin/student-reports/excel",
        method: "GET",
        params: filters,
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),


    }),

    downloadPaymentsExcel: builder.mutation({
      query: (filters = {}) => ({
        url: "/admin/student-reports/payments/excel",
        method: "GET",
        params: filters,
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
    }),

  }),

  overrideExisting: false,
});

export const {
  useDownloadPaymentsExcelMutation,
  useDownloadStudentsExcelMutation,
  useGetStudentsQuery,
} = studentReportsApi;