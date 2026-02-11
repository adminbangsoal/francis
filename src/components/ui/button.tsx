import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { CircularProgress } from "./circular-progress";

const buttonVariants = cva(
  "relative inline-flex flex-none shrink-0 items-center justify-center gap-1 whitespace-nowrap font-medium ring-offset-white transition after:absolute after:inset-0 after:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300",
  {
    variants: {
      variant: {
        default:
          "rounded-md bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90",
        destructive:
          "rounded-md bg-red-500 text-gray-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/90",
        outline:
          "rounded-md border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50",
        secondary:
          "rounded-md bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80",
        ghost:
          "rounded-md hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50",
        link: "text-gray-900 underline-offset-4 hover:underline dark:text-gray-50",
        emerald:
          "bg-emerald-400 text-surface-100 hover:bg-emerald-300/70 hover:text-gray-500",
        bsPrimary:
          "rounded-full border border-emerald-500 bg-emerald-400 text-white shadow after:rounded-full after:shadow-highlight after:shadow-white/25 hover:scale-105 hover:border-emerald-600 hover:bg-emerald-500 hover:text-white active:scale-95",
        bsSecondary:
          "rounded-full bg-white/20 text-gray-800 shadow after:rounded-full after:shadow-highlight after:shadow-white/25 hover:scale-105 hover:bg-white/40 active:scale-95",
        bsWhite:
          "rounded-full bg-white text-black shadow after:rounded-full after:shadow-highlight after:shadow-white/25 hover:scale-105 active:scale-95",
        bsGrayLight:
          "after:shadow-gray/25 rounded-full bg-gray-400 text-white shadow after:rounded-full after:shadow-highlight hover:scale-105 active:scale-95",
        danger:
          "rounded-full bg-red-600 text-white shadow after:rounded-full after:shadow-highlight after:shadow-white/25 hover:scale-105 active:scale-95",
        dark: "rounded-full bg-gray-900 text-gray-50 after:shadow-highlight after:shadow-white/25 hover:scale-105 hover:bg-gray-900/90 active:scale-95",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-8 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading = false, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && "min-w-20 ",
          {
            relative: loading,
            "cursor-not-allowed": loading,
          },
        )}
        ref={ref}
        {...props}
      >
        {loading ? (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <CircularProgress />
          </div>
        ) : (
          props?.children
        )}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
