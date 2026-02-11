import { cva } from "class-variance-authority";

export const InputVariants = cva(
  "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-300 dark:focus-visible:ring-gray-300",
  {
    variants: {
      variant: {
        active: "border-none font-600 ",
      },
      color: {
        white: "bg-surface-200 text-gray-900 placeholder:text-gray-400",
        emerald: "bg-emerald-400 text-white placeholder:text-emerald-100",
      },
    },
    defaultVariants: {
      variant: "active",
      color: "white",
    },
  },
);

export const SelectVariants = cva("", {
  variants: {
    variant: {
      selected: "",
    },
  },
  defaultVariants: {
    variant: "selected",
  },
});

export const ModalVariants = cva("flex flex-col gap-3 rounded-3xl px-4 py-5", {
  variants: {
    variant: {
      primary: "",
    },
  },
});
