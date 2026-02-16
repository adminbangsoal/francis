"use client";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { useGetSubjectsQuery } from "@/redux/api/latihanSoalApi";
import Link from "next/link";
import ListItemTopic from "./ListItemTopic";

export const LatihanSoalNav = () => {
  const { data: subjects } = useGetSubjectsQuery();
  return (
    <div>
      <ul className="grid w-[400px] gap-3 p-4 sm:grid-cols-1 lg:w-[400px]">
        <div className="col-span-1 px-4">
          <p>Mode Santai</p>
          <div className="mt-2 h-[1px] w-full bg-neutral-300" />
        </div>
        {subjects ? (
          subjects.data.map((topic) => (
            <ListItemTopic
              key={topic.id}
              title={topic.name}
              icon={topic.illustration as string}
              slug={topic.slug}
            />
          ))
        ) : (
          <div className="flex flex-col gap-y-3 px-3">
            <div className="h-10 w-full shrink-0 animate-pulse rounded-md bg-surface-300 from-surface-300 via-surface-100 to-surface-300 px-6" />
            <div className="h-10 w-full shrink-0 animate-pulse rounded-md bg-surface-300 from-surface-300 via-surface-100 to-surface-300 px-6" />
            <div className="h-10 w-full shrink-0 animate-pulse rounded-md bg-surface-300 from-surface-300 via-surface-100 to-surface-300 px-6" />
          </div>
        )}
      </ul>
      <div className="grid w-[400px] gap-3 p-4 sm:grid-cols-1 lg:w-[400px]">
        <div className="col-span-2 px-4">
          <p>Mode Berwaktu</p>
          <div className="mt-2 h-[1px] w-full bg-neutral-300" />
        </div>
        <Link href={"/latihan-soal-timed"}>
          <NavigationMenuLink asChild>
            <div className="group relative flex h-full w-full select-none flex-row items-center justify-between overflow-hidden rounded-md px-6 py-3 no-underline shadow-none outline-none transition-[transform,box-shadow] duration-500 ease-out-back before:absolute before:inset-0 before:bg-gradient-to-br before:from-emerald-300 before:to-emerald-600 before:opacity-0 before:transition-[opacity] hover:-rotate-3 hover:scale-105 hover:shadow-xl before:hover:opacity-100 focus:shadow-md">
              <p className="z-10 font-600 transition-colors group-hover:text-white">
                {"Latihan Soal Berwaktu"}
              </p>
              <i className="i-ph-timer-bold absolute right-0 size-12 group-hover:text-white" />
            </div>
          </NavigationMenuLink>
        </Link>
      </div>
    </div>
  );
};
