"use client";
import PembahasanContainer from "@/app/latihan-soal/components/PembahasanContainer";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  useGetLatihanSoalDetailQuery,
  useGetPembahasanQuery,
  useGetRiwayatTimedLatihanSoalByIdQuery,
  useGetSubjectsQuery,
} from "@/redux/api/latihanSoalApi";
import dayjs from "dayjs";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MediaQuery from "react-responsive";
import { QuestionContent } from "../../components/Question/QuestionContent";

import { useRiwayatTimedLatihanContext } from "../../context/RiwayatLatihanContext";

interface RiwayatTimedSoalContainerProps {
  timedQuestionId: string;
}
const RiwayatTimedSoalContainer = ({
  timedQuestionId,
}: RiwayatTimedSoalContainerProps) => {
  const { riwayatAttempt, currentQuestionId, setCurrentQuestionId } =
    useRiwayatTimedLatihanContext();

  const ref = useRef<HTMLDivElement>(null);

  const [questionIndex, setQuestionIndex] = useState({
    subjectId: "",
    idx: 0,
    nextSubjectId: "",
    prevSubjectId: "",
  });

  const [questionIdStop, setQuestionIdStop] = useState<{
    firstQuestionId: string;
    lastQuestionId: string;
  }>();

  const { data: subjects } = useGetSubjectsQuery();

  const { data: riwayatTimedLatihanSoal } =
    useGetRiwayatTimedLatihanSoalByIdQuery(
      {
        id: timedQuestionId,
      },
      {
        skip: !timedQuestionId,
      },
    );

  const { data } = useGetLatihanSoalDetailQuery(
    {
      id: currentQuestionId,
    },
    {
      skip: !currentQuestionId,
    },
  );

  const { data: pembahasanData } = useGetPembahasanQuery(
    {
      question_id: currentQuestionId,
      attempt_id: riwayatAttempt?.data?.id ?? undefined,
    },
    {
      skip: !currentQuestionId && !riwayatAttempt?.data?.id,
    },
  );

  useEffect(() => {
    if (currentQuestionId && riwayatTimedLatihanSoal?.data && riwayatAttempt) {
      const subjectId = riwayatTimedLatihanSoal?.data.subject_ids.find(
        (subjectId) =>
          riwayatTimedLatihanSoal?.data.questions[subjectId].find(
            ({ question_id }) => question_id == currentQuestionId,
          ),
      ) as string;
      const questionIndex = riwayatTimedLatihanSoal?.data.questions[
        subjectId
      ].findIndex(
        ({ question_id }) => question_id == currentQuestionId,
      ) as number;
      if (
        questionIndex ==
        riwayatTimedLatihanSoal?.data.questions[subjectId].length - 1
      ) {
        const nextSubjectId =
          riwayatTimedLatihanSoal?.data.subject_ids[
            riwayatTimedLatihanSoal?.data.subject_ids.findIndex(
              (subjectId) => subjectId == subjectId,
            ) + 1
          ];
        setQuestionIndex({
          subjectId,
          idx: questionIndex,
          nextSubjectId,
          prevSubjectId: subjectId,
        });
      } else if (questionIndex == 0) {
        const prevSubjectId =
          riwayatTimedLatihanSoal?.data.subject_ids[
            riwayatTimedLatihanSoal?.data.subject_ids.findIndex(
              (subId) => subId == subjectId,
            ) - 1
          ];
        setQuestionIndex({
          subjectId,
          idx: questionIndex,
          nextSubjectId: subjectId,
          prevSubjectId,
        });
      } else {
        setQuestionIndex({
          subjectId,
          idx: questionIndex,
          nextSubjectId: subjectId,
          prevSubjectId: subjectId,
        });
      }
    }
  }, [currentQuestionId, riwayatTimedLatihanSoal?.data, riwayatAttempt]);

  useEffect(() => {
    if (riwayatTimedLatihanSoal?.data) {
      const subjectIds = Object.keys(riwayatTimedLatihanSoal?.data.questions);
      const lastSubjectId = subjectIds[subjectIds.length - 1];
      const firstQuestionId =
        riwayatTimedLatihanSoal?.data.questions[subjectIds[0]][0].question_id;
      const lastQuestionId =
        riwayatTimedLatihanSoal?.data.questions[lastSubjectId][
          riwayatTimedLatihanSoal?.data.questions[lastSubjectId].length - 1
        ].question_id;

      setQuestionIdStop({
        firstQuestionId,
        lastQuestionId,
      });
    }
  }, [riwayatTimedLatihanSoal?.data]);

  const handleScrollToQuestion = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNext = () => {
    if (questionIndex.nextSubjectId !== questionIndex.subjectId) {
      const nextSubject = questionIndex.nextSubjectId;
      const nextQuestion =
        riwayatTimedLatihanSoal?.data.questions[nextSubject][0];
      setCurrentQuestionId(nextQuestion?.question_id as string);
    } else {
      const nextQuestion =
        riwayatTimedLatihanSoal?.data.questions[questionIndex.subjectId][
          questionIndex.idx + 1
        ];
      setCurrentQuestionId(nextQuestion?.question_id as string);
    }
    handleScrollToQuestion();
  };

  const handlePrev = () => {
    if (questionIndex.prevSubjectId !== questionIndex.subjectId) {
      const prevSubject = questionIndex.prevSubjectId;
      const prevQuestion =
        riwayatTimedLatihanSoal?.data.questions[prevSubject][
          riwayatTimedLatihanSoal?.data.questions[prevSubject].length - 1
        ];
      setCurrentQuestionId(prevQuestion?.question_id as string);
    } else {
      const prevQuestion =
        riwayatTimedLatihanSoal?.data.questions[questionIndex.subjectId][
          questionIndex.idx - 1
        ];
      setCurrentQuestionId(prevQuestion?.question_id as string);
    }
    handleScrollToQuestion();
  };

  return data?.data ? (
    <div ref={ref} className="w-full py-5 lg:px-10 ">
      <MediaQuery maxWidth={1023}>
        <div className="px-5">
          <div className="mb-5 flex w-full items-center justify-between rounded-lg bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center p-4 text-sm  text-white">
            <h5 className="font-700 text-white">
              {" "}
              {riwayatTimedLatihanSoal?.data.label} | No {questionIndex.idx + 1}
            </h5>
            <h5 className="font-700 text-white">
              {dayjs(riwayatAttempt?.data?.timestamp).format("DD MMM YYYY")}
            </h5>
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild className="sticky left-0 top-20 z-20">
            <button className="h-10 w-7 rounded-r-full bg-emerald-400 font-700 text-white">
              <ChevronRight />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="overflow-auto bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center"
          >
            <h4 className="font-700 text-white">
              {riwayatTimedLatihanSoal?.data.label}
            </h4>
            <div className="mt-5">
              {riwayatTimedLatihanSoal &&
                riwayatTimedLatihanSoal.data.subject_ids.map((subjectId) => {
                  const label = subjects?.data.find(({ id }) => id == subjectId)
                    ?.alternate_name as string;
                  const currentSubjectQuestionList =
                    riwayatTimedLatihanSoal.data.questions[subjectId];
                  const length = Object.keys(currentSubjectQuestionList).length;
                  const alreadyAnswered =
                    riwayatTimedLatihanSoal.data.questions[subjectId].filter(
                      (question) => question.is_correct,
                    ).length;
                  return (
                    <div key={subjectId} className="mt-5">
                      <div className="flex items-center justify-between gap-2 font-600 text-white">
                        <p className=" mb-0">{label}</p>
                        <h6 className="text-white">
                          {alreadyAnswered}/{length}
                        </h6>
                      </div>
                      <div className="mt-1 grid grid-cols-5 gap-1 rounded-lg bg-emerald-900/20 p-1 shadow-inner">
                        {riwayatTimedLatihanSoal.data.questions[subjectId].map(
                          ({ is_correct, question_id }, idx) => {
                            const isCurrentNumber = data.data.id == question_id;
                            return (
                              <SheetClose
                                style={
                                  is_correct
                                    ? {
                                        boxShadow:
                                          "0px 1px 2px 0px rgba(0, 0, 0, 0.05), 0px 1px 1px 0px rgba(255, 255, 255, 0.2) inset",
                                        background: "white",
                                      }
                                    : {}
                                }
                                className={cn(
                                  "flex items-center justify-center rounded-md font-600",
                                  !is_correct && "bg-rose-500 text-white",
                                  isCurrentNumber &&
                                    "!bg-emerald-400 text-white",
                                )}
                                key={question_id}
                              >
                                <button
                                  onClick={() => {
                                    setCurrentQuestionId(question_id);
                                  }}
                                >
                                  {idx + 1}
                                </button>
                              </SheetClose>
                            );
                          },
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </SheetContent>
        </Sheet>
      </MediaQuery>
      <div className="px-5 lg:px-10">
        {!riwayatAttempt?.data?.subject && (
          <h1 className="hidden pb-3 text-3xl font-700 text-content-100 lg:block">
            {data.data.subject_name}
          </h1>
        )}
        <QuestionContent
          content={data.data.content}
          options={data.data.options.map(({ id, content, key }) => ({
            id,
            content,
            key,
          }))}
          attempt={riwayatAttempt?.data}
          topic={data.data.topic}
          subject={riwayatAttempt?.data?.subject}
          currentNumber={riwayatAttempt?.data?.current_number}
          timedQuestionId={riwayatAttempt?.data?.timed_questions_id}
          pembahasanData={pembahasanData?.data}
        />
        <MediaQuery maxWidth={1023}>
          <div className="flex w-full gap-x-2 pt-5 lg:hidden">
            <Button
              disabled={currentQuestionId == questionIdStop?.firstQuestionId}
              onClick={() => {
                handlePrev();
              }}
              variant="bsPrimary"
              className="flex-grow"
            >
              <i className="i-ph-arrow-left size-5 text-white" />
            </Button>
            <Button
              disabled={currentQuestionId == questionIdStop?.lastQuestionId}
              onClick={() => {
                handleNext();
              }}
              variant="bsPrimary"
              className="flex-grow"
            >
              <i className="i-ph-arrow-right size-5 text-white" />
            </Button>
          </div>
        </MediaQuery>
        <MediaQuery minWidth={1024}>
          <div className="flex gap-x-4 pt-5">
            <button
              disabled={currentQuestionId == questionIdStop?.firstQuestionId}
              onClick={() => {
                handlePrev();
              }}
              className={cn(
                "hidden h-[36px] w-[36px] items-center justify-center rounded-full bg-gray-100 lg:flex",
                !(questionIdStop?.firstQuestionId == currentQuestionId) &&
                  "group hover:bg-emerald-600",
              )}
            >
              <div className="i-ph-arrow-left-bold h-[16px] w-[16px] text-gray-500 group-hover:text-white"></div>
            </button>
            <button
              disabled={currentQuestionId == questionIdStop?.lastQuestionId}
              onClick={() => {
                handleNext();
              }}
              className={cn(
                "hidden h-[36px] w-[36px] items-center justify-center rounded-full bg-gray-100 lg:flex",
                !(questionIdStop?.lastQuestionId == currentQuestionId) &&
                  "group hover:bg-emerald-600",
              )}
            >
              <div className="i-ph-arrow-right-bold h-[16px] w-[16px] text-gray-500 group-hover:text-white"></div>
            </button>
          </div>
        </MediaQuery>
        {pembahasanData?.data && (
          <div className="pt-10">
            <PembahasanContainer
              data={pembahasanData?.data}
              attemptId={riwayatAttempt?.data?.id}
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default RiwayatTimedSoalContainer;
