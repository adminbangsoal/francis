import { VariantProps, cva } from "class-variance-authority";

export const TagVariants = cva("flex flex-row items-center gap-2", {
  variants: {
    color: {
      purple: "border-purple-300 bg-purple-200 text-purple-600",
      orange: "border-orange-300 bg-orange-200 text-orange-600",
      pink: "border-pink-300 bg-pink-200 text-pink-600",
      teal: "border-teal-300 bg-teal-200 text-teal-700",
      cyan: "border-cyan-300 bg-cyan-200 text-cyan-600",
      yellow: "border-yellow-300 bg-yellow-200 text-yellow-700",
      gray: "border- bg-gray-100 text-gray-500",
      "dark-gray": "border-gray-300 bg-gray-200 text-gray-600",
      emerald: "bg-[url('/bg-mesh-horizontal.webp')] text-white",
    },
    size: {
      small: "border px-3 py-0.5",
      default: "px-4 py-1 shadow-inner",
      large: "flex flex-row items-center justify-center py-4",
    },
    rounded: {
      full: "rounded-full",
      large: "rounded-lg shadow-inner",
    },
  },
  defaultVariants: {
    color: "dark-gray",
    size: "default",
    rounded: "full",
  },
});

export const ProgressBarVariants = cva(
  "rounded-full border-[1px] shadow-inner-lg",
  {
    variants: {
      type: {
        active: "border-emerald-500 bg-emerald-400",
        inactive: "border-gray-500 bg-gray-400",
      },
    },
    defaultVariants: {
      type: "active",
    },
  },
);
export type TagCVAProps = VariantProps<typeof TagVariants>;
export type ProgressBarCVAProps = VariantProps<typeof ProgressBarVariants>;
