import { Button } from "@/components/ui/button";
import { GetTOHistoryScoreAnalyticsResponse } from "@/types/tryout-history";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import MediaQuery from "react-responsive";

interface TOAttemptHistoryProps {
  toHistoryScore: GetTOHistoryScoreAnalyticsResponse | undefined;
}
const TOAttemptHistory: FC<TOAttemptHistoryProps> = ({ toHistoryScore }) => {
  const router = useRouter();

  const [attemptTab, setAttemptTab] = useState<number>(0);

  if (toHistoryScore?.data?.attempts.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-sm text-gray-400">Belum ada data</p>
      </div>
    );
  }
  return (
    <>
      <MediaQuery maxWidth={1023}>
        <div className="flex w-full items-center gap-x-4">
          <ChevronLeft
            size={24}
            color="#059669"
            onClick={() =>
              setAttemptTab(
                (prev) =>
                  (prev - 1 + (toHistoryScore?.data.attempts.length ?? 1)) %
                  (toHistoryScore?.data.attempts.length ?? 1),
              )
            }
          />
          <div className="grow rounded-xl bg-[url('/bg-mesh-horizontal.webp')] p-2">
            <p className="text-sm font-bold text-white">
              {toHistoryScore?.data.attempts[attemptTab].name}
            </p>
            <div className="mt-1 flex items-center justify-between">
              <div className="flex grow items-center gap-x-2">
                <p className="text-2xl font-bold text-emerald-200">
                  {Math.floor(
                    toHistoryScore?.data.attempts[attemptTab].score ?? 0,
                  )}
                </p>
                {/* <div className="flex h-fit w-fit items-center rounded-full bg-emerald-50 p-1">
                      <ArrowUp size={12} color="#059669" />
                      <p className="ml-1 text-xs leading-none text-emerald-600">
                        16%
                      </p>
                    </div> */}
              </div>
              <Button
                variant="bsSecondary"
                className="h-fit w-fit px-2 py-1 text-[10px] text-white"
                onClick={() =>
                  router.push(
                    `/try-out/riwayat/${toHistoryScore?.data.attempts[attemptTab].tryout_id}`,
                  )
                }
              >
                Lihat histori
              </Button>
            </div>
          </div>
          <ChevronRight
            size={24}
            color="#059669"
            onClick={() =>
              setAttemptTab(
                (prev) =>
                  (prev + 1) % (toHistoryScore?.data.attempts.length ?? 1),
              )
            }
          />
        </div>
      </MediaQuery>
      <MediaQuery minWidth={1024}>
        <div className="flex h-0 w-56 grow flex-col gap-2 overflow-y-auto">
          {!!toHistoryScore &&
            toHistoryScore.data.attempts.map(
              ({ tryout_id, name, score }, idx) => (
                <div
                  key={idx}
                  className="w-full rounded-xl bg-[url('/bg-mesh-horizontal.webp')] p-2"
                >
                  <p className="text-sm font-bold text-white">{name}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <div className="flex grow items-center gap-x-2">
                      <p className="text-2xl font-bold text-emerald-200">
                        {Math.floor(score)}
                      </p>
                      {/* <div className="flex h-fit w-fit items-center rounded-full bg-emerald-50 p-1">
                        <ArrowUp size={12} color="#059669" />
                        <p className="ml-1 text-xs leading-none text-emerald-600">
                          16%
                        </p>
                      </div> */}
                    </div>
                    <Button
                      variant="bsSecondary"
                      className="h-fit w-fit px-2 py-1 text-[10px] text-white"
                      onClick={() =>
                        router.push(`/try-out/riwayat/${tryout_id}`)
                      }
                    >
                      Lihat histori
                    </Button>
                  </div>
                </div>
              ),
            )}
        </div>
      </MediaQuery>
    </>
  );
};

export default TOAttemptHistory;
