// components

// data

// libs

import { Metadata } from "next";
import Link from "next/link";
import { CatatanContainer } from "./components/CatatanContainer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Bang Catatan | BangSoal",
    description: "Catatan pribadi dan publik",
  };
}
export default function BangCatatan() {
  return (
    <main className="mt-10 flex min-h-screen flex-col items-stretch gap-8 px-5 pb-20 sm:px-10 xl:px-20">
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <div className="flex flex-col gap-1 py-10">
          <h1 className="text-3xl font-700 text-content-100">War Soal</h1>
          <h2 className="text-xl font-500 text-content-300">
            Temukan dan bagikan berbagai sumber belajar bersama Komunitas Bang
            Soal!
          </h2>
        </div>
        <Link
          href="/bang-catatan/upload"
          className="flex h-10 items-center self-end rounded-full bg-emerald-400 px-4 font-600 text-surface-100 lg:justify-center"
        >
          Buat catatan
        </Link>
      </div>

      <CatatanContainer />
    </main>
  );
}
