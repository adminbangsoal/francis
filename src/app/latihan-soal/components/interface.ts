export interface SoalSelectorI {
  subject_id: string;
  topic_id?: string;
  subjectSlug: string;
  min_year?: number;
  max_year?: number;
  filtersOpened?: boolean; // for mobile only, if filter is opened then we skip the query
}

export type YearRangeFilter = Record<string, [number, number]>;

export type TopicFilter = Record<string, string>;

export interface FiltersI extends SoalSelectorI {
  currentTopic: TopicFilter;
  setCurrentTopic: (value: TopicFilter) => void;
  yearRange: YearRangeFilter;
  setYearRange: (value: YearRangeFilter) => void;
  isMobile?: boolean;
}
