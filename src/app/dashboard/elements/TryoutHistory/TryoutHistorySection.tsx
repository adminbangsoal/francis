import { useGetTOHistoryScoreAnalyticsQuery } from "@/redux/api/tryoutHistoryApi";
import { LineChart } from "@mui/x-charts/LineChart";
import { FC, useEffect, useRef, useState } from "react";
import TOAttemptHistory from "./TOAttemptHistory";

const TryoutHistorySection: FC = () => {
  const widthChartRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState<number>(0);

  const { data: toHistoryScore } = useGetTOHistoryScoreAnalyticsQuery();

  useEffect(() => {
    const timer = setTimeout(() => {
      const width = widthChartRef.current?.offsetWidth;
      setChartWidth(width || 0);
    }, 100); // Update every 100 milliseconds (0.1 second)

    return () => clearTimeout(timer); // Clean up the timer on component unmount or re-render
  });

  return (
    <>
      <div className="flex max-h-min flex-col gap-4 lg:flex-row">
        <div className="grow rounded-md border-[1px] border-slate-300 p-4">
          <p className="mb-4 text-2xl font-bold text-slate-950">
            Performa Kamu
          </p>
          <div
            className="grid grid-cols-2 gap-4 xl:grid-cols-3"
            ref={widthChartRef}
          >
            <div className="col-span-2 rounded-md p-3 xl:col-span-1">
              <p className="font-semibold">Average Score</p>
              <div className="mt-2 flex items-center justify-between gap-x-4">
                <p className="text-4xl font-bold">
                  {Math.floor(toHistoryScore?.data.average_score ?? 0)}
                </p>
                {/* <div className="flex items-center">
                  <ArrowUp size={24} color="#22C55E" />
                  <p className="ml-1 max-w-[12ch] text-xs font-medium">
                    +7% from the last average
                  </p>
                </div> */}
              </div>
            </div>
            <div className="col-span-2 rounded-md bg-blue-50 p-3 xs:col-span-1">
              <p className="font-semibold">Highest Score</p>
              <div className="mt-2 flex items-center justify-between gap-x-4">
                <p className="text-4xl font-bold">
                  {Math.floor(toHistoryScore?.data.max_score ?? 0)}
                </p>
                {/* <div className="flex items-center">
                  <ArrowUp size={24} color="#22C55E" />
                  <p className="ml-1 max-w-[12ch] text-xs font-medium">
                    +7% from the last average
                  </p>
                </div> */}
              </div>
            </div>
            <div className="col-span-2 rounded-md bg-red-50 p-3 xs:col-span-1">
              <p className="font-semibold">Lowest Score</p>
              <div className="mt-2 flex items-center justify-between gap-x-4">
                <p className="text-4xl font-bold">
                  {Math.floor(toHistoryScore?.data.min_score ?? 0)}
                </p>
                {/* <div className="flex items-center">
                  <ArrowUp size={24} color="#22C55E" />
                  <p className="ml-1 max-w-[12ch] text-xs font-medium">
                    +7% from the last average
                  </p>
                </div> */}
              </div>
            </div>
          </div>
          {!!toHistoryScore &&
            !!toHistoryScore.data.attempts &&
            !!toHistoryScore.data.attempts.length && (
              <LineChart
                sx={{
                  ".MuiLineElement-root": {
                    stroke: "#F97316",
                    strokeWidth: 1.71,
                  },
                  ".MuiMarkElement-root": {
                    stroke: "#F97316",
                    scale: "0.6",
                    fill: "#F97316",
                    strokeWidth: 2,
                  },
                }}
                xAxis={[
                  {
                    scaleType: "point",
                    data:
                      toHistoryScore?.data.attempts.map(({ name }) => name) ??
                      [],
                  },
                ]}
                series={[
                  {
                    curve: "linear",
                    data:
                      toHistoryScore?.data.attempts.map(({ score }) =>
                        Math.floor(score),
                      ) ?? [],
                  },
                ]}
                width={chartWidth}
                height={chartWidth * 0.6}
                grid={{ horizontal: true }}
              />
            )}
        </div>
        <div className="flex min-w-fit flex-col rounded-md border-[1px] border-[#E2E8F0] p-4">
          <p className="text-sm font-semibold">Finished Try out Set</p>
          <div className="mt-1 flex items-center gap-x-2">
            <p className="text-3xl font-bold">
              {toHistoryScore?.data.finished_tryouts}
            </p>
            <p className="text-lg font-medium">
              /{toHistoryScore?.data.total_tryouts} set
            </p>
          </div>
          <div className="my-4 h-[1px] w-full bg-gray-300" />
          <TOAttemptHistory toHistoryScore={toHistoryScore} />
        </div>
      </div>

      {/* <AverageScoreDetail /> */}
    </>
  );
};

export default TryoutHistorySection;
