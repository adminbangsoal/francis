"use client";
// components
import { buttonVariants } from "@/components/ui/button";
import HeroFooter from "./HeroFooter";

// libs
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
const UTBK_DATE = dayjs("2024-04-30");
const daysLeft = UTBK_DATE.diff(dayjs(), "day");

export default function Hero() {
  return (
    <section className="flex min-h-svh flex-col items-center">
      <div className="relative flex w-full flex-col items-center gap-5 px-5 py-40 sm:px-10 lg:px-20">
        {/* <h2 className="text-balance text-center text-xl font-500 text-content-300 sm:text-3xl/snug">
          UTBK hanya{" "}
          <span className="inline-flex items-center gap-1">
            <span className="from-emeral-100 rounded-md bg-gradient-to-b from-emerald-100 to-emerald-200 px-3 py-1 text-emerald-700">
              {daysLeft > 0 ? daysLeft : 0}
            </span>
            <span className="from-emeral-100 rounded-md bg-gradient-to-b from-emerald-100 to-emerald-200 px-3 py-1 text-emerald-700">
              hari
            </span>
          </span>{" "}
          lagi.
        </h2> */}
        <h1 className="text-center text-5xl font-700 sm:text-7xl">
          Apakah{" "}
          <span className="inline-flex items-center gap-1">
            <Image
              src={"/animated-emoji-point.webp"}
              alt={"Animated emoji of hand pointing at user"}
              width={64}
              height={64}
              loading="eager"
              priority
              className="size-10 sm:h-16 sm:w-16"
            />
            <Image
              src={"/animated-emoji-raised-eyebrow.webp"}
              alt={"Animated emoji of face raising eyebrow"}
              width={64}
              height={64}
              loading="eager"
              priority
              className="size-10 sm:h-16 sm:w-16"
            />
          </span>{" "}
          sudah{" "}
          <span className="relative">
            siap?
            <Image
              src={"/scribble.svg"}
              alt={"scribble highlight"}
              width={180}
              height={48}
              loading="eager"
              priority
              className="absolute -inset-x-4 -bottom-8 h-auto w-auto"
            />
          </span>
        </h1>
        <div className="flex items-center gap-3">
          <Link
            href="/latihan-soal/pu"
            className={buttonVariants({ variant: "bsPrimary", size: "lg" })}
          >
            Ajarin bang!
          </Link>
        </div>
        <Image
          src={"/hero-bg.svg"}
          alt={""}
          width={1440}
          height={525}
          loading="eager"
          priority
          className="absolute inset-x-0 bottom-0 top-20 -z-10 h-full object-cover object-bottom"
        />
      </div>
      <HeroFooter />
    </section>
  );
}
