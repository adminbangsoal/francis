import {
  ResponseWrapper,
  UploadFileRequest,
  UploadFileResponse,
} from "@/types";
import {
  DashboardProfileResponse,
  DashboardResponse,
  HeaderDashboardResponse,
} from "@/types/dashboard";
import { baseApi } from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHeadersDashboard: builder.query<HeaderDashboardResponse, void>({
      query: () => ({
        url: "/dashboard/headers",
        method: "GET",
      }),
    }),
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => ({
        url: "/dashboard",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    getProfileDashboard: builder.query<DashboardProfileResponse, void>({
      query: () => ({
        url: "/dashboard/profile",
        method: "GET",
      }),
      providesTags: ["DashboardProfile"],
    }),
    uploadProfilePicture: builder.mutation<
      ResponseWrapper<UploadFileResponse>,
      UploadFileRequest
    >({
      query: ({ file }) => {
        const bodyFormData = new FormData();
        bodyFormData.append("file", file);
        return {
          method: "POST",
          url: "/dashboard/profile-picture",
          body: bodyFormData,
          formData: true,
        };
      },
      invalidatesTags: ["DashboardProfile"],
    }),
  }),
});

export const {
  useGetHeadersDashboardQuery,
  useGetDashboardQuery,
  useGetProfileDashboardQuery,
  useUploadProfilePictureMutation,
} = dashboardApi;
