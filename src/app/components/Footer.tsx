"use client";

// component
import Logo from "@/components/Logo";
import { buttonVariants } from "@/components/ui/button";

// libs
import Link from "next/link";
import { usePathname } from "next/navigation";

// utils
import { cn } from "@/lib/utils";

export default function Footer() {
  const path = usePathname();

  if (
    path === "/latihan-soal" ||
    path === "/try-out" ||
    path === "/dashboard"
  ) {
    return null;
  }

  return (
    <footer className="flex flex-col gap-3 p-4 lg:flex-row">
      <div className="flex grow flex-col justify-center gap-6 rounded-2xl bg-[url('/bg-mesh-horizontal.webp')] bg-center p-10 lg:w-80 lg:grow-0">
        <p className="text-2xl font-600 text-white">
          Ambiskan persiapan UTBK-mu sekarang
        </p>
        <Link
          href="https://chat.whatsapp.com/K9FbxphpmSx4DXVuNio5v2"
          className="inline-flex self-start rounded-lg bg-emerald-900/30 px-5 py-3 font-600 text-white hover:bg-emerald-900/60"
        >
          Mulai sekarang
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-10 rounded-2xl bg-gray-800 p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-20">
          <div className="flex flex-row items-center justify-between gap-5 sm:justify-normal lg:flex-col">
            <div className="flex items-center gap-1 text-xl/8 font-600 text-white">
              <Logo
                className="size-8"
                stroke="stroke-white"
                fill="fill-white"
              />
              BangSoal
            </div>
            <div className="hidden h-0.5 grow rounded-full bg-gray-700 xs:block lg:hidden" />
            <div className="flex justify-center">
              <Link
                href="https://www.instagram.com/bangsoal.co.id"
                className="group flex size-10 items-center justify-center rounded-lg hover:bg-gray-700 hover:shadow-highlight"
              >
                <i className="i-bi-instagram h-5 w-5 text-gray-300 group-hover:text-white" />
              </Link>
              <Link
                href="https://x.com/bangsoal_co_id"
                className="group flex size-10 items-center justify-center rounded-lg hover:bg-gray-700 hover:shadow-highlight"
              >
                <i className="i-bi-twitter-x h-5 w-5 text-gray-300 group-hover:text-white" />
              </Link>
              <Link
                href="https://www.tiktok.com/@bangsoal.co.id"
                className="group flex size-10 items-center justify-center rounded-lg hover:bg-gray-700 hover:shadow-highlight"
              >
                <i className="i-bi-tiktok h-5 w-5 text-gray-300 group-hover:text-white" />
              </Link>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-1 flex-col gap-2 text-xl font-600 text-white">
              Belajar
              <div className="flex flex-col items-start *:p-0 *:text-surface-400">
                <Link
                  href="/latihan-soal"
                  className={cn(buttonVariants({ variant: "link" }), "text-sm")}
                >
                  Latihan
                </Link>
                <Link
                  href="/try-out"
                  className={cn(buttonVariants({ variant: "link" }), "text-sm")}
                >
                  Try out
                </Link>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2 text-xl font-600 text-white">
              Komunitas
              <div className="flex flex-col items-start *:p-0 *:text-surface-400">
                <Link
                  href="/bang-catatan"
                  className={cn(buttonVariants({ variant: "link" }), "text-sm")}
                >
                  BangCatatan
                </Link>
                <Link
                  href="/leaderboard"
                  className={cn(buttonVariants({ variant: "link" }), "text-sm")}
                >
                  Leaderboard
                </Link>
                <Link
                  href="https://wa.me/6282336666530?text=Haloo%20BangSoal!"
                  className={cn(buttonVariants({ variant: "link" }), "text-sm")}
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2 text-xl font-600 text-white">
              Info
              <div className="flex flex-col items-start *:p-0 *:text-surface-400">
                <Link
                  href="/langganan"
                  className={cn(buttonVariants({ variant: "link" }), "text-sm")}
                >
                  Langganan
                </Link>
                {/* <Link
                  href="/tentang-kami"
                  className={cn(buttonVariants({ variant: "link" }), "text-sm")}
                >
                  Tentang kami
                </Link> */}
              </div>
            </div>
          </div>
        </div>
        <p className="font-600 text-gray-300">&copy; 2024 BangSoal</p>
      </div>
    </footer>
  );
}
