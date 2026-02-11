import {
  OnboardPassword,
  PasswordSignInRequest,
  ProfileResponse,
  SendMailOtpRequest,
  SendOTPRequest,
  SigninEmailRequest,
  SigninRequest,
  SigninResponse,
  SignupResponse,
  VerifyMailOtpRequest,
} from "@/types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<SigninResponse, SigninRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<SignupResponse, SigninRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    sendOTP: builder.mutation<void, SendOTPRequest>({
      query: (body) => ({
        url: "/auth/send-otp",
        method: "POST",
        body,
      }),
    }),
    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    passwordLogin: builder.mutation<SigninResponse, PasswordSignInRequest>({
      query: (body) => ({
        url: "/auth/password-login",
        method: "POST",
        body,
      }),
    }),
    onboardPassword: builder.mutation<ProfileResponse, OnboardPassword>({
      query: (body) => ({
        url: "/auth/onboard-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["DashboardProfile"],
    }),
    forgotPassword: builder.mutation<SigninResponse, SigninRequest>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    sendOtpResetPassword: builder.mutation<void, SendOTPRequest>({
      query: (body) => ({
        url: "/auth/otp-reset",
        method: "POST",
        body,
      }),
    }),
    sendMailOtp: builder.mutation<void, SendMailOtpRequest>({
      query: (body) => ({
        url: "/auth/mail-verification",
        method: "POST",
        body,
      }),
    }),
    verifyMailOtp: builder.mutation<SigninResponse, VerifyMailOtpRequest>({
      query: (body) => ({
        url: "/auth/verify-mail",
        method: "POST",
        body,
      }),
    }),
    loginEmail: builder.mutation<SigninResponse, SigninEmailRequest>({
      query: (body) => ({
        url: "/auth/login-email",
        method: "POST",
        body,
      }),
    }),
    forgotPasswordEmail: builder.mutation<SigninResponse, SendMailOtpRequest>({
      query: (body) => ({
        url: "/auth/forgot-password-email",
        method: "POST",
        body,
      }),
    }),
    verifyForgotPasswordOtp: builder.mutation<
      SigninResponse,
      VerifyMailOtpRequest
    >({
      query: (body) => ({
        url: "/auth/otp-reset-email",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSendOTPMutation,
  useGetProfileQuery,
  usePasswordLoginMutation,
  useOnboardPasswordMutation,
  useForgotPasswordMutation,
  useSendOtpResetPasswordMutation,
  useSendMailOtpMutation,
  useVerifyMailOtpMutation,
  useLoginEmailMutation,
  useForgotPasswordEmailMutation,
  useVerifyForgotPasswordOtpMutation,
} = authApi;
