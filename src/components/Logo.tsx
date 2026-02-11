// utils
import { cn } from "@/lib/utils";

export default function Logo({
  className,
  stroke,
  fill,
}: Readonly<{ className?: string; stroke?: string; fill?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M224.001 140.15C240.001 100.15 289.112 93.8332 316.001 108.15C342.889 122.467 352 152.299 344 180.15C336 208 303.577 221.735 278.314 235.654C246.734 253.053 225.763 287.408 230.701 323.954"
        className={cn(
          "stroke-emerald-500 stroke-[48] dark:stroke-emerald-300",
          stroke,
        )}
        strokeLinecap="round"
      />
      <path
        d="M179.717 385.247C196.426 408.758 232.529 411.682 253.311 402.371"
        className={cn(
          "stroke-emerald-500 stroke-[48] dark:stroke-emerald-300",
          stroke,
        )}
        strokeLinecap="round"
      />
      <path
        d="M368 292.15C368 309.823 353.673 324.15 336 324.15C318.327 324.15 304 309.823 304 292.15C304 274.477 318.327 260.15 336 260.15C353.673 260.15 368 274.477 368 292.15Z"
        className={cn("fill-emerald-400 dark:fill-white", fill)}
      />
      <path
        d="M208 228.15C208 245.823 193.673 260.15 176 260.15C158.327 260.15 144 245.823 144 228.15C144 210.477 158.327 196.15 176 196.15C193.673 196.15 208 210.477 208 228.15Z"
        className={cn("fill-emerald-400 dark:fill-white", fill)}
      />
    </svg>
  );
}
