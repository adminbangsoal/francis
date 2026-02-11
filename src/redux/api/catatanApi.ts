import { ResponseWrapper, UploadFileRequest } from "@/types";
import {
  Catatan,
  CatatanDetailResponse,
  CatatanLikeCountResponse,
  CatatanListResponse,
  CatatanReportResponse,
  CatatanTimelineRequest,
  ReportCatatanRequest,
  ToggleLikeResponse,
  UploadCatatanRequest,
} from "@/types/catatan";
import { baseApi } from "./baseApi";

export const catatanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCatatanTimeline: builder.query<
      CatatanListResponse,
      CatatanTimelineRequest
    >({
      query: (query) => ({
        url: "/catatan",
        method: "GET",
        params: { ...query },
      }),
      providesTags: ["Catatan"],
    }),
    getCatatanById: builder.query<CatatanDetailResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/catatan/${id}`,
        method: "GET",
      }),
      providesTags: (result) => [{ type: "Catatan", id: result?.data.id }],
    }),
    getCatatanLikeCount: builder.query<
      CatatanLikeCountResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/catatan/${id}/like-count`,
        method: "GET",
      }),
      providesTags: (result) => [
        { type: "Catatan", id: result?.data.catatan_id },
      ],
    }),
    downloadCatatan: builder.mutation<
      ResponseWrapper<{ url: string }>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/catatan/${id}/download`,
        method: "GET",
      }),
      invalidatesTags: (result) => ["Catatan"],
    }),
    likeCatatan: builder.mutation<ToggleLikeResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/catatan/${id}/like`,
        method: "PUT",
      }),
      invalidatesTags: (result) => [
        { type: "Catatan", id: result?.data.catatan_id },
        "Catatan",
      ],
    }),
    dislikeCatatan: builder.mutation<ToggleLikeResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/catatan/${id}/like`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => [
        { type: "Catatan", id: result?.data.catatan_id },
        "Catatan",
      ],
    }),
    deleteCatatan: builder.mutation<
      ResponseWrapper<{ message: string }>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/catatan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Catatan"],
    }),
    reportCatatan: builder.mutation<
      CatatanReportResponse,
      ReportCatatanRequest
    >({
      query: ({ id, reason }) => ({
        url: `/catatan/${id}/report`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: (result) => [
        { type: "Catatan", id: result?.data.catatan_id },
      ],
    }),
    uploadCatatanMedia: builder.mutation<
      ResponseWrapper<{ url: string; key: string }>,
      UploadFileRequest
    >({
      query: ({ file }) => {
        const bodyFormData = new FormData();
        bodyFormData.append("file", file);
        return {
          method: "POST",
          url: "/catatan/media",
          body: bodyFormData,
          formData: true,
        };
      },
    }),
    uploadCatatan: builder.mutation<
      ResponseWrapper<Catatan>,
      UploadCatatanRequest
    >({
      query: (body) => {
        return {
          method: "POST",
          url: "/catatan",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetCatatanTimelineQuery,
  useDeleteCatatanMutation,
  useGetCatatanByIdQuery,
  useGetCatatanLikeCountQuery,
  useUploadCatatanMutation,
  useUploadCatatanMediaMutation,
  useLikeCatatanMutation,
  useDislikeCatatanMutation,
  useDownloadCatatanMutation,
} = catatanApi;
