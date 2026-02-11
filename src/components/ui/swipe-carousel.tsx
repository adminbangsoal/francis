"use client";
import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AUTO_DELAY, DRAG_BUFFER, SPRING_OPTIONS } from "./constants";

export type CarouselItemType = {
  image_url: string;
  content?: string;
};
interface SwipeCarouselI {
  items: CarouselItemType[];
}
export const SwipeCarousel = ({ items }: SwipeCarouselI) => {
  const [imgIndex, setImgIndex] = useState(0);

  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === items.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < items.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="relative overflow-hidden py-2">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        {items.map(({ image_url, content }, idx) => {
          return (
            <motion.div
              key={idx}
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              animate={{
                scale: imgIndex === idx ? 0.95 : 0.85,
              }}
              transition={SPRING_OPTIONS}
              className="w-full shrink-0"
            >
              <Image
                src={image_url}
                width={80}
                height={40}
                alt="image"
                className="h-32 w-full object-contain"
              />
              <p className="text-sm text-white">{content}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-4 flex w-full justify-center gap-2">
        {items.map((_, idx) => {
          return (
            <button
              key={idx}
              onClick={() => setImgIndex(idx)}
              className={`h-2 w-2 rounded-full transition-colors ${
                idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
