export const AUTH_PATHS = ["/signup", "/login", "/onboarding"];
export const LATIHAN_HISTORY_PATH = ["/latihan/riwayat"];
export const LATSOL_PATH = /^\/latihan-soal\/.+/;
export const LATSOL_NEW_PATH = /^\/latihan-soal-timed\/.+/;
export const TRY_OUT_PATH = /^\/try-out\/.+/;
export const CATATAN_PATH = /^\/bang-catatan\/.+/;
export const CATATAN_BASE_PATH = "/bang-catatan";
export const DASHBOARD_PATH = ["/dashboard"];
export const AVAILABLE_PATHS = [
  ...AUTH_PATHS,
  "/",
  "/langganan",
  "/dashboard",
  "/latihan/riwayat",
  LATSOL_PATH,
  "/latihan-soal-timed",
  LATSOL_NEW_PATH,
  "/leaderboard",
  "/try-out",
  TRY_OUT_PATH,
  CATATAN_BASE_PATH,
  CATATAN_PATH,
];
