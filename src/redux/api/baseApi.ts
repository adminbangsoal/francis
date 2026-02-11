import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { apiConfig } from "./config";

export const baseApi = createApi({
  tagTypes: [
    "Profile",
    "Subject",
    "Topic",
    "LatihanSoal",
    "LatihanSoalTimed",
    "LatihanSoalDetail",
    "QuestionNavigation",
    "LatihanSoalAttempt",
    "Feedback",
    "Dashboard",
    "DashboardProfile",
    "LatihanSoalTimed",
    "RiwayatLatihanSoal",
    "RiwayatTimedLatihanSoal",
    "Tryout",
    "TryoutSetQuestions",
    "TryoutRegistration",
    "Catatan",
    "Referral",
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: apiConfig.baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  refetchOnReconnect: true,
  endpoints: (builder) => ({}),
});
