import { SoalQuestion, Subject } from "@/types";
import { PembahasanPanelState } from ".";
import { TopicFilter, YearRangeFilter } from "../components/interface";

export interface FilterState {
  subjects: Subject[];
  currentTopic: TopicFilter;
  yearRange: YearRangeFilter;
}

export interface QuestionState {
  question: SoalQuestion | null;
}
export interface LatihanSoalState extends FilterState {}

export interface LatihanSoalContextType extends LatihanSoalState {
  setSubjects: (subjects: Subject[]) => void;
  setCurrentTopic: (topic: TopicFilter) => void;
  setYearRange: (range: YearRangeFilter) => void;
  setSelectedSubject: (subjectType: Subject) => void;
  selectedSubject: Subject | undefined;
  soalData: SoalQuestion[];
  setSoalData: (data: SoalQuestion[]) => void;
  currentPembahasanPanel: PembahasanPanelState;
  setCurrentPembahasanPanel: (panel: PembahasanPanelState) => void;
  setSelectedTopicId: (topic: string) => void;
  selectedTopicId: string;
  defaultValueTabIndex: number;
  setDefaultValueTabIndex: (index: number) => void;
  activeSubjectIndex: number;
  setActiveSubjectIndex: (index: number) => void;
}
