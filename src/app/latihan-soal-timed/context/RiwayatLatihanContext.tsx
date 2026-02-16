"use client";
import { useGetLatihanSoalTimedAttemptQuery } from "@/redux/api/latihanSoalApi";
import { GetRiwayatLatihanSoalAttemptResponse } from "@/types";

import { useParams } from "next/navigation";
import React, { ReactNode, createContext, useMemo, useState } from "react";

interface RiwayatLatihanSoalContextType {
  riwayatAttempt: GetRiwayatLatihanSoalAttemptResponse;
  setCurrentQuestionId: React.Dispatch<React.SetStateAction<string>>;
  currentQuestionId: string;
}

const RiwayatLatihanContext = createContext<RiwayatLatihanSoalContextType>(
  {} as RiwayatLatihanSoalContextType,
);

export const RiwayatLatihanContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("");

  const { slug } = useParams();

  const { data: riwayatAttempt } = useGetLatihanSoalTimedAttemptQuery(
    {
      question_id: currentQuestionId,
      timed_question_id: slug?.[0] || "",
    },
    {
      skip: !currentQuestionId || !slug?.[0],
    },
  );

  const value = useMemo(
    () => ({
      riwayatAttempt: riwayatAttempt as GetRiwayatLatihanSoalAttemptResponse,
      setCurrentQuestionId,
      currentQuestionId,
    }),
    [currentQuestionId, riwayatAttempt],
  );

  return (
    <RiwayatLatihanContext.Provider value={value}>
      {children}
    </RiwayatLatihanContext.Provider>
  );
};

export const useRiwayatTimedLatihanContext = () => {
  const context = React.useContext(RiwayatLatihanContext);
  if (context === undefined) {
    throw Error("Error using Riwayat Latihan Soal Context");
  } else {
    return context;
  }
};
