"use client";

// assets
import { Gradient } from "@/assets/gradient";

// libs
import { useEffect } from "react";

type MeshGradientProps = {
  colors: string[];
};

export default function MeshGradient({ colors }: Readonly<MeshGradientProps>) {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);

  const style: any = {
    "--gradient-color-1": colors[0] || "#000",
    "--gradient-color-2": colors[1] || "#000",
    "--gradient-color-3": colors[2] || "#000",
    "--gradient-color-4": colors[3] || "#000",
  };

  return (
    <canvas
      id="gradient-canvas"
      data-transition-in
      className="absolute inset-0 -z-10"
      style={style}
    />
  );
}
