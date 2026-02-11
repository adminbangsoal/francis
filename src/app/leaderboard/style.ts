import { cva } from "class-variance-authority";

export const PodiumVariants = cva("", {
  variants: {
    rank: {
      first: "",
      second: "md:mt-16",
      third: "md:mt-32",
    },
    divider: {
      first: "bg-amber-500",
      second: "bg-gray-300",
      third: "bg-yellow-600",
    },
    text: {
      first: "text-amber-800",
      second: "text-gray-700",
      third: "text-yellow-900",
    },
  },
  defaultVariants: { rank: "first" },
});
export const RankTableVariants = cva("", {
  variants: {
    variant: {
      "my-rank": "bg-[url('/bg-rank-emerald.png')] bg-cover text-white",
      others: "bg-gray-100 text-black",
    },
  },
});
