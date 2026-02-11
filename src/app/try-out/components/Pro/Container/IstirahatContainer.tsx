import { useTryoutContextV2 } from "@/app/try-out/context/TryoutContextV2";
import { Button } from "@/components/ui/button";
import { calculateTimeLeftV2 } from "@/lib/utils";
import {
  useGetTryoutStateQuery,
  useStartTryoutSetMutation,
} from "@/redux/api/tryoutApi";
import dayjs from "dayjs";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import FinishedTryoutModal from "../FinishedTOModal";

const defaultValue = {
  seconds: -1,
  minutes: -1,
  hours: -1,
  text: "",
};

const IstirahatContainer = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const {
    handleSubmitTryout,
    tryoutState,
    handleSubmitTOset,
    isTryoutSubmitted,
    openFinishedModal,
    setOpenFinishedModal,
  } = useTryoutContextV2();

  const [endTime, setEndTime] = useState<Date>();

  const { refetch } = useGetTryoutStateQuery();

  const [startTOSet, { isLoading, isSuccess }] = useStartTryoutSetMutation();

  const handleNextTryoutSet = async (nextSetId: string) => {
    startTOSet({ set_id: nextSetId, tryout_id: id as string }).then(() => {
      router.push(`/try-out/${id}`);
    });
  };

  const [timeLeft, setTimeLeft] = useState(defaultValue);
  const [submissionInitiated, setSubmissionInitiated] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (endTime) {
      const tick = () => {
        const result = calculateTimeLeftV2(endTime, "mins");

        if (result.timeIsUp) {
          if (!submissionInitiated && !isTryoutSubmitted) {
            setSubmissionInitiated(true); // Prevent further submissions
            handleSubmitTryout(tryoutState?.data?.tryout_id as string);
          }
          clearInterval(intervalRef.current!);
        } else {
          setTimeLeft(result);
        }
      };

      tick(); // Initial tick
      intervalRef.current = setInterval(tick, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [
    endTime,
    submissionInitiated,
    isTryoutSubmitted,
    handleSubmitTOset,
    handleSubmitTryout,
    tryoutState?.data?.next_set_id,
  ]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (tryoutState && tryoutState.data) {
      const endTime = dayjs(tryoutState.data.started_at)
        .add(tryoutState.data.total_duration, "second")
        .toDate();
      setEndTime(endTime);
    }
  }, [tryoutState]);

  return (
    <>
      <FinishedTryoutModal
        openModal={openFinishedModal}
        setOpenModal={setOpenFinishedModal}
      />
      <div className="h-0.5 grow rounded-full bg-gray-200" />
      <main className="relative min-h-screen md:h-screen md:overflow-y-auto md:py-10">
        <h1 className="px-4 text-3xl font-700 text-content-100 md:px-16 lg:px-10">
          Zona Istirahat
        </h1>
        <div className="flex w-full flex-col gap-x-4 p-4 md:px-16 lg:p-0">
          <div className="h-0.5 w-full rounded-full bg-gray-200 lg:mt-2" />
          {tryoutState?.data && tryoutState.data.next_set_duration && (
            <h2 className="pt-4 text-xl font-500 text-content-300 lg:px-10">
              Selanjutnya:{" "}
              <b>
                {tryoutState?.data?.next_subject} |{" "}
                {tryoutState.data.next_set_duration &&
                  (tryoutState.data.next_set_duration / 60).toFixed(0)}{" "}
                menit{" "}
              </b>
            </h2>
          )}
        </div>
        <div className="w-full gap-x-4 p-4 text-gray-700 md:px-16 lg:p-10">
          <div className="">
            <p className="mb-2 font-bold">Sisa Total Waktu Try Out</p>
            <div
              className="w-fit rounded-md bg-gray-100"
              style={{
                padding: "1rem 1.5rem",
              }}
            >
              <p className="flex gap-x-3 text-2xl font-bold text-gray-700 md:text-3xl lg:text-5xl">
                <div>
                  {timeLeft.hours > 0 && <>{timeLeft.hours}</>}
                  {timeLeft.hours > 0 && (
                    <span className="text-gray-500 lg:text-xl"> Jam </span>
                  )}
                </div>
                <div>
                  {timeLeft.minutes > 0 && <>{timeLeft.minutes}</>}
                  <span className="text-gray-500 lg:text-xl"> menit</span>{" "}
                </div>
                <div>
                  {timeLeft.seconds > 0 && <>{timeLeft.seconds}</>}
                  <span className="text-gray-500 lg:text-xl"> detik</span>
                </div>
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              handleNextTryoutSet(tryoutState?.data?.next_set_id as string);
            }}
            loading={isLoading}
            variant="bsPrimary"
            className="z-20 mt-10 w-64"
          >
            Mulai Set Tryout ini{" "}
            <i className="i-ph-arrow-right-light ml-1 size-5" />
          </Button>
        </div>
        <div className="absolute bottom-0  h-44 w-full lg:h-96">
          <div className="relative h-full w-full ">
            <Image
              src="/illustrations/curve-and-two-books.svg"
              alt="Istirahat"
              className="absolute bottom-0 w-full bg-center object-cover"
              fill
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default IstirahatContainer;
