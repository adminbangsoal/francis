import { ResponseWrapper } from ".";

export type HeaderDashboardResponse = ResponseWrapper<{
  streak: number;
  finished: {
    done: number;
    total: number;
    percentage: number;
  };
  accuracy: {
    percentage: number;
    correct_answers: number;
    total_attempted_question: number;
  };
}>;

export type DashboardResponse = ResponseWrapper<
  {
    subject: string;
    topics: {
      topic: string;
      correct: number;
      total_question: number;
    }[];
    icon: string;
    total_correct_answer: number;
    slug: string;
  }[]
>;

export type DashboardProfileResponse = ResponseWrapper<{
  name: string;
  profile_picture: string | null;
  referal_code: string;
  point: number;
  highschool: string;
  subscription: {
    id: string;
    subscription_type: "Setia" | "Ambis" | "Pemula";
    referal_code: string | null;
    timestamp: string;
    user_id: string;
  } | null;
  validity: {
    timestamp: string;
    label: string;
  };
  password: boolean;
  phone_number: string;
}>;
