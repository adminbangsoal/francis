import { cva } from "class-variance-authority";

export const OptionBoxVariants = cva(
  "group flex cursor-pointer flex-row items-center gap-3 rounded-lg p-1 hover:bg-gray-800 hover:text-white",
  {
    variants: {
      variant: {
        inactive:
          "bg-gray-100 disabled:cursor-default disabled:bg-gray-100 disabled:text-black",
        active: "bg-gray-800 text-white",
      },
    },
    defaultVariants: {
      variant: "inactive",
    },
  },
);

export const wrongChoice =
  "bg-rose-100 hover:bg-rose-100 text-rose-700 hover:text-rose-700 hover:cursor-default";
export const correctChoice =
  "bg-emerald-100 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-700 hover:cursor-default";
