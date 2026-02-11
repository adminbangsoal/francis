import { colorMapping } from "@/data/bang-catatan";
import { cn } from "@/lib/utils";
import { BangCatatanTheme } from "@/types/catatan";
import Image from "next/image";

interface CatatanAuthorI {
  color_pallete: BangCatatanTheme;
  title: string;
  author_picture: string;
  author: string;
}

const CatatanAuthor = ({
  color_pallete,
  title,
  author_picture,
  author,
}: CatatanAuthorI) => {
  return (
    <div className="flex grow flex-col gap-1">
      <p
        className={cn(
          "tet-2xl text-left font-600",
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
        />
        <p
          className={cn("text-sm font-500", colorMapping[color_pallete].author)}
        >
          {author}
        </p>
      </div>
    </div>
  );
};

export default CatatanAuthor;
