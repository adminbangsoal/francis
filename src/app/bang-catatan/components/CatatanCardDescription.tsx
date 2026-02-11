import { colorMapping } from "@/data/bang-catatan";
import { cn } from "@/lib/utils";
import { BangCatatanTheme } from "@/types/catatan";
import Image from "next/image";

interface CatatanCardDescriptionI {
  title: string;
  color_pallete: BangCatatanTheme;
  author_picture: string;
  author: string;
  like_count: number;
  download_count: number;
}

const CatatanCardDescription = ({
  title,
  color_pallete,
  author_picture,
  author,
  like_count,
  download_count,
}: CatatanCardDescriptionI) => {
  return (
    <div className="flex gap-2 px-3">
      <div className="flex grow flex-col gap-1">
        <p
          className={cn(
            "line-clamp-1 text-left font-600",
            colorMapping[color_pallete].title,
          )}
        >
          {title}
        </p>
        <div className="flex items-center gap-1">
          <Image
            src={author_picture}
            alt="Catatan avatar"
            width={800}
            height={800}
            className="size-4 rounded-full"
            priority
          />
          <p
            className={cn(
              "text-sm font-500",
              colorMapping[color_pallete].author,
            )}
          >
            {author}
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3 py-1 text-sm font-500">
        <div className="flex items-center gap-1">
          <i
            className={cn(
              colorMapping[color_pallete].statIcon,
              "i-ph-heart-fill",
            )}
          />
          <p className={colorMapping[color_pallete].statNumber}>{like_count}</p>
        </div>
        <div className="flex items-center gap-1">
          <i
            className={cn(
              colorMapping[color_pallete].statIcon,
              "i-ph-download-simple",
            )}
          />
          <p className={colorMapping[color_pallete].statNumber}>
            {download_count}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CatatanCardDescription;
