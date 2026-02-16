"use client";
// components
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

// libs
import dayjs from "dayjs";
import "dayjs/locale/id";
import Link from "next/link";
import { useEffect, useState } from "react";

dayjs.locale("id");

const TARGET_DATE = dayjs("2026-02-22 00:00:00");

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ComingSoonWarSoal() {
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
    <div className="flex flex-col items-center gap-2 rounded-xl border border-gray-700/50 bg-gray-900/90 px-6 py-4 shadow-lg backdrop-blur-sm sm:px-8 sm:py-6">
      <div className="text-3xl font-bold text-red-500 sm:text-4xl md:text-5xl">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 sm:text-sm">
        {label}
      </div>
    </div>
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger className="fixed inset-0 z-50 flex h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-5 backdrop-blur-2xl sm:px-10">
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <div className="flex flex-col items-center gap-3 py-5">
            <h1 className="text-center text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] sm:text-5xl md:text-6xl">
              🛡️ ARENA &quot;WAR SOAL&quot; SEDANG DIBANGUN!
            </h1>
            <p className="max-w-2xl text-balance text-center text-base text-gray-300 sm:text-lg">
              Siapkan otak, asah mental. Bukan cuma pintar, tapi siapa paling
              cepat. Mode Ranked Live TikTok segera dibuka.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="mb-2 text-center text-sm font-semibold text-gray-400 sm:text-base">
              Server akan dibuka dalam...
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <CountdownCard label="Hari" value={countdown.days} />
              <CountdownCard label="Jam" value={countdown.hours} />
              <CountdownCard label="Menit" value={countdown.minutes} />
              <CountdownCard label="Detik" value={countdown.seconds} />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center gap-3">
            <p className="text-center text-sm text-gray-400 sm:text-base">
              Pantau terus{" "}
              <Link
                href="https://www.tiktok.com/@bangsoal.co.id"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-red-500 underline hover:text-red-400"
              >
                TikTok
              </Link>{" "}
              dan{" "}
              <Link
                href="https://x.com/bangsoalcoid"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-red-500 underline hover:text-red-400"
              >
                X
              </Link>
            </p>
          </div>
        </div>

        {/* Animated scrolling text at top */}
        <div className="absolute top-1 -rotate-6 border-b-2 border-red-500/30 bg-gradient-to-r from-gray-800 to-gray-900">
          <div className="flex animate-infinite-track">
            {[...Array(20)].map((e, i) => (
              <p
                key={i}
                className="w-40 shrink-0 py-1 text-center text-sm font-600 text-red-500/70"
              >
                WAR SOAL
              </p>
            ))}
          </div>
        </div>

        {/* Animated scrolling text at bottom */}
        <div className="absolute bottom-0 rotate-3 border-t-2 border-red-500/30 bg-gradient-to-r from-gray-800 to-gray-900">
          <div className="flex animate-infinite-track">
            {[...Array(20)].map((e, i) => (
              <p
                key={i}
                className="w-40 shrink-0 py-1 text-center text-sm font-600 text-red-500/70"
              >
                WAR SOAL
              </p>
            ))}
          </div>
        </div>
      </ContextMenuTrigger>
    </ContextMenu>
  );
}
