"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TimedLatihanSoalModal: React.FC = () => {
  const router = useRouter();
  const [timedSoalModal, setTimedSoalModal] = useState<boolean>(true);

  return (
    <Modal
      className="flex w-[480px] justify-center bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center text-center text-white"
      open={timedSoalModal}
      setOpen={setTimedSoalModal}
    >
      <div className="flex w-full flex-col items-center">
        <Image src="/timer.svg" width={200} height={200} alt="timer logo" />
        <div className="-mt-14">
          <p className="!m-0 text-2xl font-700">Kamu dapat</p>
          <p className="!m-0 text-2xl font-700">mewaktukan latihanmu!</p>
          <p className="mt-4 px-5 text-center font-600 text-white text-opacity-70">
            Ingin tahu butuh berapa lama untuk menjawab suatu soal? Kamu bisa
            menggunakan fitur Latihan Soal Berwaktu!
          </p>
          <div className="mt-10 flex gap-x-2">
            <Button
              onClick={() => setTimedSoalModal(false)}
              className={cn(
                buttonVariants({
                  variant: "bsWhite",
                }),
                "w-1/2 hover:text-white",
              )}
            >
              Nanti Saja
            </Button>
            <Button
              onClick={() => {
                // Mixpanel.track("Clicked Coba Sekarang Latihan Soal Berwaktu");
                router.push("/latihan-soal-timed");
              }}
              className={cn(
                buttonVariants({
                  variant: "bsPrimary",
                }),
                "flex w-1/2 items-center gap-x-1 hover:text-white",
              )}
            >
              Coba Sekarang{" "}
              <div className="i-ph-arrow-right-bold h-[16px] w-[16px] text-white group-hover:text-white"></div>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TimedLatihanSoalModal;
