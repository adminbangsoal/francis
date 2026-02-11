"use client";
import SearchInput from "@/app/latihan-soal/components/SearchInput";
import { Button } from "@/components/ui/button";
import { SelectFilter } from "@/components/ui/select-filter";
import { validateUUID } from "@/lib/utils";
import {
  useGetSubjectsQuery,
  useGetTopicsBySubjectQuery,
} from "@/redux/api/latihanSoalApi";
import { CatatanParamsI } from "@/types/catatan";
import { Fragment, useEffect } from "react";
import { FILTERS_TO_CHECK, NOTE_TYPE_OPTIONS } from "../upload/constants";

interface FiltersI {
  queryFilters: CatatanParamsI;
  setQueryFilters: (value: CatatanParamsI) => void;
}
export default function Filters({ queryFilters, setQueryFilters }: FiltersI) {
  const { data: subjectList } = useGetSubjectsQuery();
  const { data: topicList } = useGetTopicsBySubjectQuery({
    subject_id: queryFilters.subject_id ?? "",
  });

  const handleSubjectChange = (value: string) => {
    if ((value != "" && validateUUID(value)) || !value)
      setQueryFilters({ ...queryFilters, subject_id: value });
  };
  const handleTopicChange = (value: string) => {
    if ((value != "" && validateUUID(value)) || !value)
      setQueryFilters({ ...queryFilters, topic_id: value });
  };
  const handleNoteTypeChange = (value: string) => {
    setQueryFilters({ ...queryFilters, note_type: value });
  };
  const handleSearchChange = (value: string) => {
    setQueryFilters({ ...queryFilters, query: value });
  };

  const clearFilters = () => {
    setQueryFilters({
      ...queryFilters,
      subject_id: "",
      topic_id: "",
      note_type: "",
      query: "",
    });
  };

  useEffect(() => {
    if (topicList?.data && queryFilters.subject_id != "") {
      const subjectHasTopic = topicList?.data.some(
        ({ id }) => id == queryFilters.topic_id,
      );
      if (!subjectHasTopic) {
        setQueryFilters({ ...queryFilters, topic_id: "" });
      }
    }
  }, [topicList]);

  const hasQueryFilters = FILTERS_TO_CHECK.some(
    (key) => queryFilters[key] !== "",
  );

  return (
    <div className="mb-6 flex flex-col items-start justify-start gap-2 text-content-300 lg:flex-row lg:items-center lg:gap-3">
      <SearchInput
        style="lg:w-1/3 w-full"
        placeholder="Cari catatan"
        value={queryFilters.query as string}
        setValue={handleSearchChange}
      />
      <Fragment>
        <SelectFilter
          value={queryFilters.subject_id as string}
          options={
            subjectList?.data.map(({ id, alternate_name }) => ({
              name: alternate_name,
              value: id,
            })) ?? []
          }
          onChange={handleSubjectChange}
          placeholder="Subjek"
        />
        <SelectFilter
          value={queryFilters.topic_id as string}
          options={
            topicList?.data.map(({ id, name }) => ({
              name,
              value: id,
            })) ?? []
          }
          placeholder="Topik"
          onChange={handleTopicChange}
        />
        <SelectFilter
          value={queryFilters.note_type as string}
          options={NOTE_TYPE_OPTIONS}
          placeholder="Tipe"
          onChange={handleNoteTypeChange}
        />
      </Fragment>
      {hasQueryFilters && (
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={clearFilters}
          className="self-end rounded-full"
        >
          clear <i className="i-ph-x" />
        </Button>
      )}
      <div className="h-0.5 grow rounded-full bg-surface-200" />
    </div>
  );
}
