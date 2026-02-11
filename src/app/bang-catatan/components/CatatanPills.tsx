import { colorMapping } from "@/data/bang-catatan";
import { cn } from "@/lib/utils";
import { BangCatatanTheme } from "@/types/catatan";

interface CatatanPillsI {
  color_pallete: BangCatatanTheme;
  text: string;
}

const CatatanPills = ({ text, color_pallete }: CatatanPillsI) => {
  return (
    <span
      className={cn(
        colorMapping[color_pallete].pills,
        colorMapping[color_pallete].statNumber,
        "rounded-full px-2 py-1 text-sm",
      )}
    >
      {text}
    </span>
  );
};

export default CatatanPills;
