import {
  AddTOHistoryExplanationFeedbackRespone,
  AddTOHistoryQuestionNotesResponse,
  GetAllTOHistoryResponse,
  GetTOHistoryDetailResponse,
  GetTOHistoryExplanationResponse,
  GetTOHistoryQuestionAnalyticsResponse,
  GetTOHistoryQuestionDetailResponse,
  GetTOHistoryQuestionNotesResponse,
  GetTOHistoryQuestionsBySetsResponse,
  GetTOHistoryScoreAnalyticsResponse,
  GetTOHistorySetsResponse,
  GetTOHistorySubjectAnalyticsResponse,
} from "@/types/tryout-history";
import { baseApi } from "./baseApi";

export const tryoutHistoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTOHistory: builder.query<GetAllTOHistoryResponse, void>({
      query: () => ({
        url: "/tryout-history",
        method: "GET",
      }),
    }),
    getTOHistoryDetail: builder.query<
      GetTOHistoryDetailResponse,
      { tryout_id: string }
    >({
      query: ({ tryout_id }) => ({
        url: `/tryout-history/${tryout_id}`,
        method: "GET",
      }),
    }),
    getTOHistorySets: builder.query<
      GetTOHistorySetsResponse,
      { tryout_id: string }
    >({
      query: ({ tryout_id }) => ({
        url: `/tryout-history/${tryout_id}/sets`,
        method: "GET",
      }),
    }),
    getTOHistoryQuestionsBySets: builder.query<
      GetTOHistoryQuestionsBySetsResponse,
      { set_id: string }
    >({
      query: ({ set_id }) => ({
        url: `/tryout-history/sets/${set_id}/questions`,
        method: "GET",
      }),
    }),
    getTOHistoryQuestionDetail: builder.query<
      GetTOHistoryQuestionDetailResponse,
      { question_id: string }
    >({
      query: ({ question_id }) => ({
        url: `/tryout-history/questions/${question_id}`,
        method: "GET",
      }),
    }),
    getTOHistoryQuestionNotes: builder.query<
      GetTOHistoryQuestionNotesResponse,
      { question_id: string }
    >({
      query: ({ question_id }) => ({
        url: `/tryout-history/questions/${question_id}/notes`,
        method: "GET",
      }),
    }),

    addTOHistoryQuestionNotes: builder.mutation<
      AddTOHistoryQuestionNotesResponse,
      { question_id: string; asset_url: string }
    >({
      query: ({ question_id, ...body }) => ({
        url: `/tryout-history/questions/${question_id}/notes`,
        method: "POST",
        body,
      }),
    }),
    getTOHistoryExplanation: builder.query<
      GetTOHistoryExplanationResponse,
      { question_id: string }
    >({
      query: ({ question_id }) => ({
        url: `/tryout-history/questions/${question_id}/explanation`,
        method: "GET",
      }),
    }),
    addTOHistoryExplanationFeedback: builder.mutation<
      AddTOHistoryExplanationFeedbackRespone,
      { question_id: string; is_liked: boolean }
    >({
      query: ({ question_id, ...body }) => ({
        url: `/tryout-history/questions/${question_id}/explanation-feedback`,
        method: "POST",
        body,
      }),
    }),
    getTOHistoryQuestionAnalytics: builder.query<
      GetTOHistoryQuestionAnalyticsResponse,
      { question_id: string }
    >({
      query: ({ question_id }) => ({
        url: `/tryout-history/questions/${question_id}/analytics`,
        method: "GET",
      }),
    }),
    getTOHistoryScoreAnalytics: builder.query<
      GetTOHistoryScoreAnalyticsResponse,
      void
    >({
      query: () => ({
        url: `/tryout-history/score-analytics`,
        method: "GET",
      }),
    }),
    getTOHistorySubjectAnalytics: builder.query<
      GetTOHistorySubjectAnalyticsResponse,
      void
    >({
      query: () => ({
        url: `/tryout-history/subject-analytics`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddTOHistoryExplanationFeedbackMutation,
  useAddTOHistoryQuestionNotesMutation,
  useGetAllTOHistoryQuery,
  useGetTOHistoryDetailQuery,
  useGetTOHistoryExplanationQuery,
  useGetTOHistoryQuestionAnalyticsQuery,
  useGetTOHistoryQuestionDetailQuery,
  useGetTOHistoryQuestionNotesQuery,
  useGetTOHistoryQuestionsBySetsQuery,
  useGetTOHistorySetsQuery,
  useGetTOHistoryScoreAnalyticsQuery,
  useGetTOHistorySubjectAnalyticsQuery,
} = tryoutHistoryApi;
