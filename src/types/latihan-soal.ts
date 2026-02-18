import { ResponseWrapper } from ".";

export type Content = {
  content: string;
  isMedia: boolean;
};

export type LatihanSoalMode = "default" | "klasik" | "berwaktu" | "riwayat";
export type LatihanSoalVariants = {
  mode: LatihanSoalMode;
  hasRiwayat: boolean;
};

export type Subject = {
  id: string;
  name: string;
  alternate_name: string;
  icon: string;
  slug: string;
  illustration: string | null;
};

export type SelectedSubjectType =
  | "PU"
  | "PKPM"
  | "PPU"
  | "PBM"
  | "Bahasa Inggris"
  | "Bahasa Indonesia";

export type Topic = {
  id: string;
  name: string;
  subject_id: string;
};

export type SoalContent = {
  content: string;
  asset_url: string;
};

export type OptionChoice = {
  id: string;
  content: string;
  key: string;
};
export type Option = {
  id: string;
  content: string;
  key: string;
};

export type SoalOption = {
  option_id: string;
  data: OptionChoice[];
};

export type SoalQuestion = {
  id: string;
  content: string;
};

export type QuestionType =
  | "multiple-choice"
  | "multiple-answer"
  | "table-choice"
  | "fill-in";

export type SoalQuestionDetail = {
  id: string;
  topic: string;
  label: string;
  content: Content[];
  options: OptionChoice[];
  last_attempted?: string;
  type: QuestionType;
  subject: string; // subjectId
  subject_name: string;
};
export type SoalQuestionDetailResponse = ResponseWrapper<SoalQuestionDetail>;
export type SubjectResponse = ResponseWrapper<Subject[]>;
export type TopicResponse = ResponseWrapper<Topic[]>;

export type SubjectDetailRequest = { subject_id: string };
export type TopicBySubjectResponse = ResponseWrapper<Topic[]>;
export type GetSubjectBySlugResponse = ResponseWrapper<Subject>;

export type LatihanSoalBySubjectRequest = {
  subject_id: string;
  topic_id?: string;
  min_year?: string;
  max_year?: string;
  question_id?: string;
  limit?: number;
  offset?: number;
};

export type LatihanSoalBySubjectResponse = ResponseWrapper<{
  questions: SoalQuestion[];
}>;

export type GetLatihanSoalAttemptRequest = {
  question_id: string;
};
export type LatihanSoalAttemptRequest = GetLatihanSoalAttemptRequest & {
  choice_id?: string;
  answer_history: string;
  answers: string[];
};
export type LatihanSoalAttempt = {
  id: string;
  question_id: string;
  options_id: string;
  choice_id: string;
  answer_history: string;
  timestamp: string;
  submission_img: string;
  submission_text: string;
  user_id: string;
  submitted?: string;
  filledAnswers: string[];
  type: QuestionType;
};
export type LatihanSoalAttemptResponse = ResponseWrapper<LatihanSoalAttempt>;

export type SubmitNotesLatihanSoalRequest = GetLatihanSoalAttemptRequest & {
  attempt_id: string;
  submission_img: string;
  submission_text: string;
};
export type SubmitNotesLatihanSoalResponse = {};

export type QuestionNavigation = {
  next_question: string | null;
  prev_question: string | null;
  has_next: boolean;
  has_prev: boolean;
};

export type QuestionNavigationResponse = ResponseWrapper<QuestionNavigation>;

export type QuestionNavigationRequest = {
  subject_id: string;
  current_question_id: string;
  topic_id?: string;
};

export type Choice = {
  id: string;
  content: string;
  is_true: boolean;
  key: string;
};

export type Pembahasan = {
  answer: Content[];
  choice: Choice[] | null;
  filled_answer: string[];
};

export type PembahasanQuestion = {
  is_correct: boolean;
  correct_answer: "You are not premium account" | Pembahasan;
  type: QuestionType;
  attempt: {
    filled_answer: string[];
    choice_id: string;
    answer_history: string;
  };
};

export type PembahasanQuestionResponse = ResponseWrapper<PembahasanQuestion>;

export type DownloadPDFRequest = {
  topic_id?: string;
  subject_id: string;
  min_year: number;
  max_year: number;
};

export type DownloadPDFResponse = ResponseWrapper<{
  url: string;
}>;

export type Feedback = {
  feedback: {
    id: string;
    question_id: string;
    user_id: string;
    feedback: string;
    timestamp: string;
    is_like: boolean;
  };
};

export type FeedbackResponse = ResponseWrapper<Feedback>;

export type UploadAssetRequest = {
  attempt_id: string;
  file: File;
};

export type LatihanSoalHistoryRequest = {
  subject_id: string;
  topic_id?: string;
  min_year?: string;
  max_year?: string;
};
export type LatihanSoalHistory = {
  question_attempt_id: string;
  questions: Content[];
  timestamp: string;
  questions_id: string;
  subject_id: string;
};

export type LatihanSoalHistoryResponse = ResponseWrapper<LatihanSoalHistory[]>;

export type LatihanSoalHistoryById = {
  attempts: {
    id: string;
    choice_id: string;
    timestamp: string;
    submitted: string;
    anwser_history: string;
    filled_answers: string[];
  }[];
  question: {
    content: Content[];
    topic_id: string;
    subject_id: string;
    year: number;
    source: string;
    topic_name: string;
    options: {
      id: string;
      content: string;
      is_true: boolean;
      key: string;
    }[];
    id: string;
    type: QuestionType;
    filled_answers: string[];
  };
};

export type LatihanSoalHistoryByIdResponse =
  ResponseWrapper<LatihanSoalHistoryById>;

export type LatihanSoalSekuensialRequest = {
  subject_id: string;
  topic_ids: string[];
  max_number: number;
};

export type LatihanSoalSekuensial = {
  id: string;
  userId: string;
  submitted: boolean | null;
  mode: string;
  created_at: string;
  subjectId: string;
  max_number: number;
  current_number: number;
  questionIds: string[];
};

export type LatihanSoalTimed = {
  id: string;
  submitted: boolean | null;
  mode: string;
  user_id: string;
  created_at: string;
  subject_id: string;
  max_number: number;
  current_number: number;
  current_question_id: string | null;
  time_limit: number;
  slug?: string;
  finished_question: number;
};
export type LatihanSoalTimedResponse = ResponseWrapper<LatihanSoalTimed>;
export type LatihanSoalSekuensialResponse =
  ResponseWrapper<LatihanSoalSekuensial>;

export type LatihanSoalSekuensialDetail = {
  time_limit: number; // in seconds
  timed_question_id: string;
  content: {
    id: string; // ques id
    content: Content[];
    year: number;
    source: string;
    subject: string;
    topic: string;
  };
  options: {
    id: string;
    content: string;
    key: string;
  }[];
  attempt?: {
    id: string;
    choice_id: string;
  };
  current_number: number;
  topic: string;
  subject: string;
};
export type GetLatihanSoalSekuensialResponse =
  ResponseWrapper<LatihanSoalSekuensialDetail>;

export type NextLatihanSoalSekuensialResponse = ResponseWrapper<{
  next_question_id: string;
}>;

export type AnswerLatihanSoalTimedRequest = {
  timed_question_id: string;
  question_id: string;
  choice_id: string;
  answer_history: string;
  answers: string[];
};

export type LatihanSoalClassic = {
  id: string;
  max_number: number;
  user_id: string;
  current_number: number;
  subject_ids: string[];
  current_question: string;
};

export type LatihanSoalClassicResponse = ResponseWrapper<LatihanSoalClassic>;

export type LatihanSoalClassicBySubject = {
  [key: string]: boolean;
};

export type LatihanSoalClassicBySubjectResponse =
  ResponseWrapper<LatihanSoalClassicBySubject>;

export type GetTimedLatihanSoalSummary = {
  accuracy: number;
  avg_time: number;
  point: number;
  correct_answer_count: number;
  total_question: number;
};

export type GetTimedLatihanSoalSummaryResponse =
  ResponseWrapper<GetTimedLatihanSoalSummary>;

type RiwayatLatihanSoalList = {
  id: string;
  accuracy: string;
  avg_time: string;
  point: number;
  correct_answer_count: number;
  total_question: number;
  created_at: string;
  mode: "sequential" | "classic";
  label: string;
};

export type RiwayatLatihanSoalListResponse = ResponseWrapper<
  RiwayatLatihanSoalList[]
>;

type RiwayatTimedLatihanSoalQuestion = {
  question_id: string;
  is_correct: boolean;
};

type RiwayatTimedLatihanSoalQuestions = {
  [x: string]: RiwayatTimedLatihanSoalQuestion[];
};

export type RiwayatTimedLatihanSoal = {
  mode: "classic" | "sequential";
  label: string;
  subject_ids: string[];
  questions: RiwayatTimedLatihanSoalQuestions;
};

export type RiwayatTimedLatihanSoalQuestionsResponse =
  ResponseWrapper<RiwayatTimedLatihanSoal>;

type GetRiwayatLatihanSoalAttempt = {
  id: string;
  question_id: string;
  options_id: string;
  choice_id: string;
  answer_history: string;
  timestamp: string;
  user_id: string;
  submitted: string;
  timed_questions_id: string;
  current_number: number;
  subject?: string;
};

export type GetRiwayatLatihanSoalAttemptResponse =
  ResponseWrapper<GetRiwayatLatihanSoalAttempt>;

type GetAllCurrentAttemptedTimedQuestions = Omit<
  RiwayatTimedLatihanSoal,
  "questions"
> & {
  questions: {
    [x: string]: {
      question_id: string;
      is_attempted: boolean;
    }[];
  };
};

export type GetAllCurrentAttemptedTimedQuestionsResponse =
  ResponseWrapper<GetAllCurrentAttemptedTimedQuestions>;
