export type NavItems = {
  title: string;
  icon: string;
  href: string;
};
export const topics: NavItems[] = [
  {
    title: "Penalaran Umum",
    icon: "/icons/Brain.svg",
    href: "/latihan-soal/pu",
  },
  {
    title: "Pengetahuan dan Pemahaman Umum",
    icon: "/icons/LightbulbFilament.svg",
    href: "/latihan-soal/ppu",
  },
  {
    title: "Pemahaman Bacaan dan Menulis",
    icon: "/icons/BookOpenText.svg",
    href: "/latihan-soal/pbm",
  },
  {
    title: "Pengetahuan Kuantitatif",
    icon: "/icons/MathOperations.svg",
    href: "/latihan-soal/pkpm",
  },
  {
    title: "Bahasa Indonesia",
    icon: "/icons/Indonesia.svg",
    href: "/latihan-soal/bahasa-indonesia",
  },
  {
    title: "Bahasa Inggris",
    icon: "/icons/England.svg",
    href: "/latihan-soal/bahasa-inggris",
  },
];
export const LATSOL_MODES: NavItems[] = [
  {
    title: "Normal",
    icon: "/icons/England.svg",
    href: "",
  },
  {
    title: "Berwaktu",
    icon: "/icons/England.svg",
    href: "",
  },
];
