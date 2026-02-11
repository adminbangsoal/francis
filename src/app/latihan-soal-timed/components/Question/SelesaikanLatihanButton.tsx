"use client";

import { Button } from "@/components/ui/button";
import { useLatihanContext } from "../../context/LatihanContext";

export const SelesaikanLatihanButton = () => {
  const { setOpenConfirmModal } = useLatihanContext();

  return (
    <div>
      <Button
        variant={"danger"}
        className="w-full"
        onClick={() => {
          setOpenConfirmModal(true);
        }}
      >
        Selesaikan Latihan
      </Button>
    </div>
  );
};
