"use client";
import { SubcscriptionType } from "@/types/payment";
import Link from "next/link";
import { useState } from "react";
import ChooseButton from "./ChooseButton";
import PriceTabs from "./PriceTabs";
const LanggananContainer = (): JSX.Element => {
  const [choosenTab, setChoosenTab] = useState<SubcscriptionType>("setia");
  const [token, setToken] = useState<string>("");

  return (
    <main className="flex min-h-svh flex-col items-stretch gap-10 px-5 py-20 sm:px-10 lg:gap-20 lg:px-20">
      <div className="flex flex-col gap-5 pt-5 lg:pt-20">
        <h1 className="text-center text-4xl font-600 text-content-100 lg:text-5xl">
          Satu layanan, belajar sepuasnya
        </h1>
        <p className="text-balance text-center font-500 text-content-300">
          Dapatkan akses ke seluruh fitur BangSoal dengan satu paket yang
          terjangkau!
        </p>
      </div>
      <PriceTabs choosenType={choosenTab} setChoosenType={setChoosenTab} />
      <ChooseButton choosenType={choosenTab} setToken={setToken} />
      <section className="flex max-w-screen-xl flex-col gap-10 self-center rounded-xl border-4 border-surface-100 bg-gray-50 px-3 py-10 outline outline-1 outline-surface-300 sm:px-10 lg:flex-row">
        <div className="flex flex-col items-center gap-8">
          <p className="font-500 text-content-200">
            Daripada beli buku bank soal berat dan besar yang harganya ratusan
            ribu rupiah, lebih baik gunakan BangSoal! Satu paket ini memberikan
            akses penuh ke semua fitur belajar yang kamu butuhkan untuk
            persiapan seleksi PTN impianmu.
          </p>
          <div className="h-0.5 w-[90%] rounded-full bg-surface-300" />
          <div className="flex w-full flex-col gap-5 rounded-lg bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center px-3 py-5 pb-0 @container sm:px-5">
            <div className="flex flex-col items-center justify-between gap-3 @sm:flex-row">
              <p className="font-600 text-white">
                Masi ragu-ragu? Cobain dulu aja!
              </p>
              <Link
                href="/latihan-soal"
                className="group flex w-full items-center justify-center gap-1 rounded-lg bg-emerald-900/30 px-4 py-2 text-sm font-500 text-emerald-100 transition-colors hover:text-white @sm:w-auto"
              >
                <p>Latihan soal</p>
                <i className="i-ph-arrow-right-bold size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="flex shrink-0 flex-col gap-4">
              <ul className="flex flex-col gap-2 text-sm text-emerald-200 gradient-mask-b-0 sm:text-base">
                <li className="flex items-center gap-2 text-white">
                  <i className="i-ph-seal-check-duotone size-5" />
                  <p>Ribuan soal asli UTBK dan ujian mandiri</p>
                </li>
                <li className="flex items-center gap-2">
                  <i className="i-ph-minus-circle-duotone size-5" />
                  <p>Penjelasan soal yang lengkap dan mudah dipahami</p>
                </li>
                <li className="flex items-center gap-2">
                  <i className="i-ph-minus-circle-duotone size-5" />
                  <p>Try out UTBK berwaktu dengan penilaian</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-4">
          <ul className="flex flex-col gap-2 text-sm text-content-300 sm:text-base">
            <li className="flex items-center gap-2">
              <i className="i-ph-seal-check-duotone size-5 shrink-0 text-emerald-600" />
              <p>Ribuan soal asli UTBK dan ujian mandiri</p>
            </li>
            <li className="flex items-center gap-2">
              <i className="i-ph-question-duotone size-5 shrink-0 text-emerald-600" />
              <p>Penjelasan soal yang lengkap dan mudah dipahami</p>
            </li>
            <li className="flex items-center gap-2">
              <i className="i-ph-timer-duotone size-5 shrink-0 text-emerald-600" />
              <p>Try out UTBK berwaktu dengan penilaian</p>
            </li>
            <li className="flex items-center gap-2">
              <i className="i-ph-chart-line-up-duotone size-5 shrink-0 text-emerald-600" />
              <p>Analisis performa belajar</p>
            </li>
            <li className="flex items-center gap-2">
              <i className="i-ph-trophy-duotone size-5 shrink-0 text-emerald-600" />
              <p>Leaderboard peringkat nilai siswa</p>
            </li>
            <li className="flex items-center gap-2">
              <i className="i-ph-note-duotone size-5 shrink-0 text-emerald-600" />
              <p>Forum berbagi catatan dan coretan</p>
            </li>
            <li className="flex items-center gap-2">
              <i className="i-ph-users-three-duotone size-5 shrink-0 text-emerald-600" />
              <p>Komunitas belajar barang</p>
            </li>
            <li className="flex items-center gap-2">
              <i className="i-ph-cards-duotone size-5 shrink-0 text-emerald-600" />
              <p>Flash cards harian</p>
            </li>
            <li className="flex items-center gap-2">
              <i className="i-ph-printer-duotone size-5 shrink-0 text-emerald-600" />
              <p>Export PDF dan cetak soal</p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default LanggananContainer;
