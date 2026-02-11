import { cn } from "@/lib/utils";
import { LeaderboardUser } from "@/types";
import Image from "next/image";
import { RANK_POSITION, RANK_TYPE } from "./constants";
import { PodiumVariants } from "./style";

interface PodiumCardI {
  user: LeaderboardUser;
  totalPoints: number;
  rank: number;
}

export const PodiumCard = ({ user, totalPoints, rank }: PodiumCardI) => {
  if (!user) {
    return null;
  }
  const {
    full_name,
    highschool,
    first_university,
    first_major,
    second_university,
    second_major,
    third_university,
    third_major,
    profile_img,
  } = user;

  const targetPtnList = [
    { uni: first_university, major: first_major },
    {
      uni: second_university,
      major: second_major,
    },
    {
      uni: third_university,
      major: third_major,
    },
  ];
  return (
    <div className="flex w-full flex-col items-center justify-start gap-4 px-5 py-3 md:w-56 md:justify-between md:px-0 lg:w-80">
      <div className="relative z-10 flex flex-row items-center gap-3 text-black md:mb-3 md:w-full md:flex-col md:text-white">
        {profile_img && (
          <Image
            src={profile_img}
            alt="profile"
            width={100}
            height={100}
            className="h-12 w-12 rounded-full object-cover"
          />
        )}
        <p className="text-center text-lg font-bold leading-5">
          {full_name}

          <span className="block text-base font-normal">{highschool}</span>
        </p>
      </div>
      <div
        className={cn(
          "relative w-[90vw] rounded-xl bg-gradient-to-b from-white/70 to-white/25 px-4 py-3 md:min-h-60 md:w-full md:to-transparent",
          rank == 2 ? "md:rounded-l-xl" : rank == 3 && "md:rounded-r-xl",
        )}
      >
        <div className="relative -mt-3 flex h-16 w-full justify-center pb-4">
          <div className="absolute">
            <Image
              src={`/illustrations/${RANK_POSITION[rank - 1]}-place.svg`}
              width={160}
              height={80}
              alt="badge"
            />
          </div>
          <div className="relative z-10 flex flex-row items-center gap-4">
            <Image
              src={`/illustrations/${RANK_POSITION[rank - 1]}-rank.svg`}
              width={40}
              height={40}
              alt="rank"
            />
            <div
              className={cn(
                "h-4 w-0.5 rounded-full",
                PodiumVariants({
                  divider: RANK_POSITION[rank - 1] as RANK_TYPE,
                }),
              )}
            />
            <p
              className={cn(
                PodiumVariants({ text: RANK_POSITION[rank - 1] as RANK_TYPE }),
                "font-bold",
              )}
            >
              {totalPoints}pt
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-row items-center gap-3">
          <div className="h-0.5 w-full rounded-full bg-black/5" />
          <p className="text-nowrap text-gray-500">PTN Pilihan</p>
          <div className="h-0.5 w-full rounded-full bg-black/5" />
        </div>

        <div className="flex flex-col gap-1">
          {targetPtnList.map(({ uni, major }, idx) => {
            return (
              !!uni &&
              !!major && (
                <div
                  key={idx}
                  className="rounded-lg bg-black/5 px-2 py-1 leading-tight"
                >
                  <p className="font-bold">{uni}</p>
                  <p className="text-sm"> {major}</p>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};
