import { PTNResponse } from "@/types";
import { baseApi } from "./baseApi";

export const ptnApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPTN: builder.query<PTNResponse, void>({
      query: () => ({
        url: "/ptn",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllPTNQuery } = ptnApi;
