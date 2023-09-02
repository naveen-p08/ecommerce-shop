import { apiSlice } from "./apiSlice.js";
import { ORDERS_URL } from "../constants.js";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApiSlice;
