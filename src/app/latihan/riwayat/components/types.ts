import { Subject } from "@/types";
import {
  TopicFilter,
  YearRangeFilter,
} from "../../../latihan-soal/components/interface";

export interface ISoalSelector {
  topicId: string;
  subjectId: string;
  subjectName: string;
}

export interface IFilters {
  subject_id: string;
  currentTopic: TopicFilter;
  setCurrentTopic: (value: TopicFilter) => void;
  yearRange: YearRangeFilter;
  setYearRange: (value: YearRangeFilter) => void;
  selectedSubject: Subject | undefined;
}
