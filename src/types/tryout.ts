import { ResponseWrapper } from ".";

export type TryoutBase = {
  id: string;
  name: string;
  end_date: string;
  start_date: string;
  started_at: null | string;
  submitted_at: null | string;
  current_set_id: null | string;
  expiry_date: string;
  event_name: null | string;
};

export type TryoutSet = {
  id: string;
  subject_id: string;
  subject_name: string;
  duration: number;
  total_questions: number;
};
export type TryoutDetail = {
  id: string;
  name: string;
  expiry_date: string;
  description: string;
  is_kilat: boolean;
  buffer_duration: number;
  sets: TryoutSet[];
  total_sets_questions: number;
  total_sets_durations: number;
  total_duration: number;
  started_at: string | null;
  event_name: string | null;
};

export type TryoutDetailResponse = ResponseWrapper<TryoutDetail>;

export type GetAllTryoutsResponse = ResponseWrapper<{
  mode: "pro" | "kilat";
  tryouts: TryoutBase[];
}>;

export type StartTryout = {
  id: string;
  tryout_id: string;
  started_at: string;
  first_set_id: string;
};

export type StartTryoutResponse = ResponseWrapper<StartTryout>;

export type StartTryoutSet = {
  id: string;
  tryout_id: string;
  set_id: string;
  started_at: string;
};

export type StartTryoutSetResponse = ResponseWrapper<StartTryoutSet>;

export type TryoutSetQuestions = {
  subject_name: string;
  questions: {
    id: string;
    is_answered: boolean;
    is_flagged: boolean;
  }[];
  current_question_id: string;
};

export type TryoutSetQuestionsResponse = ResponseWrapper<TryoutSetQuestions>;

export type TryoutUpdateCurrentQuestion = {
  id: string;
  current_question_id: string;
};

export type TryoutUpdateCurrentQuestionResponse =
  ResponseWrapper<TryoutUpdateCurrentQuestion>;

export type TryoutQuestionToggleFlag = {
  question_id: string;
  is_flagged: boolean;
};

export type TryoutQuestionToggleFlagResponse =
  ResponseWrapper<TryoutQuestionToggleFlag>;

export type TryoutQuestionDetail = {
  id: string;
  content: string;
  options: {
    content: string;
    key: string;
    id: string;
  }[];
  source: string;
  is_text_answer: boolean;
  answer: string | null;
  option_id: string | null;
  is_flagged: boolean;
  subject_name: string;
  content_asset: string | null;
};

export type TryoutQuestionDetailResponse =
  ResponseWrapper<TryoutQuestionDetail>;

export type TryoutQuestionAttempt = {
  id: string;
  content: string;
  options: {
    content: string;
    key: string;
    id: string;
  }[];
  is_text_answer: boolean;
  answer: string;
  option_id: string | null;
  is_flagged: boolean;
};

export type TryoutQuestionAttemptRequest = {
  set_id: string;
  question_id: string;
  answer: string;
};

export type TryoutQuestionAttemptResponse =
  ResponseWrapper<TryoutQuestionAttempt>;

export type TryoutState = {
  tryout_id: string;
  current_set: {
    id: string;
    startedAt: string;
    submittedAt: string | null;
    tryoutId: string;
    tryoutSetId: string;
    userId: string;
    currentQuestionId: string;
    duration: number;
    subject_name: string;
  } | null;
  total_duration: number;
  started_at: string;
  next_set_id: string | null;
  next_subject: string | null;
  next_set_duration: number | null;
  tryout: {
    id: string;
    name: string;
    description: string;
    label: string;
    time_limit: number;
    event_name: null | string;
    expiry_date: string;
    first_set_id: string;
    logo_src: string;
  };
};

export type TryoutStateResponse = ResponseWrapper<TryoutState | null>;

export type SubmitTryoutSet = {
  id: string;
  tryout_id: string;
  set_id: string;
  started_at: string;
  submitted_at: string;
  next_set_id: string;
};

export type SubmitTryoutSetResponse = ResponseWrapper<SubmitTryoutSet>;

export type SubmitTryout = {
  id: string; // attempt id
  tryout_id: string;
  started_at: string;
  submitted_at: string;
};

export type SubmitTryoutResponse = ResponseWrapper<SubmitTryout>;

export type RegisteredTryout = {
  tryout_id: string;
};
export type RegisteredTryoutsResponse = ResponseWrapper<RegisteredTryout[]>;

export type TryoutSetSequenceResponse = ResponseWrapper<
  {
    id: string;
    name: string;
  }[]
>;
