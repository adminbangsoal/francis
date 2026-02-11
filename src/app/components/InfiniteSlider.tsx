import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { infiniteSliderVariants } from "./constants";

interface InfiniteSliderI {
  images: string[];
  className?: string;
}
export const InfiniteSlider = ({ images, className }: InfiniteSliderI) => {
  const minWidth = images.length * 150;
  const sliderVariants = infiniteSliderVariants(minWidth, images.length);
  return (
    <div className="-mx-6 w-full min-w-[100vw] overflow-hidden bg-gray-800 md:min-w-[380px] md:-skew-x-12 md:rounded-2xl">
      <div className="flex h-full w-full flex-col items-center justify-center px-10 py-2 md:skew-x-12 lg:py-16">
        <p className="text-md text-center font-bold text-white md:text-2xl">
          Enabling students to get into top PTNs
        </p>
        <motion.div
          className={cn(
            "flex skew-x-12 flex-row items-center gap-10 overflow-hidden md:py-4",
          )}
          variants={sliderVariants}
          animate="animate"
          style={{ minWidth: `${minWidth * 3}px` }}
        >
          {images.concat(images, images).map((image, index) => (
            <div key={index}>
              <Image src={image} alt={"ivy"} width={120} height={120} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
