"use client";

import { ProgressBar } from "@/components/ui/progress-bar";
import { useGetHeadersDashboardQuery } from "@/redux/api/dashboardApi";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { DashboardBoxContainer } from "../elements/DashboardBoxContainer";

export const LatsolOverview = () => {
  const { data } = useGetHeadersDashboardQuery();
  const floatingImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (floatingImageRef.current) {
      gsap.to(floatingImageRef.current, {
        y: -8,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      <DashboardBoxContainer className="col-span-1">
        <p className="font-medium">Latihan Soal Selesai</p>
        <p className="text-xl">
          <span className="text-3xl font-bold">
            {data?.data.finished.done}{" "}
          </span>
          / {data?.data.finished.total} soal
        </p>
        <ProgressBar progress={data?.data.finished.percentage || 0} />
      </DashboardBoxContainer>
      <DashboardBoxContainer className="col-span-1">
        <p className="font-medium">Akurasi</p>
        <div className="flex flex-row items-center justify-between">
          <p className="text-3xl font-bold">
            {data?.data.accuracy.percentage}%
          </p>
          {/* <div className="flex w-1/2 flex-row items-center gap-2">
          <ArrowUpIcon className="text-green-500" />
          <p className="text-wrap text-xs">+7% from the last average</p>
        </div> */}
        </div>
        <p className="text-slate-500">
          {data?.data.accuracy.correct_answers} /{" "}
          {data?.data.accuracy.total_attempted_question} soal benar
        </p>
        <ProgressBar progress={data?.data.accuracy.percentage || 0} />
      </DashboardBoxContainer>
      <DashboardBoxContainer className="col-span-2 md:col-span-1">
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-col">
            <p className="flex flex-row items-center gap-3 font-medium">
              <Image
                src={"/icons/Fire.svg"}
                alt="fire"
                width={28}
                height={28}
              />
              Streak
            </p>
            <p className="text-3xl font-bold">{data?.data.streak || 0} Days</p>
          </div>
          <div className="relative mr-4 flex flex-shrink-0 items-center justify-center sm:mr-6 md:mr-6">
            <Image
              src={"/Book.PNG"}
              alt="book"
              width={160}
              height={160}
              className="z-0 mt-2 h-28 w-28 object-contain sm:h-32 sm:w-32 md:h-36 md:w-36"
            />
            <div
              ref={floatingImageRef}
              className="absolute z-10 mt-2 h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36"
            >
              <Image
                src={"/below10d streak on book.PNG"}
                alt="streak on book"
                width={160}
                height={160}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </DashboardBoxContainer>
    </div>
  );
};
