import { api } from '@/Services/api';

export const promoApi = api.injectEndpoints({
    endpoints: (builder) => ({

        // GET ALL PROMOS
        getPromos: builder.query({
            query: () => ({
                url: "/admin/promocode",
                method: "GET",
            }),
            providesTags: ["Promos"],
        }),

        // CREATE PROMO
        createPromo: builder.mutation({
            query: (payload) => ({
                url: "/admin/promocode",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Promos"],
        }),

        // UPDATE PROMO
        updatePromo: builder.mutation({
            query: ({ id, ...payload }) => ({
                url: `/admin/promocode/${id}`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["Promos"],
        }),

        // DELETE PROMO
        deletePromo: builder.mutation({
            query: (id) => ({
                url: `/admin/promocode/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Promos"],
        }),

        // TOGGLE ACTIVE / INACTIVE
        togglePromo: builder.mutation({
            query: (id) => ({
                url: `/admin/promocode/toggle/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Promos"],
        }),

    }),

    overrideExisting: false,
});
export const {
    useGetPromosQuery,
    useLazyGetPromosQuery, // optional (like your unassigned)
    useCreatePromoMutation,
    useUpdatePromoMutation,
    useDeletePromoMutation,
    useTogglePromoMutation,
} = promoApi;