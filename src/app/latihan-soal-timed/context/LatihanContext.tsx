"use client";
import { LatihanSoalState } from "@/app/latihan-soal/context/type";
import {
  useGetTimedLatihanSoalSummaryQuery,
  useSubmitLatihanSoalTimedMutation,
} from "@/redux/api/latihanSoalApi";
import { LatihanSoalTimed, Subject, Topic } from "@/types";
import { useParams, usePathname } from "next/navigation";
import React, {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface LatihanContextType {
  slug: string[];
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  soalIds: string[];
  setSoalIds: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSubject: Subject;
  setSelectedSubject: React.Dispatch<React.SetStateAction<Subject>>;
  topics?: Topic[];
  timedSoalData: LatihanSoalTimed | null;
  setTimedSoalData: React.Dispatch<
    React.SetStateAction<LatihanSoalTimed | null>
  >;
  timeLimit: number | null;
  setTimeLimit: React.Dispatch<React.SetStateAction<number | null>>;
  handleSubmitLatihan: () => void;
  openConfirmModal: boolean;
  setOpenConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  openSummary: boolean;
  setOpenSummary: React.Dispatch<React.SetStateAction<boolean>>;
  isSuccessSummary: boolean;
  isRiwayatPage: boolean;
  isSubmitSuccess: boolean;
}

export const defaultState: Omit<LatihanSoalState, "yearRange"> = {
  subjects: [],
  currentTopic: {
    PU: "Semua",
    PKPM: "Semua",
    PPU: "Semua",
    PBM: "Semua",
    "Bahasa Inggris": "Semua",
    "Bahasa Indonesia": "Semua",
  },
};
export const LatihanContext = createContext<LatihanContextType>(
  {} as LatihanContextType,
);

type Props = {
  children: ReactNode;
};

export const LatihanProvider: FC<Props> = ({ children }) => {
  const { slug } = useParams();
  const pathName = usePathname();

  const isRiwayatPage = pathName.includes("riwayat");

  const [subjects, setSubjects] = useState<Subject[]>(defaultState.subjects);
  const [soalIds, setSoalIds] = useState<string[]>([]);

  const { isSuccess: isSuccessSummary } = useGetTimedLatihanSoalSummaryQuery(
    {
      timed_question_id: slug?.[0] || "",
    },
    {
      skip: !slug?.[0],
    },
  );

  const [openSummary, setOpenSummary] = useState<boolean>(false);

  const [selectedSubject, setSelectedSubject] = useState<Subject>(
    defaultState.subjects[0],
  );
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [timedSoalData, setTimedSoalData] = useState<LatihanSoalTimed | null>(
    null,
  );
  const [timeLimit, setTimeLimit] = useState<number | null>(null);
  const [submitLatihan, { isSuccess: isSubmitSuccess }] =
    useSubmitLatihanSoalTimedMutation();

  const handleSubmitLatihan = async () => {
    if (isSubmitSuccess) return;
    await submitLatihan({ timed_question_id: slug?.[0] || "" });
  };

  useEffect(() => {
    if (isSubmitSuccess) {
      setOpenConfirmModal(false);
    }
  }, [isSubmitSuccess]);

  useEffect(() => {
    if (isSubmitSuccess && !openConfirmModal) {
      setOpenSummary(true);
    }
  }, [isSubmitSuccess, openConfirmModal]);

  useEffect(() => {
    if (isSuccessSummary) {
      setOpenSummary(true);
    }
  }, [isSuccessSummary]);

  const value = useMemo(
    () => ({
      slug: slug as string[],
      subjects,
      setSubjects,
      timedSoalData,
      setTimedSoalData,
      timeLimit,
      setTimeLimit,
      selectedSubject,
      setSelectedSubject,
      handleSubmitLatihan,
      soalIds,
      setSoalIds,
      setOpenConfirmModal,
      openConfirmModal,
      openSummary,
      setOpenSummary,
      isSuccessSummary,
      isRiwayatPage,
      isSubmitSuccess,
    }),
    [
      subjects,
      slug,
      timedSoalData,
      timeLimit,
      selectedSubject,
      soalIds,
      openConfirmModal,
      openSummary,
      isSuccessSummary,
    ],
  );
  return (
    <LatihanContext.Provider value={value}>{children}</LatihanContext.Provider>
  );
};

export const useLatihanContext = () => {
  const context = React.useContext(LatihanContext);
  if (context === undefined) {
    throw Error("Error using Riwayat Latihan Soal Context");
  } else {
    return context;
  }
};
