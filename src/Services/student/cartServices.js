import { api } from "../api";

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ GET USER CART
    getCart: builder.query({
      query: (userId) => ({
        url: `/api/cart/${userId}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    // ✅ ADD ITEM TO CART
    addItem: builder.mutation({
      query: ({ userId, courseId }) => ({
        url: "/api/cart/add",
        method: "POST",
        body: { userId, courseId },
      }),
      invalidatesTags: ["Cart"],
    }),

    // ✅ REMOVE ITEM FROM CART
    removeItem: builder.mutation({
      query: ({ userId, courseId }) => ({
        url: "/api/cart/remove",
        method: "POST",
        body: { userId, courseId },
      }),
      invalidatesTags: ["Cart"],
    }),

    // ✅ CLEAR CART
    clearCart: builder.mutation({
      query: (userId) => ({
        url: `/api/cart/clear/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

  }),

  overrideExisting: false,
});

export const {
  useGetCartQuery,
  useAddItemMutation,
  useRemoveItemMutation,
  useClearCartMutation,
} = cartApi;