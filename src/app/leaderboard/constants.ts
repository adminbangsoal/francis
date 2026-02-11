import { CarouselItemType } from "@/components/ui/swipe-carousel";
import { LeaderboardData, MyRank } from "@/types";

export const RANK_POSITION = ["first", "second", "third"];
export type RANK_TYPE = "first" | "second" | "third";
export const SLIDER_IMAGES = [
  "/icons/England.svg",
  "/icons/Indonesia.svg",
  "/icons/PhBookOpenText.svg",
];
export const PointsInfoItems: CarouselItemType[] = [
  {
    image_url: SLIDER_IMAGES[0],
    content: "Kerjakan latihan soal sebanyak-banyaknya! ",
  },
  {
    image_url: SLIDER_IMAGES[1],
    content:
      "Undang teman menggunakan kode referral mu dan dapatkan poin tambahan ",
  },
  {
    image_url: SLIDER_IMAGES[2],
    content:
      "Bagi catatan belajar mu di Bang Catatan dan dapatkan poin bila dilike atau disimpan ",
  },
];

export interface LeaderboardComponentsI {
  data: LeaderboardData[];
  myRank?: MyRank;
  isLoading?: boolean;
}
