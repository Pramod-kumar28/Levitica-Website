import { api } from '@/Services/api';

export const adminManagementApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ CREATE ADMIN
    createAdmin: builder.mutation({
      query: (body) => ({
        url: "/admin/admins",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Admin", id: "LIST" }],
    }),

    // ✅ GET ALL ADMINS
    getAdmins: builder.query({
      query: () => ({
        url: "/admin/admins",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Admin", id: "LIST" },
              ...result.data.map((admin) => ({
                type: "Admin",
                id: admin._id,
              })),
            ]
          : [{ type: "Admin", id: "LIST" }],
    }),

    // ✅ GET SINGLE ADMIN
    getAdminById: builder.query({
      query: (id) => ({
        url: `/admin/admins/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: "Admin", id },
      ],
    }),

    // ✅ UPDATE ADMIN
    updateAdmin: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/admin/admins/${id}`,
        method: "PUT",
        body,
      }),

      async onQueryStarted({ id, ...body }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getAdmins", undefined, (draft) => {
            const admin = draft?.data?.find((a) => a._id === id);
            if (admin) {
              Object.assign(admin, body);
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
        { type: "Admin", id },
      ],
    }),

    // ✅ DELETE ADMIN
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/admins/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getAdmins", undefined, (draft) => {
            draft.data = draft.data.filter((a) => a._id !== id);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: [{ type: "Admin", id: "LIST" }],
    }),

  }),

  overrideExisting: false,
});

export const {
  useCreateAdminMutation,
  useGetAdminsQuery,
  useGetAdminByIdQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminManagementApi;