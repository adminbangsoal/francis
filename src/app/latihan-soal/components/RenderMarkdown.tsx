import { cn } from "@/lib/utils";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";
import Image from "next/image";

const RenderMarkdown = ({
  markdown,
  className,
  id,
  asset,
}: {
  markdown: string;
  className?: string;
  id?: string;
  asset?: string;
}) => {
  return (
    <>
      <div className="flex justify-center">
        {asset && (
          <Image src={asset} alt="asset image" width={500} height={300} />
        )}
      </div>
      {markdown && (
        <MathpixLoader>
          <div
            id={id}
            className={cn("text-left font-quicksand text-gray-500", className)}
          >
            <MathpixMarkdown text={markdown} />
          </div>
        </MathpixLoader>
      )}
    </>
  );
};

export default RenderMarkdown;
