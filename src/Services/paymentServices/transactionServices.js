import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiService } from "../../config/apiConfig";

export const transactionApi = createApi({
    ...createApiService({
        reducerPath: "transactionApi",
        baseUrl: "/admin/transactions",
        tagTypes: ["Transaction"],
    }),

    endpoints: (builder) => ({
        getTransaction: builder.query({
            query: ({ page = 1, limit = 10 }) => ({
                url: "/",
                method: "GET",
                params: { page, limit },
            }),

            providesTags: ["Transaction"],
        }),
        getInternshipTransaction: builder.query({
            query: ({ page = 1, limit = 10 }) => ({
                url: "/internship-payments",
                method: "GET",
                params: { page, limit },
            }),
            providesTags: ["InternshipTransaction"],
        }),
        getCombinedStats:builder.query({
            query: () => ({
                url: "/combined-stats",
                method: "GET",
        })
    })
    })
})

export const { useGetTransactionQuery, useGetInternshipTransactionQuery,useGetCombinedStatsQuery } = transactionApi;
