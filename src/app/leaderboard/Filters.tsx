"use client";

import SearchableDropdown from "@/components/ui/searchable-dropdown";
import { useGetAllPTNQuery } from "@/redux/api/ptnApi";
import { PTN } from "@/types";
import SearchInput from "../latihan-soal/components/SearchInput";

interface LeaderboardFiltersI {
  searchValue: string;
  setSearchValue: (value: string) => void;
  setSelectedPTN: (value: string) => void;
  SMAData: string[];
  setSelectedSMA: (value: string) => void;
}
export const LeaderboardFilters = ({
  searchValue,
  setSearchValue,
  setSelectedPTN,
  SMAData,
  setSelectedSMA,
}: LeaderboardFiltersI) => {
  const { data: ptnData } = useGetAllPTNQuery();
  const ptnList: PTN[] = ptnData?.data ?? [];
  const ptnOptions = ptnList?.map(({ name }) => name) ?? [];

  return (
    <div className="my-10 flex flex-col justify-start gap-3 text-content-300 md:flex-row md:items-center">
      <div className="w-full md:w-96 lg:w-1/3">
        <SearchInput
          placeholder="Cari siswa"
          value={searchValue}
          setValue={setSearchValue}
        />
      </div>

      <div className="flex w-full flex-col gap-3 md:flex-row">
        <SearchableDropdown
          className="w-full truncate bg-white focus-visible:ring-0"
          options={SMAData}
          setStringValue={setSelectedSMA}
          placeholder="SMA"
        />
        <div className="grow">
          <SearchableDropdown
            className="w-full truncate bg-white focus-visible:ring-0"
            options={ptnOptions}
            setStringValue={setSelectedPTN}
            placeholder="PTN Tujuan"
          />
        </div>
      </div>

      <div className="mt-3 h-0.5 w-full bg-gray-100 lg:mt-0" />
    </div>
  );
};
