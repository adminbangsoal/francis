import {
  ProfileResponse,
  ResponseWrapper,
  TryoutRegistrationRequest,
  UploadFileRequest,
  UploadFileResponse,
  UserOnboardRequest,
  UserUpdateRequest,
} from "@/types";
import { baseApi } from "./baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    onboarding: builder.mutation<ProfileResponse, UserOnboardRequest>({
      query: (body) => ({
        url: "/users/onboarding",
        method: "POST",
        body,
      }),
    }),
    updateUser: builder.mutation<ProfileResponse, UserUpdateRequest>({
      query: (body) => ({
        url: "/users/profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["DashboardProfile"],
    }),
    registerTryout: builder.mutation<void, TryoutRegistrationRequest>({
      query: ({ tryoutId, ...props }) => {
        return {
          url: `/users/registration/tryout/${tryoutId}`,
          method: "POST",
          body: {
            first_task_submission: props.first_task_submission,
            second_task_submission: props.second_task_submission,
            third_task_submission: props.third_task_submission,
          },
        };
      },
      invalidatesTags: (_, __, { tryoutId }) => [
        { type: "TryoutRegistration", id: tryoutId },
      ],
    }),
    tryoutRegistrationSubmission: builder.mutation<
      ResponseWrapper<UploadFileResponse>,
      UploadFileRequest
    >({
      query: ({ file }) => {
        const bodyFormData = new FormData();
        bodyFormData.append("file", file);
        return {
          method: "POST",
          url: "/users/registration/tryout/submissions",
          body: bodyFormData,
          formData: true,
        };
      },
    }),
    getTryoutRegistration: builder.query<
      ResponseWrapper<{
        created_at: string;
        validated: boolean;
        is_eligable?: boolean;
      }>,
      { tryoutId: string }
    >({
      query: ({ tryoutId }) => {
        return {
          url: `/users/registration/tryout/${tryoutId}`,
          method: "GET",
        };
      },
      providesTags: (_, __, { tryoutId }) => [
        { type: "TryoutRegistration", id: tryoutId },
      ],
    }),
  }),
});

export const {
  useOnboardingMutation,
  useUpdateUserMutation,
  useRegisterTryoutMutation,
  useTryoutRegistrationSubmissionMutation,
  useGetTryoutRegistrationQuery,
} = usersApi;
