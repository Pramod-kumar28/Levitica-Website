import { api } from "../api";

export const internshipsApi = api.injectEndpoints({
  endpoints: (builder) => ({

    /* ================= GET ALL INTERNSHIP DOMAINS ================= */
    getAllInternshipsDomains: builder.query({
      query: (params = {}) => ({
        url: "/internship",
        params,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({
                type: "InternshipDomain",
                id: _id,
              })),
              { type: "InternshipDomain", id: "LIST" },
            ]
          : [{ type: "InternshipDomain", id: "LIST" }],
    }),

    /* ================= CREATE RAZORPAY ORDER ================= */
    createInternshipOrder: builder.mutation({
      query: (orderData) => ({
        url: "/internship/payments/create-order",
        method: "POST",
        body: orderData,
      }),
    }),

    /* ================= VERIFY RAZORPAY PAYMENT ================= */
    verifyInternshipPayment: builder.mutation({
      query: (paymentData) => ({
        url: "/internship/payments/verify-payment",
        method: "POST",
        body: paymentData,
      }),
    }),

    /* ================= SAVE PAYMENT DETAILS ================= */
    saveInternshipPayment: builder.mutation({
      query: (paymentDetails) => ({
        url: "/internship/payments/save-payment",
        method: "POST",
        body: paymentDetails,
      }),
    }),

  }),

  overrideExisting: false,
});

export const {
  useGetAllInternshipsDomainsQuery,
  useCreateInternshipOrderMutation,
  useVerifyInternshipPaymentMutation,
  useSaveInternshipPaymentMutation,
  
} = internshipsApi;