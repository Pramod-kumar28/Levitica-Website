import { createApi } from '@reduxjs/toolkit/query/react';
import { createApiService } from '../../config/apiConfig';

export const internshipsApi = createApi({
  ...createApiService({
    reducerPath: 'internshipsApi',
    baseUrl: '/internship',
    tagTypes: ['Internships','InternshipDomain'],
  }),

  endpoints: (builder) => ({

      
    getAllInternshipsDomains: builder.query({
      query: (params = {}) => ({
        url: "/",
        params, // 👈 THIS is the key
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
    // Create Razorpay order
    createInternshipOrder: builder.mutation({
      query: (orderData) => ({
        url: '/payments/create-order',
        method: 'POST',
        body: orderData,
      }),
    }),

    // Verify Razorpay payment
    verifyInternshipPayment: builder.mutation({
      query: (paymentData) => ({
        url: '/payments/verify-payment',
        method: 'POST',
        body: paymentData,
      }),
    }),

    // Optional: Save payment details
    saveInternshipPayment: builder.mutation({
      query: (paymentDetails) => ({
        url: '/payments/save-payment',
        method: 'POST',
        body: paymentDetails,
      }),
    }),
  }),
});

export const {
  useGetAllInternshipsDomainsQuery,
  useCreateInternshipOrderMutation,
  useVerifyInternshipPaymentMutation,
  useSaveInternshipPaymentMutation,
} = internshipsApi;
