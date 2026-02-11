import Link from "next/link";
import { ReactNode } from "react";
interface LatihanAsideContainerI {
  children: ReactNode;
}
export const LatihanAsideContainer = ({ children }: LatihanAsideContainerI) => {
  return (
    <div className="hide-scrollbar sticky top-0 flex h-screen w-80 shrink-0 flex-col gap-6 overflow-scroll border-r border-surface-300 bg-surface-200 lg:gap-2">
      <div className="sticky top-0 flex h-16 items-center justify-center gap-2 bg-surface-200 pb-2 pt-4 text-xl font-700 text-content-200">
        <Link href="/dashboard" className="text-gray-700 hover:text-gray-700">
          <p className="!mb-0">BangSoal</p>
        </Link>
        <p className="!mb-0 text-surface-400">|</p>
        <p className="!mb-0 font-[550]">Latihan Soal</p>
      </div>
      {children}
    </div>
  );
};
