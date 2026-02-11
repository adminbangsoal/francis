"use client";
import Iconify from "@/components/Iconify";
import { cn } from "@/lib/utils";
import { setCookie } from "cookies-next";
import Cookies from "js-cookie";
import { useState } from "react";

interface DismissibleBoxI {
  stateless?: boolean;
  text?: string;
}
export const DismissibleBox = ({
  stateless = false,
  text = "Soal-soal akan terus ditambah dan diperbarui secara berkala!",
}: DismissibleBoxI) => {
  const hidden = Cookies.get("hide-info");
  const [isHidden, setIsHidden] = useState(false);

  const handleHideBox = () => {
    if (!stateless) {
      setTimeout(() => {
        setCookie("hide-info", "true");
      }, 200);
    }
    setIsHidden(true);
  };

  return (
    <div
      id="info-box"
      className={cn(
        "flex flex-row items-center gap-3 rounded-lg bg-gray-800 px-4 py-3 text-white transition-transform duration-300 ease-in-out",
        ((!!hidden && !stateless) || isHidden) && "hidden",
        isHidden ? "animate-slide-up-and-fade" : "animate-slide-down-and-fade",
      )}
    >
      <Iconify icon="ph:info" />
      <p className="grow">{text}</p>
      <button onClick={handleHideBox}>
        <Iconify icon="ph:x-bold" />
      </button>
    </div>
  );
};
