"use client";
import { CatatanPaginated } from "@/app/bang-catatan/components/CatatanPaginated";

import { CatatanParamsI } from "@/types/catatan";

export const Catatanmu = (searchParams: CatatanParamsI) => {
  return (
    <div className="flex flex-col gap-3 py-5">
      <p className="text-3xl font-bold">War Soal</p>
      <CatatanPaginated {...searchParams} is_liked />
    </div>
  );
};
