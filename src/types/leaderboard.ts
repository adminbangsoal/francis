import { LeaderboardUser, ResponseWrapper } from ".";

export type LeaderboardData = {
  user: LeaderboardUser;
  totalPoints: number;
  rank: number;
};

export type MyRank = {
  rank: number;
  point: number;
};

export type LeaderboardPtn = {
  ptn: string;
  major: string;
};

export type LeaderboardResponse = ResponseWrapper<LeaderboardData[]>;
export type MyRankResponse = ResponseWrapper<MyRank>;
export type LeaderboardPtnResponse = ResponseWrapper<LeaderboardPtn[]>;
