"use client";

import { cn, formatDateToIndonesian } from "@/lib/utils";
import { useGetAllTryoutsQuery } from "@/redux/api/tryoutApi";
import { TryoutBase } from "@/types/tryout";
import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import { SelectTO } from "../components/SelectTO";
import { useTryoutContextV2 } from "../context/TryoutContextV2";
import { useTryoutOverviewContext } from "../context/TryoutOverviewContext";
import { getAllActiveTOProsDummy } from "../dummy";

export const TOProAside = () => {
  const { tryoutState } = useTryoutContextV2();

  const { setSelectedTryout: setSelectedTO, selectedTryout: selectedTO } =
    useTryoutOverviewContext();

  const { data: tryoutProData, isSuccess } = useGetAllTryoutsQuery({
    mode: "pro",
  });

  const [upcomingTryouts, setUpcomingTryouts] = useState<TryoutBase[]>([]);

  useEffect(() => {
    // get upcoming tryouts
    if (isSuccess) {
      setSelectedTO((isSuccess && tryoutProData.data.tryouts[0]?.id) as string);
      const upcoming = tryoutProData.data.tryouts.filter((item) => {
        const date = new Date(item.start_date);
        return date > new Date();
      });
      setUpcomingTryouts(upcoming);
    }
  }, [tryoutProData]);

  return (
    <div>
      <div className="flex gap-4 lg:flex-row">
        <div className="my-4 flex w-full flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <p className="whitespace-nowrap text-lg font-bold text-gray-500">
              Pilih set try out
            </p>
            <div className="h-1 grow rounded-full bg-gray-300" />
          </div>
          <div className="flex h-full grow flex-col gap-1 whitespace-nowrap rounded-xl bg-gray-200 px-2 py-2 text-gray-700">
            {upcomingTryouts.length > 0 &&
              upcomingTryouts.map(({ name, start_date, id }) => {
                return (
                  <div key={id}>
                    <div className="flex flex-row justify-between px-3">
                      <p>{name}</p>

                      <div className="rounded-full bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center px-2 text-white">
                        segera hadir!
                      </div>
                      <p>{formatDateToIndonesian(start_date)}</p>
                    </div>
                  </div>
                );
              })}
            <div className="mx-3 my-1 h-0.5 grow rounded-full bg-gray-300" />
            <MediaQuery maxWidth={1023}>
              {selectedTO && (
                <SelectTO
                  currentTopic={selectedTO}
                  setCurrentTopic={setSelectedTO}
                  listData={getAllActiveTOProsDummy.tryouts as TryoutBase[]}
                />
              )}
            </MediaQuery>
            <MediaQuery minWidth={1024}>
              {isSuccess &&
                tryoutProData.data.tryouts.map(
                  ({ id, name, end_date }, idx) => {
                    const isDisabled = () => {
                      if (tryoutState && tryoutState.data) {
                        return tryoutState.data.tryout_id !== id;
                      } else {
                        return false;
                      }
                    };
                    return (
                      <button
                        disabled={isDisabled()}
                        className={cn(
                          selectedTO == id &&
                            "rounded-lg border border-emerald-500 bg-emerald-400 text-white shadow after:shadow-highlight after:shadow-white/25  hover:border-emerald-600 hover:bg-emerald-500 hover:text-white active:scale-95",
                          "px-3 py-1",
                        )}
                        onClick={() => {
                          setSelectedTO(id);
                        }}
                        key={idx}
                      >
                        <div className="flex flex-row justify-between">
                          <p>{name}</p>
                          <p>
                            s.d <b>{formatDateToIndonesian(end_date)}</b>
                          </p>
                        </div>
                      </button>
                    );
                  },
                )}
            </MediaQuery>
          </div>
        </div>
      </div>
    </div>
  );
};
