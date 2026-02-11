// components
import Iconify from "@/components/Iconify";

// data
import { colorMapping } from "@/data/bang-catatan";

// libs
import * as ScrollArea from "@radix-ui/react-scroll-area";
import Image from "next/image";

// types

// utils
import { cn } from "@/lib/utils";
import { Catatan } from "@/types/catatan";

export default function BookmarkingWindow({
  isBookmarking,
  catatan,
}: Readonly<{ isBookmarking: boolean; catatan: Catatan }>) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-10 flex flex-col pt-8 opacity-0 backdrop-blur-none transition-[backdrop-filter,opacity] duration-300",
        isBookmarking && "pointer-events-auto opacity-100 backdrop-blur",
      )}
    >
      <p
        className={cn(
          "pl-8 pr-16 text-xl font-600",
          colorMapping[catatan.color_pallete].statNumber,
        )}
      >
        Save to your collections
      </p>
      <ScrollArea.Root className="relative h-10 grow rounded-t-xl">
        <ScrollArea.Viewport className="h-full pl-8 pr-16">
          <div className="children:cursor-pointer grid grid-cols-1 gap-2 py-3 @xs:grid-cols-2">
            <div className="flex aspect-square flex-col gap-3 rounded-xl bg-gradient-to-b from-white/30 to-white/50 p-3 shadow-none transition-[transform,box-shadow] hover:scale-105 hover:shadow-xl active:scale-95">
              <div className="children:pointer-events-none children:h-full children:w-full children:select-none children:rounded children:object-cover grid aspect-square w-full grid-cols-2 gap-1">
                <Image
                  src="https://source.unsplash.com/random"
                  alt="Collection preview"
                  width={256}
                  height={256}
                />
                <Image
                  src="https://source.unsplash.com/random"
                  alt="Collection preview"
                  width={256}
                  height={256}
                />
                <Image
                  src="https://source.unsplash.com/random"
                  alt="Collection preview"
                  width={256}
                  height={256}
                />
                <div className="flex h-full w-full items-center justify-center rounded bg-white/30 text-center font-700">
                  +12
                </div>
              </div>
              <p
                className={cn(
                  "text-sm font-500",
                  colorMapping[catatan.color_pallete].statNumber,
                )}
              >
                Main Collection
              </p>
            </div>
            <div className="flex aspect-square flex-col gap-3 rounded-lg bg-gradient-to-b from-white/30 to-white/50 p-3 shadow-none transition-[transform,box-shadow] hover:scale-105 hover:shadow-xl active:scale-95">
              <div className="flex aspect-square w-full items-center justify-center">
                <Iconify
                  icon="ph:plus-bold"
                  className="rounded-full bg-white/50 p-5 text-6xl"
                />
              </div>
              <p
                className={cn(
                  "text-sm font-500",
                  colorMapping[catatan.color_pallete].statNumber,
                )}
              >
                New collection
              </p>
            </div>
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation="vertical"
          forceMount
          className="absolute left-1 flex h-full w-2.5 -translate-x-4 touch-none select-none border-l border-l-transparent p-[1px] pb-3 transition-transform duration-300 group-hover:translate-x-0"
        >
          <ScrollArea.Thumb
            className={cn(
              "relative flex-1 rounded-full",
              colorMapping[catatan.color_pallete].pills,
            )}
          />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}
