import { SwipeCarousel } from "@/components/ui/swipe-carousel";
import { PointsInfoItems } from "./constants";

export const PointsInfo = () => {
  return (
    <div className="">
      <p className="pb-2 text-lg font-bold text-white">Mau dapatkan poin?</p>
      <div className="rounded-2xl bg-blue-400 px-2 py-1">
        <SwipeCarousel items={PointsInfoItems} />
      </div>
    </div>
  );
};
