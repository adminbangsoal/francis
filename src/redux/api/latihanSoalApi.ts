import {
  AnswerLatihanSoalTimedRequest,
  DownloadPDFRequest,
  DownloadPDFResponse,
  FeedbackResponse,
  GetAllCurrentAttemptedTimedQuestionsResponse,
  GetLatihanSoalAttemptRequest,
  GetLatihanSoalSekuensialResponse,
  GetRiwayatLatihanSoalAttemptResponse,
  GetSubjectBySlugResponse,
  GetTimedLatihanSoalSummaryResponse,
  LatihanSoalAttemptRequest,
  LatihanSoalAttemptResponse,
  LatihanSoalBySubjectRequest,
  LatihanSoalBySubjectResponse,
  LatihanSoalClassicBySubjectResponse,
  LatihanSoalClassicResponse,
  LatihanSoalHistoryByIdResponse,
  LatihanSoalHistoryRequest,
  LatihanSoalHistoryResponse,
  LatihanSoalSekuensialRequest,
  LatihanSoalSekuensialResponse,
  LatihanSoalTimedResponse,
  NextLatihanSoalSekuensialResponse,
  PembahasanQuestionResponse,
  QuestionNavigationRequest,
  QuestionNavigationResponse,
  ResponseWrapper,
  RiwayatLatihanSoalListResponse,
  RiwayatTimedLatihanSoalQuestionsResponse,
  SoalQuestionDetailResponse,
  SubjectDetailRequest,
  SubjectResponse,
  SubmitNotesLatihanSoalRequest,
  SubmitNotesLatihanSoalResponse,
  TopicBySubjectResponse,
  TopicResponse,
  UploadAssetRequest,
} from "@/types";
import { baseApi } from "./baseApi";

export const latihanSoal = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubjects: builder.query<SubjectResponse, void>({
      query: () => ({
        url: "/subjects",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Subject" as const,
                id,
              })),
              { type: "Subject" },
            ]
          : ["Subject"],
    }),
    getSubjectBySlug: builder.query<GetSubjectBySlugResponse, { slug: string }>(
      {
        query: ({ slug }) => ({
          url: `/subjects/slug/${slug}`,
          method: "GET",
        }),
        providesTags: (result, error, { slug }) => [
          { type: "Subject", id: slug },
        ],
      },
    ),
    getTopics: builder.query<TopicResponse, void>({
      query: () => ({
        url: "/subjects/topics",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Topic" as const,
                id,
              })),
              { type: "Topic" },
            ]
          : ["Topic"],
    }),
    getTopicsBySubject: builder.query<
      TopicBySubjectResponse,
      SubjectDetailRequest
    >({
      query: ({ subject_id }) => ({
        url: `/subjects/topics/${subject_id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Topic" as const,
                id,
              })),
              { type: "Topic" },
            ]
          : ["Topic"],
    }),
    getLatihanSoal: builder.query<
      LatihanSoalBySubjectResponse,
      LatihanSoalBySubjectRequest
    >({
      query: ({ subject_id, ...params }) => ({
        url: `/latihan-soal/subject/${subject_id}`,
        method: "GET",
        params: {
          topic_id: params.topic_id,
          question_id: params.question_id,
          min_year: params.min_year ?? undefined,
          max_year: params.max_year ?? undefined,
        },
      }),
      providesTags: (result, error, { subject_id }) => [
        { type: "LatihanSoal", id: subject_id, ...result },
      ],
    }),
    getLatihanSoalDetail: builder.query<
      SoalQuestionDetailResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/latihan-soal/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [
        { type: "LatihanSoalDetail", id },
      ],
    }),
    getLatihanSoalHistory: builder.query<
      LatihanSoalHistoryResponse,
      LatihanSoalHistoryRequest
    >({
      query: ({ subject_id, topic_id }) => ({
        url: `latihan/history/subject/${subject_id}`,
        method: "GET",
        params: { topic_id },
      }),
    }),
    attemptLatihanSoal: builder.mutation<
      LatihanSoalAttemptResponse,
      LatihanSoalAttemptRequest
    >({
      query: ({ question_id, ...body }) => ({
        url: `latihan-soal/attempt/${question_id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { question_id }) => [
        { type: "LatihanSoalAttempt", id: question_id },
      ],
    }),
    getAttemptLatihanSoal: builder.query<
      LatihanSoalAttemptResponse,
      GetLatihanSoalAttemptRequest
    >({
      query: ({ question_id }) => ({
        url: `latihan-soal/attempt/${question_id}`,
        method: "GET",
      }),
      providesTags: (result, error, { question_id }) => [
        { type: "LatihanSoalAttempt", id: question_id },
      ],
    }),
    deleteAttemptLatihanSoal: builder.query<
      LatihanSoalAttemptResponse,
      GetLatihanSoalAttemptRequest
    >({
      query: ({ question_id }) => ({
        url: `latihan-soal/attempt/${question_id}`,
        method: "DELETE",
      }),
    }),
    getPembahasan: builder.query<
      PembahasanQuestionResponse,
      GetLatihanSoalAttemptRequest & { attempt_id: string }
    >({
      query: ({ question_id, attempt_id }) => ({
        url: `latihan-soal/pembahasan/${question_id}`,
        method: "GET",
        params: { attempt_id },
      }),
    }),
    submitNotesLatihanSoal: builder.mutation<
      SubmitNotesLatihanSoalResponse,
      SubmitNotesLatihanSoalRequest
    >({
      query: ({ question_id, ...body }) => ({
        url: `latihan-soal/pembahasan/${question_id}`,
        method: "POST",
        body,
      }),
    }),
    getQuestionNavigation: builder.query<
      QuestionNavigationResponse,
      QuestionNavigationRequest
    >({
      query: ({ current_question_id, subject_id, topic_id }) => ({
        url: `latihan-soal/navigation`,
        method: "GET",
        params: {
          current_question_id,
          subject_id,
          topic_id: topic_id ?? undefined,
        },
      }),
      providesTags: (_, __, { current_question_id, subject_id, topic_id }) => [
        {
          type: "QuestionNavigation",
          id: `${current_question_id}:${subject_id}:${topic_id}`,
        },
      ],
    }),
    submitLatihanSoal: builder.mutation<
      LatihanSoalAttemptResponse,
      { attempt_id: string; question_id: string }
    >({
      query: ({ attempt_id }) => ({
        url: `latihan-soal/submit/${attempt_id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { attempt_id, question_id }) => [
        { type: "LatihanSoalAttempt", id: question_id },
      ],
    }),
    downloadPdfLatihanSoal: builder.mutation<
      DownloadPDFResponse,
      DownloadPDFRequest
    >({
      query: ({ subject_id, topic_id, min_year, max_year }) => ({
        url: `latihan-soal/generate-pdf/${subject_id}`,
        method: "POST",
        body: {
          topic_id: topic_id || undefined,
          min_year,
          max_year,
        },
      }),
    }),
    getFeedback: builder.query<FeedbackResponse, { questionId: string }>({
      query: ({ questionId }) => ({
        url: `latihan-soal/feedback/${questionId}`,
      }),
      providesTags: (result, error, { questionId }) => [
        { type: "Feedback", id: questionId },
      ],
    }),
    addFeedback: builder.mutation<
      FeedbackResponse,
      { questionId: string; isLike: boolean; feedback: string }
    >({
      query: ({ questionId, isLike, feedback }) => ({
        url: `latihan-soal/feedback/${questionId}`,
        method: "POST",
        body: {
          is_like: isLike,
          feedback,
        },
      }),
      invalidatesTags: (result, error, { questionId }) => [
        { type: "Feedback", id: questionId },
      ],
    }),
    updateFeedback: builder.mutation<
      void,
      {
        feedbackId: string;
        isLike: boolean;
        feedback: string;
        questionId: string;
      }
    >({
      query: ({ feedbackId, isLike, feedback }) => ({
        url: `latihan-soal/feedback/${feedbackId}`,
        method: "PUT",
        body: {
          is_like: isLike,
          feedback: feedback,
        },
      }),
      invalidatesTags: (result, error, { questionId }) => [
        { type: "Feedback", id: questionId },
      ],
    }),
    addSubmissionAsset: builder.mutation<void, UploadAssetRequest>({
      query: ({ file, attempt_id }) => {
        const bodyFormData = new FormData();

        bodyFormData.append("file", file);

        return {
          url: `latihan-soal/submission-asset/${attempt_id}`,
          method: "POST",
          body: bodyFormData,
          formData: true,
        };
      },
    }),
    getLatihanSoalHistoryById: builder.query<
      LatihanSoalHistoryByIdResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `latihan/history/${id}`,
        method: "GET",
      }),
    }),
    getLatihanSoalTimed: builder.query<LatihanSoalTimedResponse, void>({
      query: () => ({
        url: `latihan-soal/timed`,
        method: "GET",
        cache: "no-cache",
      }),
      providesTags: ["LatihanSoalTimed"],
    }),
    getLatihanSoalSekuensial: builder.query<
      GetLatihanSoalSekuensialResponse,
      void
    >({
      query: () => ({
        url: `latihan-soal/timed/sequential`,
        method: "GET",
        cache: "no-cache",
      }),
    }),
    generateLatihanSoalSekuensial: builder.mutation<
      LatihanSoalSekuensialResponse,
      LatihanSoalSekuensialRequest
    >({
      query: ({ subject_id, ...body }) => ({
        url: `latihan-soal/timed/sequential/${subject_id}`,
        method: "POST",
        body,
      }),
    }),
    generateLatihanSoalClassic: builder.mutation<
      LatihanSoalClassicResponse,
      void
    >({
      query: () => ({
        url: `latihan-soal/timed/classic`,
        method: "POST",
      }),
    }),
    nextLatihanSoalSekuensial: builder.mutation<
      NextLatihanSoalSekuensialResponse,
      { sequential_id: string }
    >({
      query: ({ sequential_id }) => ({
        url: `latihan-soal/timed/sequential/next/${sequential_id}`,
        method: "POST",
      }),
      invalidatesTags: ["LatihanSoalTimed", "RiwayatTimedLatihanSoal"],
    }),
    attemptLatihanSoalTimed: builder.mutation<
      void,
      AnswerLatihanSoalTimedRequest
    >({
      query: ({ timed_question_id, ...body }) => ({
        url: `latihan-soal/timed/attempt/${timed_question_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["LatihanSoalTimed"],
    }),
    updateTimedCurrentQuestion: builder.mutation<
      void,
      { timed_question_id: string; question_id: string; current_number: number }
    >({
      query: ({ timed_question_id, ...params }) => ({
        url: `latihan-soal/timed/current-question/${timed_question_id}`,
        method: "PUT",
        params,
      }),
      invalidatesTags: ["LatihanSoalTimed"],
    }),
    getLatihanSoalClassicBySubject: builder.query<
      LatihanSoalClassicBySubjectResponse,
      { timed_question_id: string; subject_id: string }
    >({
      query: ({ timed_question_id, subject_id }) => ({
        url: `latihan-soal/timed/classic/${timed_question_id}?subject_id=${subject_id}`,
        method: "GET",
      }),
      providesTags: ["LatihanSoalTimed"],
    }),
    getLatihanSoalTimedAttempt: builder.query<
      GetRiwayatLatihanSoalAttemptResponse,
      { timed_question_id: string; question_id: string }
    >({
      query: ({ timed_question_id, question_id }) => ({
        url: `latihan-soal/timed/attempt/${timed_question_id}?question_id=${question_id}`,
        method: "GET",
      }),
      providesTags: ["LatihanSoalTimed"],
    }),
    getLatihanSoalTimedCurrentQuestion: builder.query<
      ResponseWrapper<{
        question_id: string;
        subject_id: string;
      }>,
      { timed_question_id: string }
    >({
      query: ({ timed_question_id }) => ({
        url: `latihan-soal/timed/current-question/${timed_question_id}`,
        method: "GET",
        cache: "no-cache",
      }),
    }),
    submitLatihanSoalTimed: builder.mutation<
      void,
      { timed_question_id: string }
    >({
      query: ({ timed_question_id }) => ({
        url: `latihan-soal/timed/submit/${timed_question_id}`,
        method: "POST",
      }),
      invalidatesTags: ["LatihanSoalTimed"],
    }),
    getTimedLatihanSoalSummary: builder.query<
      GetTimedLatihanSoalSummaryResponse,
      { timed_question_id: string }
    >({
      query: ({ timed_question_id }) => ({
        url: `latihan-soal/timed/summary/${timed_question_id}`,
        method: "GET",
        cache: "no-cache",
      }),
    }),
    getRiwayatLatihanSoalList: builder.query<
      RiwayatLatihanSoalListResponse,
      void
    >({
      query: () => ({
        url: "latihan/history/timed-questions",
        method: "GET",
      }),
      providesTags: ["RiwayatLatihanSoal"],
    }),
    getRiwayatTimedLatihanSoalById: builder.query<
      RiwayatTimedLatihanSoalQuestionsResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `latihan-soal/timed/history/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, arg) => [
        { type: "RiwayatTimedLatihanSoal", id: arg.id },
      ],
    }),
    getAllAttemptedCurrentQuestions: builder.query<
      GetAllCurrentAttemptedTimedQuestionsResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `latihan-soal/timed/attempted/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, arg) => [
        { type: "RiwayatTimedLatihanSoal", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetSubjectsQuery,
  useGetTopicsQuery,
  useGetTopicsBySubjectQuery,
  useGetLatihanSoalQuery,
  useAttemptLatihanSoalMutation,
  useDeleteAttemptLatihanSoalQuery,
  useGetAttemptLatihanSoalQuery,
  useGetLatihanSoalHistoryQuery,
  useGetPembahasanQuery,
  useSubmitNotesLatihanSoalMutation,
  useGetLatihanSoalDetailQuery,
  useLazyGetLatihanSoalQuery,
  useGetQuestionNavigationQuery,
  useLazyGetQuestionNavigationQuery,
  useSubmitLatihanSoalMutation,
  useDownloadPdfLatihanSoalMutation,
  useGetFeedbackQuery,
  useAddFeedbackMutation,
  useUpdateFeedbackMutation,
  useAddSubmissionAssetMutation,
  useLazyGetLatihanSoalHistoryQuery,
  useLazyGetSubjectsQuery,
  useGetLatihanSoalHistoryByIdQuery,
  useGetLatihanSoalTimedQuery,
  useLazyGetLatihanSoalTimedQuery,
  useGetLatihanSoalSekuensialQuery,
  useGenerateLatihanSoalSekuensialMutation,
  useNextLatihanSoalSekuensialMutation,
  useAttemptLatihanSoalTimedMutation,
  useGenerateLatihanSoalClassicMutation,
  useGetLatihanSoalClassicBySubjectQuery,
  useGetLatihanSoalTimedAttemptQuery,
  useGetLatihanSoalTimedCurrentQuestionQuery,
  useSubmitLatihanSoalTimedMutation,
  useUpdateTimedCurrentQuestionMutation,
  useGetTimedLatihanSoalSummaryQuery,
  useGetRiwayatLatihanSoalListQuery,
  useGetRiwayatTimedLatihanSoalByIdQuery,
  useLazyGetRiwayatTimedLatihanSoalByIdQuery,
  useLazyGetAllAttemptedCurrentQuestionsQuery,
  useGetAllAttemptedCurrentQuestionsQuery,
  useGetSubjectBySlugQuery,
} = latihanSoal;
