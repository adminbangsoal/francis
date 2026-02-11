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
    phone_number: string;
    onboard_date: string;
    profile_img: string;
  };
}>;
export type SignupResponse = ResponseWrapper<string>;

export type SigninRequest = {
  phone_number: string;
  otp: string;
};

export type SigninEmailRequest = {
  email: string;
  password: string;
};

export type SendOTPRequest = {
  phone_number: string;
};

export type PasswordSignInRequest = {
  phone_number: string;
  password: string;
};

export type OnboardPassword = {
  password: string;
  phone_number: string;
};

export type SendMailOtpRequest = {
  email: string;
};

export interface VerifyMailOtpRequest extends SendMailOtpRequest {
  otp: string;
}
