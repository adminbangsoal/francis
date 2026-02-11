"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { TagVariants } from "../components/style";
import { getTOKilatDetailsDummy } from "../dummy";

export const TOKilatOverview = () => {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject") ?? "";

  return (
    <div className="flex flex-col gap-5 py-5 text-emerald-100 lg:text-gray-500">
      <div className="flex flex-col gap-5 rounded-2xl bg-[#064E3B33]/20 px-4 py-3 lg:bg-transparent lg:p-0 ">
        <p className="py-2 text-2xl font-bold text-white lg:text-gray-950">
          {getTOKilatDetailsDummy.name}
        </p>

        <div className="hidden h-[2px] w-full lg:block lg:bg-gray-100" />
        <p className="text-justify font-semibold">
          {getTOKilatDetailsDummy.description}
        </p>
      </div>

      <Button variant={"bsSecondary"} className="lg:hidden">
        <i className="i-ph-clock-counter-clockwise size-4" />
        Riwayat
      </Button>

      <div className="grid grid-cols-2 gap-2">
        <div
          className={cn(
            "col-span-2 px-4 text-center text-xl font-bold",
            TagVariants({ color: "pink", size: "large", rounded: "large" }),
          )}
        >
          {getTOKilatDetailsDummy.sets[0].subject_name}
        </div>
        <div
          className={cn(
            TagVariants({ color: "pink", size: "large", rounded: "large" }),
            "relative overflow-y-hidden",
          )}
        >
          <i className="i-ph-books absolute -bottom-6 left-1/2 size-20 -translate-x-1/2 transform opacity-30" />
          <p className="text-2xl">
            {getTOKilatDetailsDummy.sets[0].total_questions}{" "}
            <span className="text-normal">soal</span>
          </p>
        </div>
        <div
          className={cn(
            TagVariants({ color: "pink", size: "large", rounded: "large" }),
            "relative overflow-y-hidden",
          )}
        >
          <i className="i-ph-timer absolute -bottom-6 left-1/2 size-20 -translate-x-1/2 transform opacity-30" />
          <p className="text-2xl">
            {Math.round((getTOKilatDetailsDummy.sets[0].duration / 60) * 10) /
              10}{" "}
            <span className="text-normal">menit</span>
          </p>
        </div>
      </div>
    </div>
  );
};
