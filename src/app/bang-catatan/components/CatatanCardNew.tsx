"use client";

// components

import { Drawer as DrawerPrimitive } from "vaul";
// data
import { colorMapping } from "@/data/bang-catatan";

// libs
import * as Toggle from "@radix-ui/react-toggle";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useEffect, useState } from "react";

// utils
import { useWindowsBreakpoints } from "@/lib/hooks/useWindowBreakpoints";
import { capitalizeFirstLetter, cn, copyToClipboard } from "@/lib/utils";
import {
  useDislikeCatatanMutation,
  useDownloadCatatanMutation,
  useLikeCatatanMutation,
} from "@/redux/api/catatanApi";
import { Catatan, CatatanParamsI } from "@/types/catatan";
import CatatanAuthor from "./CatatanAuthor";
import CatatanCardDescription from "./CatatanCardDescription";
import CatatanPills from "./CatatanPills";
import CatatanStats from "./CatatanStats";
import CatatanThumbnail from "./CatatanThumbnail";

interface CatatanCardNewI {
  catatan: Catatan;
  queryFilters: CatatanParamsI;
  setQueryFilters: (value: CatatanParamsI) => void;
}
export default function CatatanCardNew({
  catatan,
  queryFilters,
  setQueryFilters,
}: CatatanCardNewI) {
  const {
    id: catatanId,
    thumbnail_url,
    color_pallete,
    title,
    description,
    author,
    author_picture,
    like_count,
    is_liked,
    download_count,
    topic,
    subject,
    note_type,
  } = catatan;

  const { isDesktopBreakpoint } = useWindowsBreakpoints();
  const [downloadCatatan, { data: downloadData }] =
    useDownloadCatatanMutation();
  const [likeCatatan] = useLikeCatatanMutation();
  const [dislikeCatatan] = useDislikeCatatanMutation();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(
    queryFilters.id == catatanId,
  );

  const toggleLikeButton = async () => {
    if (is_liked) {
      dislikeCatatan({ id: catatanId });
    } else {
      likeCatatan({ id: catatanId });
    }
  };
  useEffect(() => {
    if (downloadData && "data" in downloadData) {
      window.open(downloadData.data.url);
    }
  }, [downloadData]);

  const handleIdChange = (value: string | null) => {
    setQueryFilters({ ...queryFilters, id: value });
  };
  useEffect(() => {
    if (isDrawerOpen) {
      handleIdChange(catatanId);
    } else {
      handleIdChange(null);
    }
  }, [isDrawerOpen]);

  return (
    <div>
      <DrawerPrimitive.Root
        open={isDrawerOpen}
        onOpenChange={(open) => {
          setIsDrawerOpen(open);
        }}
        direction={isDesktopBreakpoint ? "right" : "bottom"}
      >
        <DrawerPrimitive.Trigger className="w-full">
          <CatatanThumbnail
            color_pallete={color_pallete}
            thumbnail_url={thumbnail_url}
          />
          <CatatanCardDescription
            author={author}
            author_picture={author_picture}
            color_pallete={color_pallete}
            download_count={download_count}
            like_count={like_count}
            title={title}
          />
        </DrawerPrimitive.Trigger>
        <DrawerPrimitive.Portal>
          <DrawerPrimitive.Overlay className="fixed inset-0 z-20 bg-black/40" />
          <DrawerPrimitive.Content
            className={cn(
              "fixed bottom-0 z-30 flex-col overflow-y-hidden bg-white",
              isDesktopBreakpoint
                ? "right-0 mt-24 flex h-full w-[400px] rounded-l-[10px]"
                : "inset-x-0 h-auto max-h-[90vh] rounded-t-[10px]",
            )}
          >
            <div className="hide-scrollbar h-full max-h-[90vh] flex-1 overflow-y-scroll bg-white px-4 py-6 lg:max-h-screen">
              <div className="group flex flex-col justify-stretch gap-2">
                <div
                  className={cn(
                    "min-h-64 origin-top-right px-16 pb-10 pt-5 @md:px-24 lg:min-h-80",
                  )}
                >
                  <img
                    src={thumbnail_url}
                    alt="Catatan thumbnail"
                    width={800}
                    height={1200}
                    className="mx-auto mt-5 aspect-[4/5] w-40 rounded-lg object-contain object-center shadow-2xl lg:w-auto"
                  />
                </div>

                <div className={cn("flex flex-row justify-center gap-2 p-3")}>
                  <Toggle.Root
                    defaultPressed={is_liked}
                    onClick={toggleLikeButton}
                    aria-label="Toggle like"
                    className={cn(
                      "size-10 rounded-full bg-surface-100 p-2.5 text-content-300 shadow-xl transition-transform duration-300 hover:bg-surface-200 active:scale-90 active:delay-0 active:duration-150 data-[state=on]:text-white",
                      colorMapping[color_pallete].button,
                    )}
                  >
                    <i
                      className={
                        (cn(colorMapping[color_pallete].statIcon),
                        "i-ph-heart-bold size-4 shrink-0")
                      }
                    />
                  </Toggle.Root>

                  <Tooltip.Provider delayDuration={300} skipDelayDuration={0}>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <button
                          onClick={() => downloadCatatan({ id: catatanId })}
                          aria-label="Button download"
                          className="size-10 rounded-full bg-surface-100 p-2.5 text-content-300 shadow-xl transition-transform duration-300 hover:bg-surface-200 active:scale-90 active:delay-0 active:duration-150"
                        >
                          <i
                            className={
                              (cn(colorMapping[color_pallete].statIcon),
                              "i-ph-download-simple-bold size-4 shrink-0")
                            }
                          />
                        </button>
                      </Tooltip.Trigger>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                  <Toggle.Root
                    onClick={() => {
                      copyToClipboard();
                    }}
                    aria-label="Copy Link"
                    className={cn(
                      "size-10 rounded-full bg-surface-100 p-2.5 text-content-300 shadow-xl transition-transform duration-300 hover:bg-surface-200 active:scale-90 active:delay-0 active:duration-150 data-[state=on]:text-white",
                      colorMapping[color_pallete].button,
                    )}
                    pressed={false}
                  >
                    <i className={"i-ph-link-bold"} />
                  </Toggle.Root>
                </div>
                <div className="flex flex-col gap-2 px-10">
                  <CatatanAuthor
                    author={author}
                    author_picture={author_picture}
                    color_pallete={color_pallete}
                    title={title}
                  />
                  <CatatanStats
                    color_pallete={color_pallete}
                    download_count={download_count}
                    like_count={like_count}
                  />
                  <div className="flex flex-wrap gap-2">
                    <CatatanPills
                      text={subject}
                      color_pallete={color_pallete}
                    />
                    <CatatanPills text={topic} color_pallete={color_pallete} />
                    <CatatanPills
                      text={capitalizeFirstLetter(note_type)}
                      color_pallete={color_pallete}
                    />
                  </div>
                  <div
                    className={cn("flex h-auto flex-col gap-3 lg:max-h-screen")}
                  >
                    <p
                      className={cn(
                        "font-600",
                        colorMapping[color_pallete].statNumber,
                      )}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Portal>
      </DrawerPrimitive.Root>
    </div>
  );
}
