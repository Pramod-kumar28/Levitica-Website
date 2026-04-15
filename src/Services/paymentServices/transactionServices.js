import { api } from '@/Services/api';

export const transactionApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ GET COURSE TRANSACTIONS
    getTransaction: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/admin/transactions",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Transaction"],
    }),

    // ✅ GET INTERNSHIP TRANSACTIONS
    getInternshipTransaction: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/admin/transactions/internship-payments",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["InternshipTransaction"],
    }),

    // ✅ GET COMBINED STATS
    getCombinedStats: builder.query({
      query: () => ({
        url: "/admin/transactions/combined-stats",
        method: "GET",
      }),
    }),

  }),

  overrideExisting: false,
});

export const {
  useGetTransactionQuery,
  useGetInternshipTransactionQuery,
  useGetCombinedStatsQuery,
} = transactionApi;