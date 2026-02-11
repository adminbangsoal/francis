"use client";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";
import { useGetPtnRankQuery } from "@/redux/api/leaderboardApi";
import { LeaderboardPtn, MyRank } from "@/types";
import { ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MyRankCardI {
  myRank?: MyRank;
}

export const MyRankCard = ({ myRank }: MyRankCardI) => {
  const router = useRouter();
  const { data, isSuccess } = useGetPtnRankQuery();

  const [ptnLeaderboard, setPtnLeaderboard] = useState<LeaderboardPtn[]>([]);

  useEffect(() => {
    if (isSuccess) {
      setPtnLeaderboard(data.data);
    }
  }, [isSuccess]);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-emerald-700/60 to-emerald-600/50 py-3">
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-5 text-white lg:flex-row lg:divide-x-2 lg:divide-emerald-600/80">
        <div className="grid w-full grid-cols-2 justify-items-center gap-4 lg:w-2/5">
          <p className="col-span-2 gap-4 justify-self-start text-xl md:px-10">
            Posisimu
          </p>

          {!!myRank ? (
            <>
              <div className="flex flex-row items-center">
                <p className="text-5xl font-bold">
                  {" "}
                  <span className="text-base font-bold text-emerald-200">
                    #
                  </span>
                  {myRank.rank}
                </p>
              </div>
              <div>
                <p className="text-5xl font-bold">
                  {myRank.point}{" "}
                  <span className="text-base font-bold text-emerald-200">
                    pts
                  </span>
                </p>
              </div>
              <div className="col-span-2">
                <Button
                  variant={"bsSecondary"}
                  className="w-full"
                  onClick={() => {
                    scrollToElement("my-rank");
                  }}
                >
                  <span className="pr-2">
                    <ArrowDown className="w-4" />
                  </span>
                  Lihat posisi
                </Button>
              </div>
            </>
          ) : (
            <div className="col-span-2">
              <Button
                variant={"bsSecondary"}
                onClick={() => {
                  router.push("/login");
                }}
              >
                Masuk untuk melihat posisimu
              </Button>
            </div>
          )}
        </div>
        <div className="grid w-full grid-cols-1 lg:w-3/5">
          {ptnLeaderboard.map(({ major, ptn }, idx) => {
            return (
              <div
                key={major}
                className="grid grid-cols-3 content-center  gap-4 divide-x-2 divide-emerald-600/80"
              >
                <div className="col-span-2 mx-auto flex w-5/6 flex-col justify-items-start py-2 leading-tight">
                  <p className="font-bold">{ptn}</p>
                  <p>{major}</p>
                </div>
                <div className="col-span-1 flex w-full flex-row items-center justify-center gap-1 px-2 py-2">
                  <div className="flex flex-row items-end gap-1">
                    <span className="text-sm font-bold text-emerald-200">
                      #
                    </span>
                    <p className="text-5xl font-bold">{idx + 1}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
