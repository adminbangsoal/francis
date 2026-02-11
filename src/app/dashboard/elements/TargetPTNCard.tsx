"use client";
import { RootState, useAppSelector } from "@/redux/store";
import { PTNCard } from "./PTNCard";

export const TargetPTNCard = () => {
  const { profile } = useAppSelector((state: RootState) => state.user);
  return (
    <div className="rounded-xl bg-black/60 px-7 py-6 text-sm">
      <div className="grid grid-cols-4 content-center items-center gap-2 text-white">
        <PTNCard
          university={profile?.choosen_university_one}
          major={profile?.choosen_major_one}
          order={1}
        />
        {!!profile?.choosen_university_two && (
          <PTNCard
            university={profile?.choosen_university_two}
            major={profile?.choosen_major_two}
            order={2}
          />
        )}
        {!!profile?.choosen_university_three && (
          <PTNCard
            university={profile?.choosen_university_three}
            major={profile?.choosen_major_three}
            order={3}
          />
        )}
      </div>
    </div>
  );
};
