import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  useGetAllOnFinishedTryoutsQuery,
  useGetAllTryoutsQuery,
  useGetRegisteredTryoutsQuery,
} from "@/redux/api/tryoutApi";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTryoutOverviewContext } from "../context/TryoutOverviewContext";
import { TOProAside } from "../pro/TOProAside";
import { InformationBox } from "./InformationBox";
import TryoutStartButton from "./StartButton";
import { TOType } from "./TOAside";
import ToggleTOType from "./ToggleTOType";

export const InfoAside = () => {
  const { selectedTryout: selectedTO, tryoutHistoryList: TOHistoryList } =
    useTryoutOverviewContext();
  const router = useRouter();
  const { data: registeredTryoutsData } = useGetRegisteredTryoutsQuery();
  const [isRedirectPembahasan, setIsRedirectPembahasan] =
    useState<boolean>(false);

  const [selectedMode, setSelectedMode] = useState<TOType>("pro");
  const [isExpired, setIsExpired] = useState(false);
  const [startedPeriod, setStartedPeriod] = useState<string>("");
  const [isEvent, setIsEvent] = useState<boolean>(false);

  const { data: tryoutProData } = useGetAllTryoutsQuery({
    mode: selectedMode,
  });

  const { data: allFinishedTryoutData } = useGetAllOnFinishedTryoutsQuery({
    mode: "pro",
  });

  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (tryoutProData && selectedTO) {
      setStartedPeriod(
        tryoutProData.data.tryouts.find((item) => item.id === selectedTO)
          ?.start_date as string,
      );

      setIsFinished(
        tryoutProData.data.tryouts.find((item) => item.id === selectedTO)
          ?.submitted_at !== null,
      );

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

        if (tryoutProData?.data.tryouts[tryoutIndex].event_name) {
          setIsEvent(true);
        } else {
          setIsEvent(false);
        }
      }
    }
  }, [tryoutProData, selectedTO]);

  useEffect(() => {
    if (selectedTO && TOHistoryList) {
      const isTOPembahasanExist = TOHistoryList.data.tryouts.find(
        (item) => item.id === selectedTO,
      );
      setIsRedirectPembahasan(!!isTOPembahasanExist);
    }
  }, [TOHistoryList, selectedTO]);

  return (
    <>
      <div className="flex h-full flex-col justify-between gap-3 px-4 lg:px-0">
        <ToggleTOType
          setSelectedMode={(type: string) => {
            // router.replace(`${pathname}?type=${type}`);
            setSelectedMode(type as TOType);
          }}
          selectedMode={selectedMode}
        />
        <div className="grow">
          <TOProAside />
        </div>
        <div className="flex flex-col justify-end gap-3 py-2">
          {dayjs(startedPeriod).isAfter(dayjs()) ? (
            <InformationBox
              message={
                "Try Out belum dimulai. Pengerjaan Try Out dibuka pada " +
                dayjs(startedPeriod).format("DD MMMM YYYY HH:mm")
              }
            />
          ) : (
            <InformationBox
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
              isNotStartedPeriod={dayjs(startedPeriod).isAfter(dayjs())}
              isEvent={isEvent}
            />
          ) : (
            <Button
              onClick={() => router.push(`/try-out/riwayat/${selectedTO}`)}
              variant="bsPrimary"
            >
              Lihat Pembahasan{" "}
              <i className="i-ph-arrow-right-light ml-2 size-5" />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
