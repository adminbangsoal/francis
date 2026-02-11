export type UploadFileRequest = {
  file: File;
};
export type UploadFileResponse = {
  key: string;
  url: string;
};

export type QueryParams = {
  [key: string]: string | number | undefined | null;
};
export type Props = {
  searchParams: QueryParams;
};

export * from "./auth";
export * from "./latihan-soal";
export * from "./leaderboard";
export * from "./ptn";
export * from "./users";
