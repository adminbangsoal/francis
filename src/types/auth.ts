export type ResponseWrapper<T> = {
  data: T;
};
export type SigninResponse = ResponseWrapper<{
  token: string;
  user: {
    email: string;
    full_name: string;
    highschool: string;
    highschool_year: string;
    choosen_university_one: string;
    choosen_major_one: string;
    choosen_university_two?: string;
    choosen_major_two?: string;
    choosen_university_three?: string;
    choosen_major_three?: string;
    phone_number: string;
    onboard_date: string;
    profile_picture: string;
  };
}>;
export type SignupResponse = SigninResponse;

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type GoogleSignInRequest = {
  idToken: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  token: string;
  password: string;
};

// Legacy types - kept for backward compatibility during migration
export type SigninRequest = {
  email: string;
  password: string;
};

export type SigninEmailRequest = {
  email: string;
  password: string;
};
