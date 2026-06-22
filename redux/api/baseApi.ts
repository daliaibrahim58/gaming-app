/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "/",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

const baseQuery = async (args: any, api: any, extraOptions: any) => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");

    if (!user) {
      return {
        error: {
          status: 401,
          data: "User not found",
        },
      };
    }
  }

  return rawBaseQuery(args, api, extraOptions);
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  endpoints: () => ({}),
});
