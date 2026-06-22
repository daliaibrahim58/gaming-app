/* eslint-disable @typescript-eslint/no-unused-vars */
import { baseApi } from "./baseApi";
import gamesData from "@/data/games.json";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      queryFn: (searchWord?: string) => {
        try {
          const games = gamesData.games;

          if (searchWord) {
            const filtered = games.filter((g) =>
              g.title.toLowerCase().includes(searchWord.toLowerCase()),
            );

            return { data: filtered };
          }

          return { data: games };
        } catch (err) {
          return {
            error: {
              status: 500,
              data: "error loading products",
            },
          };
        }
      },
    }),

    getProductById: builder.query({
      queryFn: (id: number | string) => {
        try {
          const games = gamesData.games;

          const product = games.find((g) => g.id === Number(id));

          if (!product) {
            return {
              error: {
                status: 404,
                data: "not found",
              },
            };
          }

          return { data: product };
        } catch {
          return {
            error: {
              status: 500,
              data: "error",
            },
          };
        }
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
