import { VariantProps, cva } from "class-variance-authority";

export const SoalTrackerVariants = cva(
  "flex h-10 w-full shrink-0 flex-row items-center justify-center gap-2 rounded text-base text-lg",
  {
    variants: {
      type: {
        active: "border border-white",
        inactive: "",
        to: "inner-shadow-lg",
      },
      subType: {
        primary: "bg-emerald-300 opacity-80",
        secondary: "bg-neutral-400 opacity-80",
        none: "bg-white",
        disabled: "cursor-not-allowed bg-gray-200 opacity-80",
        toActive: "border-2 border-emerald-700 bg-emerald-500",
        toAnswered: "bg-emerald-500",
      },
    },
    defaultVariants: {
      type: "active",
      subType: "primary",
    },
  },
);

export type SoalTrackerCVAProps = VariantProps<typeof SoalTrackerVariants>;
