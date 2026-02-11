import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import Image from "next/image";

interface SubmitTOModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitTryoutSet: () => void;
  loading: boolean;
}

const SubmitTOModal = ({
  openModal,
  setOpenModal,
  handleSubmitTryoutSet,
  loading,
}: SubmitTOModalProps) => {
  return (
    <Modal
      open={openModal}
      setOpen={setOpenModal}
      className="flex !max-w-[30rem] flex-col items-center justify-center bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center font-semibold"
    >
      <Image
        src={"/seal-warning.png"}
        alt="skip-forward"
        width={200}
        height={200}
        className="mt-10"
      />
      <div className="relative -mt-10 flex max-w-sm flex-col items-center gap-y-2 pb-7 text-center text-white">
        <h3 className="text-2xl font-semibold text-white">
          Wah udah selesai TO?
        </h3>
        <p className="mb-7 text-base font-normal">
          Pastikan kamu sudah menjawab semua soal try out dengan baik. Apabila
          kamu mengakhiri TO ini, kamu tidak dapat mengerjakan kembali loh.
        </p>
        <div className="flex w-full gap-x-2">
          <Button
            onClick={() => {
              setOpenModal(false);
            }}
            variant="bsSecondary"
            className="grow text-xl text-emerald-800"
          >
            Balik
          </Button>
          <Button
            loading={loading}
            onClick={handleSubmitTryoutSet}
            variant="bsWhite"
            className="grow text-xl text-emerald-800"
          >
            Selesai bang! <i className="i-ph-arrow-right-light size-5" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SubmitTOModal;
