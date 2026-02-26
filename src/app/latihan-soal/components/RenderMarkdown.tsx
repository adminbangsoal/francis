"use client";

import { cn } from "@/lib/utils";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";
import Image from "next/image";
import { useState } from "react";

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
  const [imageError, setImageError] = useState(false);

  return (
    <>
      <div className="flex justify-center">
        {asset && (
          <Image
            src={imageError ? "/icons/BookOpenText.svg" : asset}
            alt="asset image"
            width={500}
            height={300}
            onError={() => setImageError(true)}
          />
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
