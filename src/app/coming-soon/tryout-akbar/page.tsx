"use client";
// components
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

// libs
import dayjs from "dayjs";
import "dayjs/locale/id";
import Image from "next/image";
import { useEffect, useState } from "react";

dayjs.locale("id");

const TARGET_DATE = dayjs("2026-02-22 00:00:00");

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ComingSoonTryoutAkbar() {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = dayjs();
      const diff = TARGET_DATE.diff(now, "millisecond");

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const CountdownCard = ({
    label,
    value,
  }: {
    label: string;
    value: number;
  }) => (
    <div className="flex flex-col items-center gap-2 rounded-xl bg-white/80 px-6 py-4 shadow-lg backdrop-blur-sm sm:px-8 sm:py-6">
      <div className="text-3xl font-bold text-emerald-600 sm:text-4xl md:text-5xl">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-content-400 text-xs font-semibold uppercase tracking-wider sm:text-sm">
        {label}
      </div>
    </div>
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger className="fixed inset-0 z-50 flex h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 px-5 backdrop-blur-2xl sm:px-10">
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <Image
            src="https://bangsoal.s3.ap-southeast-1.amazonaws.com/static/empty-state-under-construction.svg"
            alt="Coming Soon"
            width={400}
            height={260}
            loading="eager"
            className="w-64 sm:w-80"
            unoptimized
          />

          <div className="flex flex-col items-center gap-3 py-5">
            <h1 className="text-center text-3xl font-bold sm:text-4xl md:text-5xl">
              Coming Soon Tryout Akbar! 🚀
            </h1>
            <p className="max-w-lg text-balance text-center text-sm text-content-300 sm:text-base">
              Tryout Akbar akan segera hadir dengan fitur-fitur terbaru yang
              lebih keren! Tunggu tanggal mainnya ya, bang! 💪
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-content-400 text-center text-sm font-semibold sm:text-base">
              Launch Date: {TARGET_DATE.format("DD MMMM YYYY")}
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <CountdownCard label="Hari" value={countdown.days} />
              <CountdownCard label="Jam" value={countdown.hours} />
              <CountdownCard label="Menit" value={countdown.minutes} />
              <CountdownCard label="Detik" value={countdown.seconds} />
            </div>
          </div>
        </div>

        {/* Animated scrolling text at top */}
        <div className="absolute top-1 -rotate-6 bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center shadow-md">
          <div className="flex animate-infinite-track">
            {[...Array(20)].map((e, i) => (
              <p
                key={i}
                className="w-40 shrink-0 py-1 text-center text-sm font-600 text-white/70"
              >
                coming soon
              </p>
            ))}
          </div>
        </div>

        {/* Animated scrolling text at bottom */}
        <div className="absolute bottom-0 rotate-3 bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center shadow-md">
          <div className="flex animate-infinite-track">
            {[...Array(20)].map((e, i) => (
              <p
                key={i}
                className="w-40 shrink-0 py-1 text-center text-sm font-600 text-white/70"
              >
                coming soon
              </p>
            ))}
          </div>
        </div>
      </ContextMenuTrigger>
    </ContextMenu>
  );
}
