import { ResponseWrapper } from "./auth";

export type TOHistory = {
  id: string;
  name: string;
  expiry_date: string;
  attempt_id: string;
  started_at: string;
  submitted_at: string;
  score: number;
};

export type TOHistorySetResult = {
  id: string;
  subject_name: string;
  completion_time: number;
  max_duration: number;
  answered_questions: number;
  total_questions: number;
  score: number;
};

export type TOHistoryDetail = {
  id: string;
  name: string;
  total_correct_answers: number;
  total_wrong_answers: number;
  total_unanswered_questions: number;
  total_questions: number;
  set_results: TOHistorySetResult[];
  score: number;
};

export type TOHistorySets = {
  id: string;
  sets: {
    id: string;
    subject_id: string;
    subject_name: string;
  }[];
};

export type TOHistorySetQuestions = {
  id: string;
  tryout_id: string;
  subject_id: string;
  subject_name: string;
  correct_answers: number;
  wrong_answers: number;
  unanswered_questions: number;
  questions: {
    id: string;
    is_answered: boolean;
    is_correct: boolean;
    is_flagged: boolean;
  }[];
};

export type TOHistoryQuestionDetail = {
  id: string;
  option_id: string;
  options: {
    id: string;
    content: string;
    key: string;
    is_true: boolean;
  }[];
  content: string;
  is_text_answer: boolean;
  answer: string;
  is_correct: boolean;
  subject_name: string;
};

export type TOHistoryQuestionNotes = {
  question_id: string;
  notes: {
    id: string;
    asset_url: string;
  }[];
};

export type TOHistoryExplanation = {
  id: string;
  content: string;
  content_image: string;
  question_id: string;
  is_liked: boolean;
};
export type GetAllTOHistoryResponse = ResponseWrapper<{ tryouts: TOHistory[] }>;
export type GetTOHistoryDetailResponse = ResponseWrapper<TOHistoryDetail>;

export type GetTOHistorySetsResponse = ResponseWrapper<TOHistorySets>;
export type GetTOHistoryQuestionsBySetsResponse =
  ResponseWrapper<TOHistorySetQuestions>;

export type GetTOHistoryQuestionDetailResponse =
  ResponseWrapper<TOHistoryQuestionDetail>;

export type GetTOHistoryQuestionNotesResponse =
  ResponseWrapper<TOHistoryQuestionNotes>;
export type GetTOHistoryExplanationResponse =
  ResponseWrapper<TOHistoryExplanation>;

export type AddTOHistoryExplanationFeedbackRespone = ResponseWrapper<{
  id: string;
  userId: string;
  tryoutQuestionId: string;
  timestamp: string;
  isLiked: boolean;
}>;
export type AddTOHistoryQuestionNotesResponse = ResponseWrapper<{
  id: string;
  createdAt: string;
  userId: string;
  tryoutQuestionId: string;
  assetUrl: string;
}>;

export type GetTOHistoryQuestionAnalyticsResponse = ResponseWrapper<{
  tryout_id: string;
  question_id: string;
  answer_distribution: {
    all: {
      key: string;
      users_percentage: string;
    }[];
    chosen_university: {
      key: string;
      users_percentage: string;
    }[];
  };
  total_user_answered: number;
  correct_answer_percentage: number;
  difficulty_level: "MUDAH" | "SULIT" | "NORMAL";
  source: {
    name: string;
    year: number;
  };
  correct_key: string;
}>;

export type GetTOHistoryScoreAnalyticsResponse = ResponseWrapper<{
  tryouts: {
    tryout_id: string;
    name: string;
    score: number;
    expiry_date: string;
  }[];
  attempts: {
    tryout_id: string;
    name: string;
    score: number;
  }[];
  average_score: number;
  max_score: number;
  min_score: number;
  finished_tryouts: number;
  total_tryouts: number;
}>;

export type GetTOHistorySubjectAnalyticsResponse = ResponseWrapper<{
  subject_analytics: {
    [subject_name: string]: {
      id: string;
      name: string;
      set_count: number;
      avg_score: number;
      max_score: number;
      min_score: number;
      topics: {
        id: string;
        name: string;
        correct_answers_count: number;
        questions_count: number;
      }[];
    };
  };
}>;
