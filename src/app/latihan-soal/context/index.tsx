"use client";
import { useGetSubjectsQuery } from "@/redux/api/latihanSoalApi";
import { SoalQuestion, Subject } from "@/types";
import { useParams } from "next/navigation";
import React, {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TopicFilter, YearRangeFilter } from "../components/interface";
import { LatihanSoalContextType, LatihanSoalState } from "./type";

interface CurrenTopicFilterType {
  [key: string]: string;
}

export const defaultState: LatihanSoalState = {
  subjects: [],
  currentTopic: {},
  yearRange: {},
};

export const LatihanSoalContext = createContext<
  LatihanSoalContextType | undefined
>(undefined);

type Props = {
  children: ReactNode;
};

export type PembahasanPanelState = {
  [key: string]: boolean;
};

export const LatihanSoalProvider: React.FC<Props> = ({ children }) => {
  const { data: subjectData } = useGetSubjectsQuery();

  const { slug } = useParams();

  const [subjects, setSubjects] = useState<Subject[]>(defaultState.subjects);
  const [currentTopic, setCurrentTopic] = useState<TopicFilter>(
    defaultState.currentTopic,
  );

  const [defaultValueTabIndex, setDefaultValueTabIndex] = useState<number>(0);

  const [activeSubjectIndex, setActiveSubjectIndex] = useState<number>(0); // for mobile view

  const [currentPembahasanPanel, setCurrentPembahasanPanel] =
    useState<PembahasanPanelState>({} as PembahasanPanelState);

  const [yearRange, setYearRange] = useState<YearRangeFilter>(
    defaultState.yearRange,
  );
  const [selectedTopicId, setSelectedTopicId] = useState<string>("");
  const [soalData, setSoalData] = useState<SoalQuestion[]>([]);

  const [selectedSubject, setSelectedSubject] = useState<Subject>();

  // useEffect(() => {
  //   if (soalData.length > 0 ) {
  //     console.log('masuk siniii')
  //     const temp = {} as PembahasanPanelState;
  //     soalData.forEach((item) => {
  //       temp[item.id] = false;
  //     });
  //     setCurrentPembahasanPanel(temp);
  //   }
  // }, [soalData]);

  useEffect(() => {
    if (subjectData) {
      setSubjects(subjectData.data);
    }

    if (!Object.keys(yearRange).length) {
      const subjectYearRange = {} as YearRangeFilter;
      subjectData?.data.forEach((subject) => {
        subjectYearRange[subject.slug] = [2009, 2024];
      });
      setYearRange(subjectYearRange);
    }

    if (!Object.keys(currentTopic).length) {
      const temp = {} as CurrenTopicFilterType;
      subjectData?.data.forEach((subject) => {
        temp[subject.slug] = "ALL";
      });
      setCurrentTopic(temp);
    }
  }, [subjectData]);

  useEffect(() => {
    if (slug?.[0] && subjects.length > 0) {
      const subject = subjects.findIndex((item) => item.slug === slug?.[0]);
      setSelectedSubject(subjects[subject]);
      setActiveSubjectIndex(subject);
      
      // Check if there's a topic_id stored in sessionStorage for this subject
      if (typeof window !== "undefined") {
        const storedTopicId = sessionStorage.getItem(
          `latihan-soal-topic-${slug[0]}`,
        );
        if (storedTopicId && storedTopicId !== "ALL") {
          // Set the topic filter for this subject
          setCurrentTopic((prev) => ({
            ...prev,
            [slug[0]]: storedTopicId,
          }));
          setSelectedTopicId(storedTopicId);
          // Clear the stored topic_id after using it
          sessionStorage.removeItem(`latihan-soal-topic-${slug[0]}`);
        }
      }
    }
  }, [slug?.[0], subjects.length]);

  const value = useMemo(
    () => ({
      subjects,
      setSubjects,
      currentTopic,
      setCurrentTopic,
      yearRange,
      setYearRange,
      selectedSubject,
      setSelectedSubject,
      soalData,
      setSoalData,
      currentPembahasanPanel,
      setCurrentPembahasanPanel,
      selectedTopicId,
      setSelectedTopicId,
      defaultValueTabIndex,
      setDefaultValueTabIndex,
      activeSubjectIndex,
      setActiveSubjectIndex,
    }),
    [
      yearRange,
      selectedSubject,
      currentTopic,
      subjects,
      soalData,
      currentPembahasanPanel,
      selectedTopicId,
      defaultValueTabIndex,
      activeSubjectIndex,
    ],
  );

  return (
    <LatihanSoalContext.Provider value={value}>
      {children}
    </LatihanSoalContext.Provider>
  );
};

export const useLatihanSoalContext = () => {
  const context = React.useContext(LatihanSoalContext);
  if (context === undefined) {
    throw Error("Error using Latihan Soal Context");
  } else {
    return context;
  }
};
