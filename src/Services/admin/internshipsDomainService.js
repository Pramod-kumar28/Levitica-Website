import { api } from "../api";

export const internshipsDomainApi = api.injectEndpoints({
  endpoints: (builder) => ({

    /* ================= GET DOMAIN BY ID ================= */
    getInternshipsDomainById: builder.query({
      query: (id) => ({
        url: `/admin/internshipsdomain/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: "InternshipDomain", id },
      ],
    }),

    /* ================= CREATE DOMAIN ================= */
    createInternshipsDomain: builder.mutation({
      query: (domainData) => ({
        url: "/admin/internshipsdomain",
        method: "POST",
        body: domainData,
      }),
      invalidatesTags: [{ type: "InternshipDomain", id: "LIST" }],
    }),

    /* ================= UPDATE DOMAIN ================= */
    updateInternshipsDomain: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/admin/internshipsdomain/${id}`,
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
        url: `/admin/internshipsdomain/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "InternshipDomain", id },
        { type: "InternshipDomain", id: "LIST" },
      ],
    }),

  }),

  overrideExisting: false,
});

export const {
  useGetInternshipsDomainByIdQuery,
  useLazyGetInternshipsDomainByIdQuery,
  useCreateInternshipsDomainMutation,
  useUpdateInternshipsDomainMutation,
  useDeleteInternshipsDomainMutation,
} = internshipsDomainApi;