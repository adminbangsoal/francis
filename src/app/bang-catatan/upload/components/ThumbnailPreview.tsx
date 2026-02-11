"use client";
import { colorMapping } from "@/data/bang-catatan";
import { cn } from "@/lib/utils";
import { RootState, useAppSelector } from "@/redux/store";
import {
  BangCatatanTheme,
  BangCatatanVariant,
  UploadCatatanRequest,
} from "@/types/catatan";
import Image from "next/image";
import { useFormContext, useWatch } from "react-hook-form";

export const ThumbnailPreview = () => {
  const { control } = useFormContext<UploadCatatanRequest>();
  const color_pallete = useWatch({
    control,
    name: "color_pallete",
  }) as BangCatatanVariant;
  const thumbnail = useWatch({
    control,
    name: "thumbnail_url",
  });
  const title = useWatch({
    control,
    name: "title",
  });

  const profile = useAppSelector((state: RootState) => state.user.profile);

  return (
    <div className="mx-auto">
      <div className="flex flex-col justify-center gap-4">
        <p className="text-center text-lg">Thumbnail Preview</p>
        <div className="group flex flex-col justify-start gap-2">
          <div
            className={cn(
              "w-64 rounded-lg px-5 pt-2 sm:min-w-80",
              colorMapping[color_pallete].viewport,
            )}
          >
            <Image
              src={
                thumbnail != "" || thumbnail
                  ? thumbnail
                  : "/illustrations/empty-thumbnail.png"
              }
              alt="Catatan thumbnail"
              width={800}
              height={1000}
              className="mx-auto mt-5 aspect-[4/5] h-40 w-4/5 rounded-t object-cover object-top"
            />
          </div>
          <p className={cn(title != "" ? "text-gray-900" : "text-gray-400")}>
            {title != "" ? title : "Judul Catatan"}
          </p>
          <div className="flex flex-row items-center gap-1">
            <Image
              src={profile?.profile_img ?? "/icons/User.svg"}
              alt="Catatan avatar"
              width={200}
              height={200}
              className="size-4 rounded-full"
            />
            <p
              className={cn(
                "text-sm font-medium",
                colorMapping[color_pallete ?? BangCatatanTheme.gray].author,
              )}
            >
              {profile?.full_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
