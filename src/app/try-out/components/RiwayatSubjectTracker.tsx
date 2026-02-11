import { cn } from "@/lib/utils";
import { scoreStyle } from "./RiwayatAside";

interface RiwayatSubjectTrackerProps {
  correct: number;
  wrong: number;
  notAnswered: number;
  score?: number | string;
}
export const RiwayatSubjectTracker = ({
  correct,
  wrong,
  notAnswered,
  score,
}: RiwayatSubjectTrackerProps) => {
  return (
    <div className="flex">
      <div className="flex w-full items-center justify-center gap-x-4 rounded-md bg-gray-200 p-2 font-semibold text-gray-500 ">
        <div className=" flex w-3/4 justify-center">
          <div className="flex gap-x-3">
            <div className="flex items-center gap-x-1">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <p className="m-0">{correct}</p>
            </div>
            <div className="flex items-center gap-x-1">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              <p className="m-0">{wrong}</p>
            </div>
            <div className="flex items-center gap-x-1">
              <div className="h-2 w-2 rounded-full bg-gray-500" />
              <p className="m-0">{notAnswered}</p>
            </div>
          </div>
        </div>
        <div>
          <div
            className={cn(
              "w-16 rounded-lg border p-1 text-center text-white md:hidden",
              scoreStyle(Number(score)),
            )}
          >
            {Number(score)}
          </div>
        </div>
      </div>
    </div>
  );
};
