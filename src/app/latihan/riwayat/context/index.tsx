import { useLazyGetSubjectsQuery } from "@/redux/api/latihanSoalApi";
import { Subject } from "@/types";
import React, {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  TopicFilter,
  YearRangeFilter,
} from "../../../latihan-soal/components/interface";
import { defaultState } from "../../../latihan-soal/context";

interface RiwayatLatihanSoalContextType {
  subjects: Subject[] | undefined;
  selectedSubject: Subject | undefined;
  yearRange: YearRangeFilter;
  currentTopic: TopicFilter;
  setCurrentTopic: React.Dispatch<React.SetStateAction<TopicFilter>>;
  setYearRange: React.Dispatch<React.SetStateAction<YearRangeFilter>>;
  setSelectedSubject: React.Dispatch<React.SetStateAction<Subject | undefined>>;
  selectedQuestionId: string;
  setSelectedQuestionId: React.Dispatch<React.SetStateAction<string>>;
  activeSubjectIndex: number;
  setActiveSubjectIndex: React.Dispatch<React.SetStateAction<number>>;
  isLoadingSubjects: boolean;
}

export const RiwayatLatihanSoalContext =
  createContext<RiwayatLatihanSoalContextType>(
    {} as RiwayatLatihanSoalContextType,
  );

type Props = {
  children: ReactNode;
};

export const RiwayatLatihanSoalProvider: React.FC<Props> = ({ children }) => {
  const [fetchSubjects] = useLazyGetSubjectsQuery();

  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");
  const [isLoadingSubjects, setIsLoadingSubjects] = useState<boolean>(true);

  const [subjects, setSubjects] = useState<Subject[]>();
  const [selectedSubject, setSelectedSubject] = useState<Subject>();

  const [yearRange, setYearRange] = useState<YearRangeFilter>(
    defaultState.yearRange,
  );

  const [currentTopic, setCurrentTopic] = useState<TopicFilter>(
    defaultState.currentTopic,
  );

  const [activeSubjectIndex, setActiveSubjectIndex] = useState<number>(0);

  useEffect(() => {
    setIsLoadingSubjects(true);
    fetchSubjects().then(({ isSuccess, data }) => {
      if (isSuccess) {
        setSubjects(data.data);
        setSelectedSubject(data.data[0]);
        // add default year range and current topic for the first fetch
        if (!Object.keys(yearRange).length) {
          const subjectYearRange = {} as YearRangeFilter;
          data?.data.forEach((subject) => {
            subjectYearRange[subject.slug] = [2009, 2024];
          });
          setYearRange(subjectYearRange);
        }

        if (!Object.keys(currentTopic).length) {
          const temp = {} as TopicFilter;
          data?.data.forEach((subject) => {
            temp[subject.slug] = "ALL";
          });
          setCurrentTopic(temp);
        }
      }
      setIsLoadingSubjects(false);
    });
  }, []);

  const value = useMemo(
    () => {
      const val: RiwayatLatihanSoalContextType = {
        subjects,
        selectedSubject,
        yearRange,
        currentTopic,
        setCurrentTopic,
        setYearRange,
        setSelectedSubject,
        selectedQuestionId,
        setSelectedQuestionId,
        activeSubjectIndex,
        setActiveSubjectIndex,
        isLoadingSubjects,
      };
      return val;
    },
    [
      subjects,
      selectedSubject,
      yearRange,
      currentTopic,
      selectedQuestionId,
      isLoadingSubjects,
    ] as const,
  );

  return (
    <RiwayatLatihanSoalContext.Provider value={value}>
      {children}
    </RiwayatLatihanSoalContext.Provider>
  );
};

export const useRiwayatLatihanSoalContext = () => {
  const context = React.useContext(RiwayatLatihanSoalContext);
  if (context === undefined) {
    throw Error("Error using Riwayat Latihan Soal Context");
  } else {
    return context;
  }
};
