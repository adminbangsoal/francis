"use client";

// assets
import rickroll from "@public/rickroll.webp";

// components
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

// libs
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AVAILABLE_PATHS } from "./path";
import Iconify from "@/components/Iconify";

export default function ComingSoon() {
  const pathname = usePathname();
  const router = useRouter();

  const isAvailablePath = AVAILABLE_PATHS.some((path) => {
    return pathname === path;
  });
  useEffect(() => {
    if (!isAvailablePath) {
      document.body.classList.add("h-screen", "overflow-hidden");
    } else {
      document.body.classList.remove("h-screen", "overflow-hidden");
    }
  }, [pathname, isAvailablePath]);

  if (isAvailablePath) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => router.back()}
        className="fixed left-5 top-5 z-[100] flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-sm font-600 text-content-200 shadow-xl backdrop-blur-sm transition-all hover:bg-white hover:scale-105 border border-surface-300/50 sm:left-10 sm:top-10"
        aria-label="Kembali"
      >
        <Iconify icon="ph:arrow-left-bold" className="text-lg" />
        <span className="hidden sm:inline">Kembali</span>
      </button>
      <ContextMenu>
        <ContextMenuTrigger className="fixed inset-0 z-50 flex h-screen flex-col items-center justify-center bg-surface-100/70 px-5 backdrop-blur-2xl sm:px-10">
          <Image
          src="/illustrations/empty-state-under-construction.svg"
          alt="Under Construction"
          width={400}
          height={260}
          loading="eager"
          className="w-64 sm:w-80"
        />
        <div className="flex flex-col gap-2 py-5">
          <h1 className="text-center text-3xl font-bold sm:text-4xl">
            Sabar dulu bang!
          </h1>
          <p className="max-w-lg text-balance text-center text-sm text-content-300 sm:text-base">
            Fitur ini akan segera datang!
          </p>
          <div className="flex flex-col justify-center gap-2 pt-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-1.5 rounded-full bg-emerald-400 px-5 py-2 font-500 text-white transition-transform hover:scale-105"
            >
              <p>Dashboard</p>
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-1 rounded-full border border-surface-400 bg-surface-200 px-5 py-2 font-500 text-content-200 transition-transform hover:scale-105"
            >
              <p>Balik ke beranda</p>
            </Link>
          </div>
        </div>
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
      <ContextMenuContent className="w-64">
        <Image src={rickroll} alt="Context menu" />
      </ContextMenuContent>
    </ContextMenu>
    </>
  );
}
