import { colorMapping } from "@/data/bang-catatan";
import { cn } from "@/lib/utils";
import { BangCatatanTheme } from "@/types/catatan";

interface CatatanThumbnailI {
  thumbnail_url: string;
  color_pallete: BangCatatanTheme;
}

const CatatanThumbnail = ({
  thumbnail_url,
  color_pallete,
}: CatatanThumbnailI) => {
  return (
    <div
      className={cn(
        "relative flex aspect-[16/10] w-full flex-col items-center overflow-hidden rounded-xl border",
        colorMapping[color_pallete].viewport,
      )}
    >
      <div
        className={cn(
          "h-full origin-top-right px-16 pb-10 pt-5 transition-transform duration-300 group-hover:scale-110 @md:px-24",
        )}
      >
        <img
          src={thumbnail_url}
          alt="Catatan thumbnail"
          width={800}
          height={1000}
          className="mt-5 aspect-[4/5] w-fit rounded-t object-cover object-top"
        />
      </div>
    </div>
  );
};

export default CatatanThumbnail;
