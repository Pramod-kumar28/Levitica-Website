// config/baseQueryWithReauth.js
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from '@/features/authSlice';

const BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_LOCAL_API_URL

//  shared refresh lock
let refreshPromise = null;

export const createBaseQueryWithReauth = () => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    credentials: "include",
    prepareHeaders: (headers, { endpoint }) => {
      headers.set("X-Requested-With", "XMLHttpRequest");

      if (endpoint !== "uploadFile") {
        headers.set("Content-Type", "application/json");
      }

      return headers;
    },
    timeout: 30000,
  });

  return async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (
      result.error?.status === 401 &&
      args?.url !== "/auth/refresh"
    ) {
      try {
        if (!refreshPromise) {
          refreshPromise = baseQuery(
            { url: "/auth/refresh", method: "POST" },
            api,
            extraOptions
          ).finally(() => {
            refreshPromise = null;
          });
        }

        const refreshResult = await refreshPromise;

        if (refreshResult?.data) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } catch {
        api.dispatch(logout());
      }
    }

    return result;
  };
};
