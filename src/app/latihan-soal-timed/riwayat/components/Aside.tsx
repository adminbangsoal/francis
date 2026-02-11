"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  useGetRiwayatTimedLatihanSoalByIdQuery,
  useGetSubjectsQuery,
} from "@/redux/api/latihanSoalApi";
import { Subject } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import { LatihanAsideContainer } from "../../components/Aside/LatihanAsideContainer";
import { useRiwayatTimedLatihanContext } from "../../context/RiwayatLatihanContext";

interface RiwayatTimedSoalAsideProps {
  timedQuestionId: string;
}

const RiwayatTimedSoalAsideContainer = ({
  timedQuestionId,
}: RiwayatTimedSoalAsideProps) => {
  const [subjectMappingTimedQuestion, setSubjectMappingTimedQuestion] =
    useState<Subject[]>([]);

  const { data: subjectData, isSuccess: isSuccessFetchSubject } =
    useGetSubjectsQuery();

  const { data, isSuccess } = useGetRiwayatTimedLatihanSoalByIdQuery(
    {
      id: timedQuestionId,
    },
    {
      skip: !timedQuestionId,
    },
  );

  const { setCurrentQuestionId, currentQuestionId } =
    useRiwayatTimedLatihanContext();

  useEffect(() => {
    if (data?.data) {
      const { subject_ids, questions } = data.data;
      setCurrentQuestionId(questions[subject_ids[0]][0].question_id);
    }
  }, [data?.data]);

  useEffect(() => {
    if (isSuccess && isSuccessFetchSubject && data?.data) {
      const subjects: Subject[] = [];

      for (let i = 0; i < data.data.subject_ids.length; i++) {
        const subject = subjectData?.data.find(
          (subject) => subject.id === data.data.subject_ids[i],
        );
        if (subject) {
          subjects.push(subject);
        }
      }
      setSubjectMappingTimedQuestion(subjects);
    }
  }, [isSuccess, isSuccessFetchSubject]);

  return (
    <MediaQuery minWidth={1023}>
      <LatihanAsideContainer>
        <div className="px-5 py-2 font-quicksand">
          {data?.data && (
            <>
              <div>
                <h5 className="text-xl font-700 text-gray-950">
                  Hasil Latihan
                </h5>
                <h5 className="font-700 text-gray-500">{data.data.label}</h5>
              </div>
              <div className="mt-4 rounded-xl bg-white p-3">
                <h5 className="text-lg font-700 text-[#4B5563]">Daftar Soal</h5>
                <div className="mt-4 grid grid-cols-5 gap-1">
                  {data.data.mode == "sequential" &&
                    data.data.questions[
                      Object.keys(data.data.questions)[0]
                    ].map(({ question_id, is_correct }, idx) => {
                      const isActive = question_id === currentQuestionId;
                      return (
                        <button
                          key={question_id}
                          onClick={() => {
                            setCurrentQuestionId(question_id);
                          }}
                          className={cn(
                            "flex cursor-pointer items-center justify-center rounded-lg py-2 font-600",
                            is_correct ? "bg-emerald-200" : "bg-rose-200",
                            isActive &&
                              is_correct &&
                              "border-2 border-emerald-500",
                            isActive &&
                              !is_correct &&
                              "border-2 border-rose-500",
                          )}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                </div>
                {data.data.mode == "classic" &&
                  subjectMappingTimedQuestion.length > 0 && (
                    <Accordion
                      type="single"
                      defaultValue={subjectMappingTimedQuestion[0].id}
                      onValueChange={(value) => {
                        setCurrentQuestionId(
                          data.data.questions[value][0].question_id,
                        );
                      }}
                    >
                      {subjectMappingTimedQuestion.map((subject, idx) => {
                        return (
                          <AccordionItem
                            key={subject.id}
                            value={subject.id}
                            className="border-none bg-gray-50 "
                          >
                            <AccordionTrigger
                              className={cn(
                                "px-2 text-left no-underline hover:no-underline",
                                idx == 0 && "rounded-t-lg",
                                idx == subjectMappingTimedQuestion.length - 1 &&
                                  "rounded-b-lg",
                              )}
                            >
                              <div className="flex items-center gap-x-2">
                                <div className="h-[24px] w-[24px]">
                                  <Image
                                    src={subject.icon}
                                    alt="subject icon"
                                    width={24}
                                    height={24}
                                  />
                                </div>
                                <h6 className="text-base font-700 text-[#6B7280]">
                                  {subject.alternate_name}
                                </h6>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="grid grid-cols-5 gap-1 bg-gray-50 px-2">
                                {data.data.questions[subject.id].map(
                                  ({ question_id, is_correct }, idx) => {
                                    const isActive =
                                      question_id === currentQuestionId;
                                    return (
                                      <button
                                        key={question_id}
                                        onClick={() => {
                                          setCurrentQuestionId(question_id);
                                        }}
                                        className={cn(
                                          "flex h-9 w-11 cursor-pointer items-center justify-center rounded py-2 font-600",
                                          is_correct
                                            ? "bg-emerald-200"
                                            : "bg-rose-200",
                                          isActive &&
                                            is_correct &&
                                            "border-2 border-emerald-500",
                                          isActive &&
                                            !is_correct &&
                                            "border-2 border-rose-500",
                                        )}
                                      >
                                        {idx + 1}
                                      </button>
                                    );
                                  },
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  )}
              </div>
            </>
          )}
        </div>
      </LatihanAsideContainer>
    </MediaQuery>
  );
};

export default RiwayatTimedSoalAsideContainer;
