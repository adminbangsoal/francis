"use client";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useState } from "react";

dayjs.locale("id");

const TARGET_DATE = dayjs("2026-02-14 00:00:00");

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function FloatingCountdown() {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMinimized, setIsMinimized] = useState(false);

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

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 duration-500 animate-in fade-in slide-in-from-bottom-4 sm:bottom-6 sm:right-6",
        isMinimized ? "w-auto" : "w-[260px] sm:w-[320px]",
      )}
    >
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-1 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50">
        {/* Animated background glow */}
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-emerald-400/20 via-teal-400/20 to-cyan-400/20" />

        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />

        <div className="relative rounded-xl bg-white/95 backdrop-blur-md">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-emerald-100/50 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-emerald-700 sm:text-sm">
                Coming Soon
              </span>
            </div>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="rounded-md p-1 text-emerald-600 transition-colors hover:bg-emerald-50"
              aria-label={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? (
                <Maximize2 className="h-3 w-3" />
              ) : (
                <Minimize2 className="h-3 w-3" />
              )}
            </button>
          </div>

          {/* Content */}
          {!isMinimized && (
            <div className="p-4">
              <p className="text-content-600 mb-3 text-center text-xs font-semibold sm:text-sm">
                Launch Date: {TARGET_DATE.format("DD MMM YYYY")}
              </p>

              {/* Countdown Grid */}
              <div className="grid grid-cols-4 gap-2">
                <div className="flex flex-col items-center rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 p-2 transition-all duration-200 hover:scale-105 hover:shadow-md">
                  <div className="text-lg font-bold text-emerald-600 transition-all duration-200 sm:text-xl">
                    {countdown.days.toString().padStart(2, "0")}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700/70 sm:text-xs">
                    Hari
                  </div>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 p-2 transition-all duration-200 hover:scale-105 hover:shadow-md">
                  <div className="text-lg font-bold text-emerald-600 transition-all duration-200 sm:text-xl">
                    {countdown.hours.toString().padStart(2, "0")}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700/70 sm:text-xs">
                    Jam
                  </div>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 p-2 transition-all duration-200 hover:scale-105 hover:shadow-md">
                  <div className="text-lg font-bold text-emerald-600 transition-all duration-200 sm:text-xl">
                    {countdown.minutes.toString().padStart(2, "0")}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700/70 sm:text-xs">
                    Menit
                  </div>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 p-2 transition-all duration-200 hover:scale-105 hover:shadow-md">
                  <div className="text-lg font-bold text-emerald-600 transition-all duration-200 sm:text-xl">
                    {countdown.seconds.toString().padStart(2, "0")}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700/70 sm:text-xs">
                    Detik
                  </div>
                </div>
              </div>

              {/* Footer message */}
              <p className="text-content-500 mt-3 text-center text-[10px] sm:text-xs">
                Tunggu tanggal mainnya ya, bang! 🚀
              </p>
            </div>
          )}

          {/* Minimized view */}
          {isMinimized && (
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-emerald-600">
                  {countdown.days}d {countdown.hours}h {countdown.minutes}m
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
