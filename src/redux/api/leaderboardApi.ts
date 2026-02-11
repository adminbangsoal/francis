import {
  LeaderboardPtnResponse,
  LeaderboardResponse,
  MyRankResponse,
} from "@/types";
import { baseApi } from "./baseApi";

export const LeaderboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTop100Leaderboard: builder.query<LeaderboardResponse, void>({
      query: () => ({
        url: "/leaderboards",
        method: "GET",
      }),
    }),
    getMyRank: builder.query<MyRankResponse, void>({
      query: () => ({
        url: "/leaderboards/my-rank",
        method: "GET",
      }),
    }),
    getPtnRank: builder.query<LeaderboardPtnResponse, void>({
      query: () => ({
        url: "/leaderboards/ptn",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetTop100LeaderboardQuery,
  useGetMyRankQuery,
  useGetPtnRankQuery,
} = LeaderboardApi;
