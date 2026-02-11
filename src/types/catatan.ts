import { ResponseWrapper } from "./auth";

export type CatatanOld = {
  id: string;
  size: string;
  title: string;
  author: string;
  avatar: string;
  thumbnail: string;
  description: string;
  tags: {
    kelas: string;
    mapel: string;
    tipe: string | null;
  };
  likes: number;
  downloads: number;
  theme: string;
};
export enum NoteType {
  catatan = "catatan",
  pembahasan = "pembahasan",
  slide = "slide",
  presentasi = "presentasi",
  cheatsheet = "cheatsheet",
  coretan = "coretan",
  tugas = "tugas",
  ujian = "ujian",
  lainnya = "lainnya",
}

export enum BangCatatanTheme {
  gray = "gray",
  red = "red",
  orange = "orange",
  amber = "amber",
  yellow = "yellow",
  lime = "lime",
  green = "green",
  emerald = "emerald",
  cyan = "cyan",
  teal = "teal",
  sky = "sky",
  blue = "blue",
  indigo = "indigo",
  purple = "purple",
  violet = "violet",
  rose = "rose",
  pink = "pink",
  fuchsia = "fuchsia",
}
export type BangCatatanVariant = keyof typeof BangCatatanTheme;
export type NoteTypeVariant = keyof typeof NoteType;

export type Catatan = {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  color_pallete: BangCatatanTheme;
  subject_id: string;
  topic_id: string;
  note_type: NoteType;
  like_count: number;
  download_count: number;
  author: string;
  author_picture: string;
  topic: string;
  subject: string;
  is_liked?: boolean;
};

export interface PageMetaDto {
  page: number;
  limit: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  itemCount: number;
}
export interface PageDto<T> {
  data: T[];
  meta: PageMetaDto;
}

export type CatatanTimeline = PageDto<Catatan>;

export type CatatanTimelineRequest = {
  limit?: number;
  page?: number;
  query?: string | null;
  topic_id?: string | null;
  subject_id?: string | null;
  note_type?: NoteType | null;
  is_liked?: boolean;
};

export type UploadCatatanRequest = {
  asset_url: string;
  title: string;
  description: string;
  thumbnail_url: string;
  color_pallete: string;
  subject_id: string;
  topic_id: string;
  note_type: string;
};

export type ReportCatatanRequest = {
  id: string;
  reason: string;
};

type CatatanMessageResponse = {
  message: string;
  catatan_id: string;
};

export type ToggleLikeResponse = ResponseWrapper<
  CatatanMessageResponse & {
    like_count: number;
  }
>;

export type CatatanReportResponse = ResponseWrapper<
  CatatanMessageResponse & {
    reason: string;
    catatan_report_id: string;
  }
>;
export type CatatanLikeCountResponse = ResponseWrapper<{
  catatan_id: string;
  like_count: number;
  is_liked?: boolean;
}>;

export type CatatanDetailResponse = ResponseWrapper<Catatan>;
export type CatatanListResponse = CatatanTimeline;

export interface CatatanParamsI {
  topic_id?: string | null;
  subject_id?: string | null;
  note_type?: string | null;
  query?: string | null;
  limit?: string | null;
  page?: string | null;
  id?: string | null;
}
