"use client";
// components
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

// libs
import Image from "next/image";
export default function Maintenance() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="fixed inset-0 z-50 flex h-screen flex-col items-center justify-center bg-surface-100/70 px-5 backdrop-blur-2xl sm:px-10">
        <Image
          src="https://bangsoal.s3.ap-southeast-1.amazonaws.com/static/empty-state-under-construction.svg"
          alt="Under Construction"
          width={400}
          height={260}
          loading="eager"
          className="w-64 sm:w-80"
          unoptimized
        />
        <div className="flex flex-col items-center gap-2 py-5">
          <h1 className="text-center text-2xl font-bold sm:text-4xl">
            Hi, bang! Website BangSoal sedang dalam perbaikan 🛠
          </h1>
          <p className="max-w-lg text-balance text-center text-sm text-content-300 sm:text-base">
            Maaf atas ketidaknyamanannya 🙇🏼‍♂️, kami sedang memperbaiki website
            kami. Terima kasih atas pengertiannya!.
          </p>
        </div>
        <div className="absolute top-1 -rotate-6 bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center shadow-md">
          <div className="flex animate-infinite-track">
            {[...Array(20)].map((e, i) => (
              <p
                key={i}
                className="w-40 shrink-0 py-1 text-center text-sm font-600 text-white/70"
              >
                sedang perbaikan
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
                sedang perbaikan
              </p>
            ))}
          </div>
        </div>
      </ContextMenuTrigger>
    </ContextMenu>
  );
}
