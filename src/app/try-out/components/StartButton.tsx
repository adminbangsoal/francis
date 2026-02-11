import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import {
  useStartTryoutMutation,
  useStartTryoutSetMutation,
} from "@/redux/api/tryoutApi";
import {
  GetAllTryoutsResponse,
  RegisteredTryoutsResponse,
} from "@/types/tryout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTryoutContextV2 } from "../context/TryoutContextV2";
import StartTOModal from "./Pro/StartTOModal";

interface StartButtonProps {
  registeredTryoutsData: RegisteredTryoutsResponse | undefined;
  selectedTO: string | undefined;
  isFinished: boolean;
  tryoutProData: GetAllTryoutsResponse | undefined;
  isExpired?: boolean;
  isNotStartedPeriod?: boolean;
  isEvent: boolean;
}

const TryoutStartButton = ({
  registeredTryoutsData,
  selectedTO,
  isFinished,
  tryoutProData,
  isExpired = false,
  isNotStartedPeriod = false,
  isEvent = false, // for handling TO events
}: StartButtonProps) => {
  const router = useRouter();
  const { tryoutState } = useTryoutContextV2();
  const [openStartModal, setOpenStartModal] = useState<boolean>(false);
  const [isUserRegistered, setIsUserRegistered] = useState<boolean>(false);
  const [codeModal, setCodeModal] = useState<boolean>(false);
  const [codeEvent, setCodeEvent] = useState<string>("");

  const [
    startTryout,
    {
      isLoading: loadingTryout,
      data: startTryoutResponse,
      isSuccess,
      error,
      isError,
      reset,
    },
  ] = useStartTryoutMutation();

  const [_, { isLoading: loadingTryoutState }] = useStartTryoutSetMutation();

  const isLoading = loadingTryout || loadingTryoutState;

  useEffect(() => {
    if (startTryoutResponse && isSuccess) {
      window.location.href = `/try-out/${selectedTO}`;
    }
  }, [isSuccess, startTryoutResponse]);

  useEffect(() => {
    if (registeredTryoutsData) {
      const isRegistered = registeredTryoutsData.data.find(
        (item) => item.tryout_id === selectedTO,
      );
      setIsUserRegistered(isRegistered ? true : false);
    }
  }, [registeredTryoutsData, selectedTO]);

  useEffect(() => {
    if (isError) {
      console.error(error);
    }
  }, [isError]);

  return (
    <>
      <Modal open={codeModal} setOpen={setCodeModal}>
        <div className="flex flex-col gap-3">
          <p className="text-center text-lg font-bold">
            Masukkan Kode Event Try Out!
          </p>
          <Input
            type="text"
            placeholder="Kode Event"
            className={cn(isError && "border-2 !border-rose-700")}
            value={codeEvent}
            onChange={(e) => {
              setCodeEvent(e.target.value);
              if (isError) reset();
            }}
          />
          {isError && (
            <p className="text-left font-semibold text-rose-700">
              {(error as any)?.data?.error?.message}
            </p>
          )}
          <Button
            loading={isLoading}
            variant="bsPrimary"
            onClick={() => {
              startTryout({ id: selectedTO as string, event_code: codeEvent });
            }}
          >
            Mulai Try Out
          </Button>
        </div>
      </Modal>

      <StartTOModal
        openModal={openStartModal}
        setOpenModal={setOpenStartModal}
        startTO={() => {
          startTryout({ id: selectedTO as string });
        }}
        isLoading={isLoading}
      />
      {registeredTryoutsData && isUserRegistered && (
        <Button
          loading={isLoading}
          onClick={() => {
            if (registeredTryoutsData) {
              if (
                tryoutProData?.data.tryouts.find(
                  (item) => item.id === selectedTO,
                )?.started_at === null
              ) {
                setOpenStartModal(true);
              } else {
                window.location.href = `/try-out/${selectedTO}`;
              }
            }
          }}
          variant={"bsPrimary"}
          disabled={isFinished || isExpired || isNotStartedPeriod}
          className="w-full"
        >
          {isExpired && !isNotStartedPeriod && <span>TO sudah berakhir</span>}
          {!isExpired &&
            !isNotStartedPeriod &&
            (!tryoutState?.data ? (
              <span>{isFinished ? "TO sudah dikerjakan" : "Mulai TO"}</span>
            ) : (
              <span>Lanjutkan Tryout</span>
            ))}
          {isNotStartedPeriod && <span>TO belum dimulai</span>}
          <i className="i-ph-arrow-right-light ml-2 size-5" />
        </Button>
      )}
      {registeredTryoutsData && !isUserRegistered && !isEvent && (
        <Button
          loading={isLoading}
          onClick={() => {
            router.push("/try-out/registration");
          }}
          variant={"bsPrimary"}
          className="w-full"
        >
          Daftar Tryout!
          <i className="i-ph-arrow-right-light ml-2 size-5" />
        </Button>
      )}
      {isEvent && (
        <Button
          disabled={isFinished || isExpired || isNotStartedPeriod}
          loading={isLoading}
          onClick={() => {
            if (tryoutState?.data?.current_set) {
              window.location.href = `/try-out/${selectedTO}`;
            } else if (tryoutState?.data?.next_set_id) {
              window.location.href = `/try-out/${selectedTO}`;
            } else {
              setCodeModal(true);
            }
          }}
          variant={"bsPrimary"}
          className="w-full"
        >
          {isFinished && "Sudah dikerjakan"}
          {!isFinished &&
            (!tryoutState?.data?.current_set && !tryoutState?.data?.next_set_id
              ? "Mulai Tryout"
              : "Lanjutkan Tryout")}
          <i className="i-ph-arrow-right-light ml-2 size-5" />
        </Button>
      )}
    </>
  );
};

export default TryoutStartButton;
