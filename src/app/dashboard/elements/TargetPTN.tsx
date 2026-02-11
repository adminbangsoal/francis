"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

import { TargetPTNCard } from "./TargetPTNCard";
import { UbahPTNModal } from "./UbahPTNModal";
export const TargetPTN = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4">
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center justify-end gap-3">
          <p className="text-center text-2xl font-bold">Target PTN</p>
          <Image
            src={"/icons/Target.svg"}
            alt="target"
            width={40}
            height={40}
          />
        </div>
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
          className="w-auto"
          variant={"bsGrayLight"}
          size={"sm"}
        >
          <i className="i-ph-pencil-simple-line size-4" />
          <p>Edit</p>
        </Button>
      </div>
      <TargetPTNCard />
      <UbahPTNModal open={openModal} setOpen={setOpenModal} />
    </div>
  );
};
