"use client";

import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import MediaQuery from "react-responsive";
import { InfoAside } from "./InfoAside";
import { RiwayatAside } from "./RiwayatAside";
import { SoalTOAside } from "./SoalTOAside";

export type TOType = "pro" | "kilat";
export const TOAside = () => {
  const params = useParams();
  const pathname = usePathname();

  const isRiwayat = /^\/try-out\/riwayat/.test(pathname);

  function renderAsideComponent() {
    if (isRiwayat) {
      return <RiwayatAside />;
    } else if (!params.id) {
      return <InfoAside />;
    } else {
      return <SoalTOAside />;
    }
  }

  const isAttemptPage = params?.setId;

  return (
    <aside
      className={cn(
        "hide-scrollbar sticky bottom-0 z-20 -mt-20 h-screen shrink-0 flex-col gap-3 border-gray-300 lg:top-0 lg:flex lg:w-[420px] lg:flex-col lg:border-r lg:px-4",
        isAttemptPage && "lg:w-[360px]",
      )}
    >
      <div className="flex h-full flex-col justify-end">
        <MediaQuery minWidth={1024}>
          <div
            className={
              "flex h-16 items-center justify-center gap-2 pt-4 text-xl font-700 text-content-200"
            }
          >
            <Link
              href="/dashboard"
              className="flex flex-row items-center gap-1 text-gray-700 hover:text-gray-700"
            >
              <Logo
                className="size-8"
                fill="stroke-[#374151]"
                stroke="stroke-[#4B5563]"
              />
              <p className="!mb-0">BangSoal</p>
            </Link>
            <p className="!mb-0 text-surface-400">|</p>
            <p className="!mb-0 font-[550]">Try Out</p>
          </div>
          {(isRiwayat || !params.id) && (
            <div className="flex flex-row items-center gap-2">
              <p className="m-0 whitespace-nowrap text-lg font-bold text-gray-500">
                {isRiwayat ? "Riwayat try out" : "Pilih mode Try Out"}
              </p>
              <div className="h-1 grow rounded-full bg-gray-300" />
            </div>
          )}
        </MediaQuery>
        <div className={cn("grow pb-4", isRiwayat && "overflow-y-scroll")}>
          {renderAsideComponent()}
        </div>
      </div>
    </aside>
  );
};
