// config/baseQueryWithReauth.js
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, tokenRefreshed } from "../features/authSlice";

const BASE_URL =
  process.env.REACT_APP_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_LOCAL_API_URL

//  shared refresh lock
let refreshPromise = null;

export const createBaseQueryWithReauth = (baseUrl = "") => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}${baseUrl}`,
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

    if (result.error?.status === 401) {
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
          api.dispatch(tokenRefreshed());

          // 🔁 retry original request
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
