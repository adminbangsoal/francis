import { colorMapping } from "@/data/bang-catatan";
import { cn } from "@/lib/utils";
import { BangCatatanTheme } from "@/types/catatan";

interface CatatanStatsI {
  color_pallete: BangCatatanTheme;
  like_count: number;
  download_count: number;
}

const CatatanStats = ({
  color_pallete,
  like_count,
  download_count,
}: CatatanStatsI) => {
  return (
    <div className="flex items-start gap-3 py-1 text-sm font-500">
      <div className="flex items-center gap-1">
        <i
          className={cn(
            colorMapping[color_pallete].statIcon,
            "i-ph-heart-fill size-4 shrink-0",
          )}
        />
        <p className={colorMapping[color_pallete].statNumber}>{like_count}</p>
      </div>
      <div className="flex items-center gap-1">
        <i
          className={cn(
            colorMapping[color_pallete].statIcon,
            "i-ph-download-simple size-4 shrink-0",
          )}
        />
        <p className={colorMapping[color_pallete].statNumber}>
          {download_count}
        </p>
      </div>
    </div>
  );
};
export default CatatanStats;
