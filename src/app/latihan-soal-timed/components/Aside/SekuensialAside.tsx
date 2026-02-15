"use client";
import { InfoBox } from "@/app/components/InfoBox";
import { useGetLatihanSoalTimedQuery } from "@/redux/api/latihanSoalApi";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import { useLatihanContext } from "../../context/LatihanContext";
import Timer from "../Timer";
import { LatihanAsideContainer } from "./LatihanAsideContainer";
import { SoalTracker } from "./SoalTracker";

export const SekuensialAside = () => {
  const router = useRouter();
  const { timedSoalData, setTimedSoalData, timeLimit, isSuccessSummary, slug } =
    useLatihanContext();
  const { data, isSuccess } = useGetLatihanSoalTimedQuery();

  const [endTime, setEndTime] = useState<Date>();
  useEffect(() => {
    if (timeLimit && !!timedSoalData) {
      const start = new Date(timedSoalData.created_at);
      const end = new Date(start.getTime() + timeLimit * 1000);
      setEndTime(end);
    }
    if (!!data?.data) {
      if (data.data != null) {
        const { mode, id } = data.data;
        setTimedSoalData(data.data);
        router.replace(`/latihan-soal-timed/${mode}/${id}`, {
          scroll: false,
        });
      }
    }
  }, [timeLimit, data]);

  useEffect(() => {
    if (slug?.[0] && isSuccess && !timedSoalData) {
      redirect(`/latihan-soal-timed`);
    }
  }, [slug, isSuccess, data]);

  return (
    <MediaQuery minWidth={1024}>
      <LatihanAsideContainer>
        <div className="flex flex-col gap-3 px-5">
          {!!endTime && !isSuccessSummary && <Timer endTime={endTime} />}
          <InfoBox message="Kamu tidak dapat kembali ke pertanyaan sebelumnya" />
          <div className="rounded-xl bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center p-4 text-white">
            <p className="text-2xl font-bold">Daftar Soal</p>
            {!!timedSoalData ? (
              <SoalTracker
                currentNumber={data?.data?.current_number ?? 1}
                isSekuensial
                maxNumber={timedSoalData?.max_number || 20}
              />
            ) : (
              <div className="grid grid-cols-5 gap-3">
                {[...Array(20)].map((_, idx) => (
                  <div
                    key={idx}
                    className="skeleton size-10 shrink-0 rounded-full bg-surface-300 from-surface-300 via-surface-100 to-surface-300"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </LatihanAsideContainer>
    </MediaQuery>
  );
};
