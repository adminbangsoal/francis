import { dummyCatatanTimeline } from "@/app/bang-catatan/dummy";
import { capitalizeFirstLetter } from "@/lib/utils";
import { BangCatatanTheme, NoteType } from "@/types/catatan";

export const filter = {
  kelas: ["IX", "X", "XI", "XII"],
  mapel: [
    "Matematika",
    "Bahasa Indonesia",
    "Bahasa Inggris",
    "PKN",
    "Seni Budaya",
    "TIK",
    "Agama",
    "Bahasa Jawa",
    "Bahasa Sunda",
    "Fisika",
    "Kimia",
    "Biologi",
    "Ekonomi",
    "Geografi",
    "Sosiologi",
    "Sejarah",
  ],
  tipe: Object.keys(NoteType).map((type) => capitalizeFirstLetter(type)),
};
export type ColorMappingType = {
  [key in BangCatatanTheme]: {
    viewport: string;
    pills: string;
    title: string;
    button: string;
    author: string;
    statIcon: string;
    statNumber: string;
  };
};

export const colorMapping: ColorMappingType = {
  gray: {
    viewport: "bg-gray-100 border-gray-200 text-gray-500",
    pills: "bg-gray-200",
    title: "text-gray-900",
    button: "data-[state=on]:bg-gray-500",
    author: "text-gray-700",
    statIcon: "text-gray-400",
    statNumber: "text-gray-700",
  },
  red: {
    viewport: "bg-red-100 border-red-200 text-red-500",
    pills: "bg-red-200",
    title: "text-red-900",
    button: "data-[state=on]:bg-red-500",
    author: "text-red-700",
    statIcon: "text-red-400",
    statNumber: "text-red-700",
  },
  orange: {
    viewport: "bg-orange-100 border-orange-200 text-orange-500",
    pills: "bg-orange-200",
    title: "text-orange-900",
    button: "data-[state=on]:bg-orange-500",
    author: "text-orange-700",
    statIcon: "text-orange-400",
    statNumber: "text-orange-700",
  },
  amber: {
    viewport: "bg-amber-100 border-amber-200 text-amber-500",
    pills: "bg-amber-200",
    title: "text-amber-900",
    button: "data-[state=on]:bg-amber-500",
    author: "text-amber-700",
    statIcon: "text-amber-400",
    statNumber: "text-amber-700",
  },
  yellow: {
    viewport: "bg-yellow-100 border-yellow-200 text-yellow-500",
    pills: "bg-yellow-200",
    title: "text-yellow-900",
    button: "data-[state=on]:bg-yellow-500",
    author: "text-yellow-700",
    statIcon: "text-yellow-400",
    statNumber: "text-yellow-700",
  },
  lime: {
    viewport: "bg-lime-100 border-lime-200 text-lime-500",
    pills: "bg-lime-200",
    title: "text-lime-900",
    button: "data-[state=on]:bg-lime-500",
    author: "text-lime-700",
    statIcon: "text-lime-400",
    statNumber: "text-lime-700",
  },
  green: {
    viewport: "bg-green-100 border-green-200 text-green-500",
    pills: "bg-green-200",
    title: "text-green-900",
    button: "data-[state=on]:bg-green-500",
    author: "text-green-700",
    statIcon: "text-green-400",
    statNumber: "text-green-700",
  },
  emerald: {
    viewport: "bg-emerald-100 border-emerald-200 text-emerald-500",
    pills: "bg-emerald-200",
    title: "text-emerald-900",
    button: "data-[state=on]:bg-emerald-500",
    author: "text-emerald-700",
    statIcon: "text-emerald-400",
    statNumber: "text-emerald-700",
  },
  teal: {
    viewport: "bg-teal-100 border-teal-200 text-teal-500",
    pills: "bg-teal-200",
    title: "text-teal-900",
    button: "data-[state=on]:bg-teal-500",
    author: "text-teal-700",
    statIcon: "text-teal-400",
    statNumber: "text-teal-700",
  },
  cyan: {
    viewport: "bg-cyan-100 border-cyan-200 text-cyan-500",
    pills: "bg-cyan-200",
    title: "text-cyan-900",
    button: "data-[state=on]:bg-cyan-500",
    author: "text-cyan-700",
    statIcon: "text-cyan-400",
    statNumber: "text-cyan-700",
  },
  sky: {
    viewport: "bg-sky-100 border-sky-200 text-sky-500",
    pills: "bg-sky-200",
    title: "text-sky-900",
    button: "data-[state=on]:bg-sky-500",
    author: "text-sky-700",
    statIcon: "text-sky-400",
    statNumber: "text-sky-700",
  },
  blue: {
    viewport: "bg-blue-100 border-blue-200 text-blue-500",
    pills: "bg-blue-200",
    title: "text-blue-900",
    button: "data-[state=on]:bg-blue-500",
    author: "text-blue-700",
    statIcon: "text-blue-400",
    statNumber: "text-blue-700",
  },
  indigo: {
    viewport: "bg-indigo-100 border-indigo-200 text-indigo-500",
    pills: "bg-indigo-200",
    title: "text-indigo-900",
    button: "data-[state=on]:bg-indigo-500",
    author: "text-indigo-700",
    statIcon: "text-indigo-400",
    statNumber: "text-indigo-700",
  },
  violet: {
    viewport: "bg-violet-100 border-violet-200 text-violet-500",
    pills: "bg-violet-200",
    title: "text-violet-900",
    button: "data-[state=on]:bg-violet-500",
    author: "text-violet-700",
    statIcon: "text-violet-400",
    statNumber: "text-violet-700",
  },
  purple: {
    viewport: "bg-purple-100 border-purple-200 text-purple-500",
    pills: "bg-purple-200",
    title: "text-purple-900",
    button: "data-[state=on]:bg-purple-500",
    author: "text-purple-700",
    statIcon: "text-purple-400",
    statNumber: "text-purple-700",
  },
  fuchsia: {
    viewport: "bg-fuchsia-100 border-fuchsia-200 text-fuchsia-500",
    pills: "bg-fuchsia-200",
    title: "text-fuchsia-900",
    button: "data-[state=on]:bg-fuchsia-500",
    author: "text-fuchsia-700",
    statIcon: "text-fuchsia-400",
    statNumber: "text-fuchsia-700",
  },
  pink: {
    viewport: "bg-pink-100 border-pink-200 text-pink-500",
    pills: "bg-pink-200",
    title: "text-pink-900",
    button: "data-[state=on]:bg-pink-500",
    author: "text-pink-700",
    statIcon: "text-pink-400",
    statNumber: "text-pink-700",
  },
  rose: {
    viewport: "bg-rose-100 border-rose-200 text-rose-500",
    pills: "bg-rose-200",
    title: "text-rose-900",
    button: "data-[state=on]:bg-rose-500",
    author: "text-rose-700",
    statIcon: "text-rose-400",
    statNumber: "text-rose-700",
  },
};

export const catatan = dummyCatatanTimeline;
