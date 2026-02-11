import { cva } from "class-variance-authority";

export const DashboardButtonVariants = cva(
  "flex flex-row items-center gap-3 text-lg",
  {
    variants: {
      variant: {
        active: "text-black",
        inactive: "text-[#D1D5DB]",
      },
    },
    defaultVariants: {
      variant: "active",
    },
  },
);

export const tabsTriggerStyle =
  "min-w-fit inline-flex items-center justify-center text-gray-300 whitespace-nowrap text-xl lg:text-3xl font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-black";

export const DashboardBoxVariant = cva(
  "flex flex-col gap-3 rounded-xl border px-4 py-3",
  {
    variants: {
      variant: {
        primary: "border-[#E2E8F0] bg-[#F8FAFC] ",
        danger: "border-red-200 bg-red-50",
        dangerSecondary: "border-red-200 bg-red-100",
        secondary: "border-blue-200 bg-blue-50",
        warning: "border-yellow-300 bg-yellow-50",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export const PlanCardVariant = cva(
  "flex flex-col gap-5 rounded-2xl p-4 shadow-xl",
  {
    variants: {
      variant: {
        pemula:
          "border-4 border-surface-100 bg-gradient-to-br from-surface-200 to-surface-300 ring-1 ring-surface-300",
        setia: "bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center",
        ambis: "text-gray-700 mix-blend-color-burn",
      },
    },
  },
);
