import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ LOGIN
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    // ✅ SIGNUP
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    // ✅ VERIFY AUTH
    verifyAuth: builder.query({
      query: () => ({
        url: "/auth/verify",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    // ✅ REFRESH TOKEN
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),

    // ✅ SEND VERIFICATION EMAIL
    sendVerificationEmail: builder.mutation({
      query: (body) => ({
        url: "/auth/send-verification-email",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    // ✅ CHANGE PASSWORD
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/auth/change-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    // ✅ VERIFY EMAIL
    verifyEmail: builder.query({
      query: ({ ivfm, id }) => ({
        url: `/auth/verify-email?ivfm=${ivfm}&id=${id}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
      keepUnusedDataFor: 0,
    }),

    // ✅ FORGOT PASSWORD
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["Auth"],
    }),

    // ✅ RESET PASSWORD
    resetPassword: builder.mutation({
      query: ({ email, rspd, newPassword }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: { email, rspd, newPassword },
      }),
      invalidatesTags: ["Auth"],
    }),

    // ✅ LOGOUT
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;

        // 🔥 Clear entire RTK Query cache
        dispatch(api.util.resetApiState());
      },
    }),

  }),

  overrideExisting: false,
});

export const {
  useLoginMutation,
  useSignupMutation,
  useChangePasswordMutation,
  useVerifyAuthQuery,
  useRefreshTokenMutation,
  useSendVerificationEmailMutation,
  useVerifyEmailQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authApi;

// Export utilities from main api
export const {
  util: {
    updateQueryData,
    patchQueryData,
    prefetch,
    getRunningOperationPromises,
    getRunningMutations,
    getRunningQueries,
  },
} = api;