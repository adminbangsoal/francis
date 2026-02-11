import * as React from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";

export interface ImageInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "active";
  color?: "white" | "emerald";
  imageSrc: string | null;
  setImageSrc: (value: string | null) => void;
}

const ImageInput = React.forwardRef<HTMLInputElement, ImageInputProps>(
  (
    {
      className,
      variant = "active",
      color = "white",
      imageSrc,
      setImageSrc,
      ...props
    },
    forwardedRef,
  ) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    const ref = forwardedRef || internalRef;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        setImageSrc(URL.createObjectURL(file));
      }
    };

    return (
      <div className={cn("flex flex-col items-center", className)}>
        <div className="flex flex-col justify-center gap-5">
          <Image
            src={imageSrc ?? "/icons/User.svg"}
            width={160}
            height={160}
            alt="Thumbnail"
            className={cn(
              "h-44 w-44 shrink-0 rounded-full bg-slate-200 object-cover",
              !imageSrc && "p-6",
            )}
          />
          <div className="flex flex-row items-center justify-center divide-x divide-gray-300">
            <button
              className="text-nowrap px-2 font-bold text-blue-600"
              onClick={() => {
                if (ref && "current" in ref) ref?.current?.click();
              }}
            >
              Edit
            </button>
            <button
              className="text-nowrap px-2 font-bold text-red-600"
              onClick={() => setImageSrc(null)}
            >
              Remove
            </button>
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={ref as React.MutableRefObject<HTMLInputElement>}
          onChange={handleImageChange}
          {...props}
        />
      </div>
    );
  },
);
ImageInput.displayName = "ImageInput";

export { ImageInput };
