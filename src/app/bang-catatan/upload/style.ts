import { BangCatatanVariant } from "@/types/catatan";
import { cva } from "class-variance-authority";

type VariantMap = {
  [key in BangCatatanVariant]: string;
};
const variantStyles: VariantMap = {
  gray: "text-gray-700",
  red: "text-red-700",
  orange: "text-orange-700",
  amber: "text-amber-700",
  yellow: "text-yellow-700",
  lime: "text-lime-700",
  green: "text-green-700",
  emerald: "text-emerald-700",
  cyan: "text-cyan-700",
  teal: "text-teal-700",
  sky: "text-sky-700",
  blue: "text-blue-700",
  indigo: "text-indigo-700",
  purple: "text-purple-700",
  violet: "text-violet-700",
  rose: "text-rose-700",
  pink: "text-pink-700",
  fuchsia: "text-fuchsia-700",
};
const activeStyles: VariantMap = {
  gray: "bg-gray-50 border border-gray-300",
  red: "bg-red-50 border border-red-300",
  orange: "bg-orange-50 border border-orange-300",
  amber: "bg-amber-50 border border-amber-300",
  yellow: "bg-yellow-50 border border-yellow-300",
  lime: "bg-lime-50 border border-lime-300",
  green: "bg-green-50 border border-green-300",
  emerald: "bg-emerald-50 border border-emerald-300",
  cyan: "bg-cyan-50 border border-cyan-300",
  teal: "bg-teal-50 border border-tela-300",
  sky: "bg-sky-50 border border-sky-300",
  blue: "bg-blue-50 border border-blue-300",
  indigo: "bg-indigo-50 border border-indigo-300",
  purple: "bg-purple-50 border border-purple-300",
  violet: "bg-violet-50 border border-violet-300",
  rose: "bg-rose-50 border border-rose-300",
  pink: "bg-pink-50 border border-pink-300",
  fuchsia: "bg-fuchsia-50 border border-fuchsia-300",
};
const paletteStyles: VariantMap = {
  gray: "bg-gray-500 border border-gray-300",
  red: "bg-red-500 border border-red-300",
  orange: "bg-orange-500 border border-orange-300",
  amber: "bg-amber-500 border border-amber-300",
  yellow: "bg-yellow-500 border border-yellow-300",
  lime: "bg-lime-500 border border-lime-300",
  green: "bg-green-500 border border-green-300",
  emerald: "bg-emerald-500 border border-emerald-300",
  cyan: "bg-cyan-500 border border-cyan-300",
  teal: "bg-teal-500 border border-tela-300",
  sky: "bg-sky-500 border border-sky-300",
  blue: "bg-blue-500 border border-blue-300",
  indigo: "bg-indigo-500 border border-indigo-300",
  purple: "bg-purple-500 border border-purple-300",
  violet: "bg-violet-500 border border-violet-300",
  rose: "bg-rose-500 border border-rose-300",
  pink: "bg-pink-500 border border-pink-300",
  fuchsia: "bg-fuchsia-500 border border-fuchsia-300",
};

export const BangCatatanThemeStyle = cva("", {
  variants: {
    variant: variantStyles,
    active: activeStyles,
    palette: paletteStyles,
  },
});
