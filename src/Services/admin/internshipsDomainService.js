import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiService } from "../../config/apiConfig";

export const internshipsDomainApi = createApi({
  ...createApiService({
    reducerPath: "internshipsDomainApi",
    baseUrl: "/admin/internshipsdomain",
    tagTypes: ["InternshipDomain"],
  }),

  endpoints: (builder) => ({
       /* ================= GET DOMAIN BY ID ================= */
    getInternshipsDomainById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: "InternshipDomain", id },
      ],
      refetchOnMountOrArgChange: true,
    }),

    /* ================= CREATE DOMAIN ================= */
    createInternshipsDomain: builder.mutation({
      query: (domainData) => ({
        url: "/",
        method: "POST",
        body: domainData,
      }),
      invalidatesTags: [{ type: "InternshipDomain", id: "LIST" }],
    }),

    /* ================= UPDATE DOMAIN ================= */
    updateInternshipsDomain: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "InternshipDomain", id },
        { type: "InternshipDomain", id: "LIST" },
      ],
    }),

    /* ================= DELETE DOMAIN ================= */
    deleteInternshipsDomain: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "InternshipDomain", id },
        { type: "InternshipDomain", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetInternshipsDomainByIdQuery,
  useLazyGetInternshipsDomainByIdQuery,
  useCreateInternshipsDomainMutation,
  useUpdateInternshipsDomainMutation,
  useDeleteInternshipsDomainMutation,
} = internshipsDomainApi;
