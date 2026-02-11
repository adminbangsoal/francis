import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FinishedTryoutModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FinishedTryoutModal = ({
  openModal,
  setOpenModal,
}: FinishedTryoutModalProps) => {
  const router = useRouter();

  return (
    <Modal
      permanent={true}
      open={openModal}
      setOpen={setOpenModal}
      className="flex !max-w-[30rem] flex-col items-center justify-center bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center font-semibold"
    >
      <Image
        src={"/confetti.png"}
        alt="confetti"
        width={200}
        height={200}
        className="mt-10"
      />
      <div className="relative -mt-10 flex max-w-sm flex-col items-center gap-y-2 pb-7 text-center text-white">
        <h3 className="text-2xl font-semibold text-white">Yay TO selesai!</h3>
        <p className="mb-7 text-base font-normal">
          Selamat kamu sudah menyelesaikan TO. Tunggu pengumuman hasil TO 5 hari
          setelah masa pengerjaan Tryout berakhir ya!
        </p>
        <div className="flex w-full flex-col gap-x-2 gap-y-2 lg:flex-row lg:gap-y-0">
          <Button
            onClick={() => {
              setOpenModal(false);
              router.push("/dashboard");
            }}
            variant="bsSecondary"
            className="grow text-base text-emerald-800"
          >
            Balik ke dashboard
          </Button>
          <Button
            onClick={() => {
              router.push("/latihan-soal");
            }}
            variant="bsWhite"
            className="grow text-base text-emerald-800"
          >
            Lanjut Latihan Soal!
            <i className="i-ph-arrow-right-light size-5" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FinishedTryoutModal;
