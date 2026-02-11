"use client";
import { Button } from "@/components/ui/button";
import {
  useGetAllOnFinishedTryoutsQuery,
  useGetAllTryoutsQuery,
  useGetRegisteredTryoutsQuery,
  useGetTryoutDetailQuery,
} from "@/redux/api/tryoutApi";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import HasilTryoutModal from "../components/HasilTryoutModal";
import { InformationBox } from "../components/InformationBox";
import TOProInformations from "../components/Pro/TOProInformations";
import TOProTitle from "../components/Pro/TOProTitle";
import { SelectTO } from "../components/SelectTO";
import TryoutStartButton from "../components/StartButton";
import { SubjectInfo } from "../components/SubjectInfo";
import { useTryoutOverviewContext } from "../context/TryoutOverviewContext";

export const TOProOverview = () => {
  const { selectedTryout: selectedTO, setSelectedTryout: setSelectedTO } =
    useTryoutOverviewContext();
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [openHasilModal, setHasilModal] = useState<boolean>(false);
  const [isNotStartedPeriod, setIsNotStartedPeriod] = useState<boolean>(false);

  const [isEvent, setIsEvent] = useState<boolean>(false);

  const [isRedirectPembahasan, setIsRedirectPembahasan] =
    useState<boolean>(false);

  const { data: tryoutProData } = useGetAllTryoutsQuery(
    {
      mode: "pro",
    },
    {
      refetchOnFocus: true,
    },
  );

  const { data: allFinishedTryoutData } = useGetAllOnFinishedTryoutsQuery(
    {
      mode: "pro",
    },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    },
  );

  const { data: registeredTryoutsData } = useGetRegisteredTryoutsQuery();

  const { data: tryoutDetailData } = useGetTryoutDetailQuery(
    {
      id: selectedTO as string,
    },
    {
      skip: !selectedTO,
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    if (selectedTO && allFinishedTryoutData && tryoutProData) {
      const isFinished = allFinishedTryoutData?.data.tryouts.find(
        (item) => item.id === selectedTO,
      );
      setIsFinished(!!isFinished);

      const tryoutIndex = tryoutProData?.data.tryouts.findIndex(
        (item) => item.id === selectedTO,
      );

      if (tryoutIndex > -1) {
        if (
          dayjs(tryoutProData?.data.tryouts[tryoutIndex].end_date).isBefore(
            dayjs(),
          )
        ) {
          setIsExpired(true);
        } else {
          setIsExpired(false);
        }
        if (
          dayjs(tryoutProData?.data.tryouts[tryoutIndex].start_date).isAfter(
            dayjs(),
          )
        ) {
          setIsNotStartedPeriod(true);
        } else {
          setIsNotStartedPeriod(false);
        }

        if (tryoutProData?.data.tryouts[tryoutIndex].event_name) {
          setIsEvent(true);
        } else {
          setIsEvent(false);
        }
      }
    }
  }, [selectedTO, allFinishedTryoutData, tryoutProData]);

  // useEffect(() => {
  //   if (selectedTO && TOHistoryList) {
  //     const isTOPembahasanExist = TOHistoryList?.data?.tryouts.find(
  //       (item) => item.id === selectedTO,
  //     );

  //     setIsRedirectPembahasan(!!isTOPembahasanExist);
  //   }
  // }, [TOHistoryList, selectedTO]);

  return (
    <div className="flex flex-col gap-5 lg:pb-5">
      {tryoutDetailData && (
        <HasilTryoutModal
          selectedTO={selectedTO}
          open={openHasilModal}
          setOpen={setHasilModal}
          tryoutDetailData={tryoutDetailData}
        />
      )}
      <div className="flex flex-col gap-2 rounded-2xl bg-[#064E3B33]/20 px-4 py-3 lg:bg-transparent lg:p-0">
        <div className="relative flex flex-row gap-2">
          <TOProTitle data={tryoutDetailData} />
          <div className="hidden items-start lg:flex lg:min-w-fit lg:max-w-fit">
            {tryoutDetailData && (
              <TOProInformations
                total_sets_duration={tryoutDetailData.data.total_sets_durations}
                total_sets_questions={
                  tryoutDetailData.data.total_sets_questions
                }
              />
            )}
          </div>
          <Image
            className="absolute -right-4 -top-10 shrink-0 lg:hidden"
            src={"/seal.svg"}
            alt="seal"
            width={80}
            height={80}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 gap-y-4">
        {tryoutDetailData?.data.sets.map(
          ({ id, subject_name, total_questions, duration }) => {
            return (
              <div
                key={id}
                className="rounded-xl bg-[#064E3B33]/20 px-4 py-3 text-white lg:bg-gray-50 lg:text-gray-700 lg:shadow-inner-sm"
              >
                <SubjectInfo
                  subject={subject_name}
                  total={total_questions}
                  duration={duration}
                  color={"purple"}
                  isSubject={true}
                />
              </div>
            );
          },
        )}
      </div>
      <div className="relative -ml-5 mt-8 flex w-screen flex-col items-center border-t-[1px] border-t-white bg-white p-5 lg:hidden">
        <div className="absolute bottom-full aspect-[360/11] w-full">
          <div className="relative h-full w-full">
            <Image src="/curve.svg" alt="curve" fill />
          </div>
        </div>

        <p className="mb-2 mt-8 text-center font-bold text-gray-500">
          Pilih set try out
        </p>
        {!!tryoutProData && (
          <SelectTO
            currentTopic={selectedTO}
            setCurrentTopic={setSelectedTO}
            listData={tryoutProData.data.tryouts}
          />
        )}

        {isNotStartedPeriod ? (
          <InformationBox
            className="mb-3"
            message={
              "Try Out belum dimulai. Pengerjaan Try Out dibuka pada " +
              dayjs(tryoutDetailData?.data.started_at).format(
                "DD MMMM YYYY HH:mm",
              )
            }
          />
        ) : (
          <InformationBox
            className="mb-3"
            message={
              isFinished
                ? "Tryout sudah dikerjakan. Anda baru dapat melihat skor dan pembahasannya pada tanggal " +
                  dayjs(
                    allFinishedTryoutData?.data.tryouts.find(
                      (item) => item.id === selectedTO,
                    )?.end_date,
                  )
                    .add(3, "day")
                    .format("DD MMMM YYYY")
                : !isExpired
                  ? "Pastikan kamu punya waktu yang cukup untuk mengerjakan Try Out ini dengan baik!"
                  : "Try Out sudah berakhir. Tunggu Try Out selanjutnya!"
            }
          />
        )}

        {!isRedirectPembahasan ? (
          <TryoutStartButton
            isExpired={isExpired}
            isFinished={isFinished}
            registeredTryoutsData={registeredTryoutsData}
            selectedTO={selectedTO}
            tryoutProData={tryoutProData}
            isNotStartedPeriod={dayjs(
              tryoutDetailData?.data.started_at,
            ).isAfter(dayjs())}
            isEvent={isEvent}
          />
        ) : (
          <Button
            className="w-full"
            onClick={() => {
              setHasilModal(true);
            }}
            variant="bsPrimary"
          >
            Lihat Nilai Tryout
          </Button>
        )}
      </div>
    </div>
  );
};
