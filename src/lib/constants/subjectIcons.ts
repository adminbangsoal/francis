export const SUBJECT_ICON_MAP: Record<string, string> = {
  "Pengetahuan Kuantitatif & Penalaran Matematika": "/icons/MathOperations.svg",
  "Penalaran Umum": "/icons/Brain.svg",
  "Pemahaman Bacaan dan Menulis": "/icons/BookOpenText.svg",
  "Pengetahuan dan Pemahaman Umum": "/icons/LightbulbFilament.svg",
  "Bahasa Inggris": "/icons/England.svg",
  "Bahasa Indonesia": "/icons/Indonesia.svg",
};

export const SLUG_ICON_MAP: Record<string, string> = {
  pkpm: "/icons/MathOperations.svg",
  pu: "/icons/Brain.svg",
  pbm: "/icons/BookOpenText.svg",
  ppu: "/icons/LightbulbFilament.svg",
  "bahasa-inggris": "/icons/England.svg",
  "bahasa-indonesia": "/icons/Indonesia.svg",
};

const DEFAULT_FALLBACK_ICON = "/icons/BookOpenText.svg";

export const getSubjectIcon = (
  subjectName?: string | null,
  subjectSlug?: string | null,
): string => {
  if (subjectName && SUBJECT_ICON_MAP[subjectName]) {
    return SUBJECT_ICON_MAP[subjectName];
  }

  if (subjectSlug && SLUG_ICON_MAP[subjectSlug]) {
    return SLUG_ICON_MAP[subjectSlug];
  }

  return DEFAULT_FALLBACK_ICON;
};
