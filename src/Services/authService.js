// features/auth/authApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiService } from "../config/apiConfig";

export const authApi = createApi({

  ...createApiService({
    reducerPath: 'authApi',
    baseUrl: '/auth',
    tagTypes: ['Auth'],
    keepUnusedDataFor: 30, // Shorter cache for auth
    refetchOnMountOrArgChange: true, // Always fresh auth
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
      // Optimistic updates
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        // You can add optimistic update logic here
      },
    }),

    signup: builder.mutation({
      query: (credentials) => ({
        url: '/signup',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    verifyAuth: builder.query({
      query: () => "/verify",
      
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: '/refresh',
        method: 'POST',
      }),
      // Don't invalidate auth to prevent loops
      invalidatesTags: [],
    }),

    sendVerificationEmail: builder.mutation({
      query: (body) => ({
        url: '/send-verification-email',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    verifyEmail: builder.query({
      query: ({ ivfm, id }) => `/verify-email?ivfm=${ivfm}&id=${id}`,
      providesTags: ['Auth'],
      // One-time verification, no need to cache
      keepUnusedDataFor: 0,
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/forgot-password',
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: ['Auth'],
    }),

    resetPassword: builder.mutation({
      query: ({ email, rspd, newPassword }) => ({
        url: '/reset-password',
        method: 'POST',
        body: { email, rspd, newPassword },
      }),
      invalidatesTags: ['Auth'],
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
      // Clear all auth data on logout
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        // Clear all queries
        dispatch(authApi.util.resetApiState());
      },
    }),
  }),
});

// Enhanced hooks with better TypeScript
export const {
  useLoginMutation,
  useSignupMutation,
  useVerifyAuthQuery,
  useLazyVerifyAuthQuery,
  useRefreshTokenMutation,
  useSendVerificationEmailMutation,
  useVerifyEmailQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authApi;

// Utility exports for advanced usage
export const {
  util: {
    updateQueryData,
    patchQueryData,
    prefetch,
    getRunningOperationPromises,
    getRunningMutations,
    getRunningQueries,
  },
} = authApi;