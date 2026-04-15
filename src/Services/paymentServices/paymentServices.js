import { api } from '@/Services/api';

export const paymentsApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ GET RAZORPAY CONFIG
    getRazorpayConfig: builder.query({
      query: () => ({
        url: "/api/payments/config",
        method: "GET",
      }),
      providesTags: ["Payments"],
    }),
    // payment history
    getMyPayments: builder.query({
      query: () => "/api/payments/my",
      providesTags: ["Payments"],
    }),


    // ✅ CREATE ORDER
    createOrder: builder.mutation({
      query: ({ courseIds, userId }) => ({
        url: "/api/payments/order",
        method: "POST",
        body: { courseIds, userId },
      }),
      invalidatesTags: ["Payments"],
    }),

    // ✅ VERIFY PAYMENT
    verifyPayment: builder.mutation({
      query: (payload) => ({
        url: "/api/payments/verify",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Payments"],
    }),

  }),

  overrideExisting: false,
});

export const {
  useGetMyPaymentsQuery,
  useGetRazorpayConfigQuery,
  useCreateOrderMutation,
  useVerifyPaymentMutation,
} = paymentsApi;