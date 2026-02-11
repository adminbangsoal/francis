"use client";

// data
import { data } from "./SectionComparison";

// libs
import * as ScrollArea from "@radix-ui/react-scroll-area";
import Image from "next/image";

// utils
import { cn } from "@/lib/utils";

export default function ComparisonScrollArea() {
  return (
    <ScrollArea.Root type="auto" className="w-20 flex-1">
      <ScrollArea.Viewport className="w-full">
        <div className="relative flex">
          {data.others.map((other) => (
            <div
              key={other.id}
              className="flex min-w-[120px] flex-1 flex-col sm:min-w-[160px]"
            >
              <div className="sticky top-0 bg-surface-100/5 backdrop-blur-xl">
                <div className="flex h-28 items-center justify-center">
                  <Image
                    src={other.logo}
                    alt="Other logo"
                    width={512}
                    height={512}
                    className="size-16"
                  />
                </div>
                <div className="relative my-3 h-1 bg-surface-300">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface-200 px-5 py-1 text-center text-sm font-600 text-content-200 sm:text-base">
                    {other.id}
                  </div>
                </div>
              </div>
              {other.icons.map((icon, i) => (
                <div
                  key={data.features[i]}
                  className="flex h-28 shrink-0 items-center justify-center"
                >
                  <i className={cn(icon, "size-10")} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation="horizontal"
        forceMount
        className="!sticky !bottom-3 flex h-2 touch-none select-none px-5"
      >
        <ScrollArea.Thumb className="rounded-full bg-surface-300" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
