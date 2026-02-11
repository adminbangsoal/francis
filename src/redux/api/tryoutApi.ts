import {
  GetAllTryoutsResponse,
  RegisteredTryoutsResponse,
  StartTryoutResponse,
  StartTryoutSetResponse,
  SubmitTryoutResponse,
  SubmitTryoutSetResponse,
  TryoutDetailResponse,
  TryoutQuestionAttemptRequest,
  TryoutQuestionAttemptResponse,
  TryoutQuestionDetailResponse,
  TryoutQuestionToggleFlagResponse,
  TryoutSetQuestionsResponse,
  TryoutSetSequenceResponse,
  TryoutStateResponse,
} from "@/types/tryout";
import { baseApi } from "./baseApi";

export const tryoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTryouts: builder.query<
      GetAllTryoutsResponse,
      { mode: "pro" | "kilat" }
    >({
      query: ({ mode }) => ({
        url: "/tryouts",
        method: "GET",
        params: {
          mode,
        },
      }),
    }),
    getAllOnFinishedTryouts: builder.query<
      GetAllTryoutsResponse,
      { mode: "pro" | "kilat" }
    >({
      query: ({ mode }) => ({
        url: "/tryouts?progress=finished",
        method: "GET",
        params: {
          mode,
        },
      }),
    }),
    getTryoutDetail: builder.query<TryoutDetailResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/tryouts/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, { id }) => [{ type: "Tryout", id }],
    }),
    startTryout: builder.mutation<
      StartTryoutResponse,
      { id: string; event_code?: string }
    >({
      query: ({ id, event_code }) => ({
        url: `/tryouts/start`,
        method: "POST",
        body: {
          tryout_id: id,
          event_code: event_code || undefined,
        },
      }),
      invalidatesTags: ["Tryout"],
    }),
    startTryoutSet: builder.mutation<
      StartTryoutSetResponse,
      { tryout_id: string; set_id: string }
    >({
      query: ({ tryout_id, set_id }) => ({
        url: `/tryouts/sets/start`,
        method: "POST",
        body: {
          tryout_id,
          set_id,
        },
      }),
      invalidatesTags: ["Tryout"],
    }),
    getTryoutSetQuestionList: builder.query<
      TryoutSetQuestionsResponse,
      { set_id: string }
    >({
      query: ({ set_id }) => ({
        url: `/tryouts/sets/${set_id}/questions`,
        method: "GET",
      }),
      providesTags: (_, __, { set_id }) => [
        { type: "TryoutSetQuestions", id: set_id },
      ],
    }),
    updateCurrentToQuestion: builder.mutation<
      TryoutSetQuestionsResponse,
      { set_id: string; question_id: string }
    >({
      query: ({ set_id, question_id }) => ({
        url: `/tryouts/sets/${set_id}/current-question`,
        method: "PUT",
        body: {
          question_id,
        },
      }),
    }),
    toggleFlagTryoutQuestion: builder.mutation<
      TryoutQuestionToggleFlagResponse,
      { question_id: string; set_id: string }
    >({
      query: ({ set_id, question_id }) => ({
        url: `/tryouts/sets/${set_id}/questions/flag`,
        method: "POST",
        body: {
          question_id,
        },
      }),
      invalidatesTags: (_, __, { set_id }) => [
        { type: "TryoutSetQuestions", id: set_id },
      ],
    }),
    getTryoutQuestionDetail: builder.query<
      TryoutQuestionDetailResponse,
      { set_id: string; question_id: string }
    >({
      query: ({ set_id, question_id }) => ({
        url: `/tryouts/sets/${set_id}/questions/${question_id}`,
        method: "GET",
      }),
      providesTags: (_, __, { set_id, question_id }) => [
        { type: "TryoutSetQuestions", id: question_id },
      ],
    }),
    attemptTryoutQuestion: builder.mutation<
      TryoutQuestionAttemptResponse,
      TryoutQuestionAttemptRequest
    >({
      query: ({ set_id, answer, question_id }) => ({
        url: `/tryouts/sets/${set_id}/questions`,
        method: "POST",
        body: {
          question_id,
          answer,
        },
      }),

      invalidatesTags: ["TryoutSetQuestions"],
    }),
    getTryoutState: builder.query<TryoutStateResponse, void>({
      query: () => ({
        url: `/tryouts/state`,
        method: "GET",
      }),
      providesTags: ["Tryout"],
    }),
    submitTryoutSet: builder.mutation<
      SubmitTryoutSetResponse,
      { set_id: string }
    >({
      query: ({ set_id }) => ({
        url: `/tryouts/sets/submit`,
        method: "POST",
        body: {
          set_id,
        },
      }),
      invalidatesTags: ["TryoutSetQuestions"],
    }),
    submitTryout: builder.mutation<SubmitTryoutResponse, { tryout_id: string }>(
      {
        query: ({ tryout_id }) => ({
          url: `/tryouts/submit`,
          method: "POST",
          body: {
            tryout_id,
          },
        }),
        invalidatesTags: ["Tryout"],
      },
    ),
    getRegisteredTryouts: builder.query<RegisteredTryoutsResponse, void>({
      query: () => ({
        url: "/tryouts/registered",
        method: "GET",
      }),
    }),
    getTryoutSetSequence: builder.query<
      TryoutSetSequenceResponse,
      { tryout_id: string }
    >({
      query: ({ tryout_id }) => ({
        url: `/tryouts/sets/${tryout_id}/sequence`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllTryoutsQuery,
  useGetTryoutDetailQuery,
  useStartTryoutMutation,
  useGetTryoutSetQuestionListQuery,
  useLazyGetTryoutSetQuestionListQuery,
  useStartTryoutSetMutation,
  useUpdateCurrentToQuestionMutation,
  useToggleFlagTryoutQuestionMutation,
  useGetTryoutQuestionDetailQuery,
  useAttemptTryoutQuestionMutation,
  useGetAllOnFinishedTryoutsQuery,
  useGetTryoutStateQuery,
  useSubmitTryoutSetMutation,
  useSubmitTryoutMutation,
  useGetRegisteredTryoutsQuery,
  useGetTryoutSetSequenceQuery,
  useLazyGetAllTryoutsQuery,
} = tryoutApi;
