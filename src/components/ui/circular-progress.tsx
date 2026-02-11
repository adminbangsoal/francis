import { cn } from "@/lib/utils";

interface CircularProgressI {
  className?: string;
}
export const CircularProgress = ({ className }: CircularProgressI) => (
  <div
    className={cn(
      "inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-white motion-reduce:animate-[spin_1.5s_linear_infinite]",
      className,
    )}
  />
);
