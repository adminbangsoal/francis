"use client";
import { useWindowsBreakpoints } from "@/lib/hooks/useWindowBreakpoints";
import { cn } from "@/lib/utils";
import { LeaderboardData } from "@/types";
import { useEffect, useState } from "react";
import { LeaderboardFilters } from "./Filters";
import { RankInfoAccordion } from "./RankInfoAccordion";
import { LeaderboardComponentsI } from "./constants";
import { RankTableVariants } from "./style";

export const RankTable = ({
  data,
  myRank,
  isLoading,
}: LeaderboardComponentsI) => {
  const { isTabletBreakpoint } = useWindowsBreakpoints();
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedSMA, setSelectedSMA] = useState<string>("");
  const [selectedPTN, setSelectedPTN] = useState<string>("");
  const [filteredData, setFilteredData] = useState<LeaderboardData[]>(
    data.slice(3),
  );
  const SMAOptions = Array.from(
    new Set(data.map(({ user }) => user?.highschool)),
  );

  useEffect(() => {
    if (searchValue != "" || selectedSMA != "" || selectedPTN != "") {
      const newData = data.filter(({ user }) => {
        return (
          user.full_name.toLowerCase().includes(searchValue.toLowerCase()) &&
          user.highschool.includes(selectedSMA) &&
          (user.first_university.includes(selectedPTN) ||
            user.second_university?.includes(selectedPTN) ||
            user.third_university?.includes(selectedPTN))
        );
      });

      setFilteredData(newData);
    } else {
      setFilteredData(data.slice(3));
    }
  }, [searchValue, selectedSMA, selectedPTN, data]);

  return (
    <div className="bg-white px-10 pb-10 lg:px-16">
      <LeaderboardFilters
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        SMAData={SMAOptions}
        setSelectedSMA={setSelectedSMA}
        setSelectedPTN={setSelectedPTN}
      />

      <div className="grid border-spacing-2 grid-cols-6 gap-4 px-2 pb-2 text-left lg:grid-cols-12">
        <div className="col-span-1 font-bold">Rank</div>
        <div className="col-span-4 font-bold lg:col-span-3">Name</div>
        <div className="col-span-1 font-bold lg:col-span-2">Poin</div>
        <div className="col-span-2 hidden font-bold lg:block">Pilihan 1</div>
        <div className="col-span-2 hidden font-bold lg:block">Pilihan 2</div>
        <div className="col-span-2 hidden font-bold lg:block">Pilihan 3</div>
      </div>
      <div className="hide-scrollbar max-h-[67vh] overflow-y-scroll">
        {isLoading ? (
          <div className="relative z-10 flex flex-col gap-2">
            {[...Array(10)].map((_, idx) => {
              return (
                <div
                  key={idx}
                  className="skeleton h-16 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"
                />
              );
            })}
          </div>
        ) : (
          filteredData.map(({ rank, totalPoints, user }, idx) => (
            <div key={idx} className="my-2">
              {isTabletBreakpoint ? (
                <div
                  className={cn(
                    "grid border-spacing-2 grid-cols-12 items-center gap-4 rounded-lg px-2 py-2 text-left",
                    RankTableVariants({
                      variant: myRank?.rank == rank ? "my-rank" : "others",
                    }),
                  )}
                  id={myRank?.rank == rank ? "my-rank" : ""}
                >
                  <div
                    className={cn(
                      "col-span-1 rounded-lg px-2 font-bold",
                      myRank?.rank == rank ? "text-white" : "text-gray-500",
                    )}
                  >
                    {rank}
                  </div>
                  <div className="col-span-3 rounded-lg">
                    <p className="font-bold">{user.full_name}</p>
                    <p className="text-sm">{user.highschool}</p>
                  </div>
                  <div className="col-span-2 rounded-lg font-bold">
                    {totalPoints}
                  </div>
                  <div className="col-span-2 rounded-lg">
                    <p className="font-bold">{user.first_university}</p>
                    <p className="text-sm">{user.first_major}</p>
                  </div>
                  <div className="col-span-2 rounded-lg">
                    <p className="font-bold">{user.second_university}</p>
                    <p className="text-sm">{user.second_major}</p>
                  </div>
                  <div className="col-span-2 rounded-lg">
                    <p className="font-bold">{user.third_university}</p>
                    <p className="text-sm">{user.third_major}</p>
                  </div>
                </div>
              ) : (
                <div id={myRank?.rank == rank ? "my-rank" : ""}>
                  <RankInfoAccordion
                    data={{ user, totalPoints, rank }}
                    myRank={myRank?.rank}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
