"use client";

import { useGetProfileDashboardQuery } from "@/redux/api/dashboardApi";
import Image from "next/image";
import { useState } from "react";

interface ProfileCardI {
  full_name: string;
  highschool: string;
  points: number;
}
export const ProfileCard = ({
  full_name,
  highschool,
  points,
}: ProfileCardI) => {
  const { data, isLoading } = useGetProfileDashboardQuery();
  const [imageError, setImageError] = useState(false);
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-[#F8FAFC] p-4">
      <p className="text-xl font-bold">{full_name}</p>
      <div className="flex flex-row items-center gap-3">
        <div className="h-[40px] w-[40px]">
          {isLoading ? (
            <div className="skeleton relative h-[40px] w-[40px] rounded-full bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
          ) : (
            <Image
              src={
                imageError
                  ? "/icons/BookOpenText.svg"
                  : data?.data.profile_picture ?? "/icons/User.svg"
              }
              alt="avatar"
              width={40}
              height={40}
              objectFit="cover"
              className="h-[40px] w-[40px] rounded-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <div>
          <p className="mb-1">{highschool}</p>
          <div className="flex flex-row items-center gap-3 rounded-full bg-gradient-to-r from-[#FFE490] to-[#FDA085] px-2 py-1">
            <Image
              src={"/icons/star.svg"}
              alt="svg"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <p className="text-amber-800">{points} poin</p>
          </div>
        </div>
      </div>
    </div>
  );
};
