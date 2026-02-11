"use client";
// components
import Logo from "@/components/Logo";
import MeshGradient from "@/components/MeshGradient";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

// libs

// utils

export default function Pricing() {
  return (
    <section className="relative flex flex-col items-center gap-5 overflow-x-hidden px-5 py-20 md:flex-row md:px-10 lg:px-20">
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-600 text-content-100 sm:text-5xl">
          Nyaman dan terjangkau
        </h1>
        <p className="pb-5 font-500 text-content-300">
          Lupakan buku-buku bank soal yang besar dan mahal! Dengan langganan
          semurah Rp16.000 per bulan, kamu bisa belajar dengan lebih dari 3000
          soal asli UTBK dan ujian mandiri lainnya.
        </p>
        <Link
          href="/langganan"
          className={cn(
            buttonVariants({ variant: "bsPrimary", size: "lg" }),
            "self-start",
          )}
        >
          Lihat semua langganan
        </Link>
      </div>
      <div className="group relative w-full pt-20 md:w-auto md:pt-0">
        <div className="hidden w-full origin-left rounded-xl bg-gradient-to-br from-surface-200 to-surface-300 p-5 shadow-xl transition-transform duration-300 md:absolute md:block md:w-[400px] md:-rotate-[10deg] md:group-hover:rotate-[15deg]">
          <div className="flex flex-col gap-5 text-content-300">
            <div className="flex justify-between">
              <h3 className="text-center text-xl font-500">Pelajar Pemula</h3>
              <Logo
                className="size-8"
                stroke="stroke-gray-800"
                fill="fill-gray-800"
              />
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <h2 className="text-4xl font-700 text-content-100 lg:text-5xl">
                Rp24.000
              </h2>
              <p className="shrink-0 text-xl font-700 opacity-70">/ bulan</p>
            </div>
          </div>
        </div>
        <div className="hidden w-full origin-left rounded-xl bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center p-5 shadow-xl transition-transform duration-300 md:absolute md:block md:w-[400px] md:-rotate-[10deg] md:group-hover:rotate-0">
          <div className="flex flex-col gap-5 text-emerald-700 mix-blend-color-burn">
            <div className="flex justify-between">
              <h3 className="text-center text-xl font-500">Pelajar Setia</h3>
              <Logo
                className="size-8"
                stroke="stroke-emerald-600"
                fill="fill-emerald-600"
              />
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <h2 className="text-4xl font-700 lg:text-5xl">Rp22.000</h2>
              <p className="shrink-0 text-xl font-700 opacity-70">/ bulan</p>
            </div>
          </div>
        </div>
        <div className="relative z-10 w-full origin-left overflow-hidden rounded-xl p-5 shadow-xl transition-transform duration-300 md:w-[400px] md:-rotate-[10deg] group-hover:md:-rotate-[15deg]">
          <MeshGradient colors={["#34d399", "#5eead4", "#3b82f6", "#c4b5fd"]} />
          <div className="flex flex-col gap-5 text-gray-700 mix-blend-color-burn">
            <div className="flex justify-between">
              <h3 className="text-center text-xl font-500">Pelajar Ambis</h3>
              <Logo
                className="size-8"
                stroke="stroke-gray-800"
                fill="fill-gray-800"
              />
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <h2 className="text-4xl font-700 lg:text-5xl">Rp20.000</h2>
              <p className="shrink-0 text-xl font-700 opacity-70">/ bulan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
