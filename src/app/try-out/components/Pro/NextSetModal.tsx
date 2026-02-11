import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import Image from "next/image";

interface NextSetModalProps {
  nextModal: boolean;
  setNextModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitTryoutSet: () => void;
  loading: boolean;
}

const NextSetModal = ({
  nextModal,
  setNextModal,
  handleSubmitTryoutSet,
  loading,
}: NextSetModalProps) => {
  return (
    <Modal
      open={nextModal}
      setOpen={setNextModal}
      className="flex !max-w-[30rem] flex-col items-center justify-center bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center font-semibold"
    >
      <Image
        src={"/skip-forward.png"}
        alt="skip-forward"
        width={200}
        height={200}
        className="mt-10"
      />
      <div className="relative -mt-10 flex max-w-sm flex-col items-center gap-y-2 pb-7 text-center text-white">
        <h3 className="text-2xl font-semibold text-white">
          Yakin udah mau lanjut?
        </h3>
        <p className="mb-7 text-base font-normal">
          Jika kamu lanjut ke set try out selanjutnya, kamu tidak dapat
          mengerjakannya set-set sebelumnya.
        </p>
        <div className="flex w-full gap-x-2">
          <Button
            onClick={() => {
              setNextModal(false);
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
            Lanjut <i className="i-ph-arrow-right-light size-5" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NextSetModal;
