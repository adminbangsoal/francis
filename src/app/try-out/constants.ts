export const PRO_SUBJECTS = [
  "Kemampuan Penalaran Umum",
  "Penalaran Induktif",
  "Penalaran Deduktif",
  "Penalaran Kuantitatif",
  "Pengetahuan dan Pemahaman Umum",
  "Pemahaman Bacaan dan Menulis",
  "Pengetahuan Kuantitatif",
  "Literasi dalam Bahasa Indonesia dan Bahasa Inggris",
  "Literasi dalam Bahasa Indonesia",
  "Literasi dalam Bahasa Inggris",
  "Penalaran Matematika",
];

export const SUBJECT_LIST = [
  {
    subject: "Kemampuan Penalaran Umum",
    topics: [
      "Penalaran Induktif",
      "Penalaran Deduktif",
      "Penalaran Kuantitatif",
    ],
  },
  {
    subject: "Pemahaman Bacaan dan Menulis",
  },
  {
    subject: "Pengetahuan Kuantitatif",
  },
  {
    subject: "Literasi dalam Bahasa Indonesia dan Bahasa Inggris",
    topics: [
      "Literasi dalam Bahasa Indonesia",
      "Literasi dalam Bahasa Inggris",
    ],
  },
  {
    subject: "Penalaran Matematika",
  },
];

export const TOSubjectMap: Record<string, string> = {
  pu: "Kemampuan Penalaran Umum",
  "penalaran-induktif": "Penalaran Induktif",
  "penalaran-deduktif": "Penalaran Deduktif",
  "penalaran-kuantitatif": "Penalaran Kuantitatif",
  ppu: "Pengetahuan dan Pemahaman Umum",
  pkpm: "Pengetahuan Kuantitatif & Penalaran Matematika",
  pbm: "Pemahaman Bacaan dan Menulis",
  "pengetahuan-kuantitatif": "Pengetahuan Kuantitatif",
  "bahasa-inggris": "Bahasa Inggris",
  "bahasa-indonesia": "Bahasa Indonesia",
  matematika: "Penalaran Matematika",
};

export const TOSubjectSlugMap: Record<string, string> = {
  "Kemampuan Penalaran Umum": "pu",
  "Penalaran Induktif": "penalaran-induktif",
  "Penalaran Deduktif": "penalaran-deduktif",
  "Penalaran Kuantitatif": "penalaran-kuantitatif",
  "Pengetahuan dan Pemahaman Umum": "ppu",
  "Pengetahuan Kuantitatif & Penalaran Matematika": "pkpm",
  "Pemahaman Bacaan dan Menulis": "pbm",
  "Pengetahuan Kuantitatif": "pengetahuan-kuantitatif",
  "Bahasa Inggris": "bahasa-inggris",
  "Bahasa Indonesia": "bahasa-indonesia",
  "Penalaran Matematika": "matematika",
};
