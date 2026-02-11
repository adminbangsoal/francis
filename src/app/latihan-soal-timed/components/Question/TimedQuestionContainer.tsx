"use client";
import PembahasanContainer from "@/app/latihan-soal/components/PembahasanContainer";
import {
  useAttemptLatihanSoalTimedMutation,
  useGetAllAttemptedCurrentQuestionsQuery,
  useGetLatihanSoalSekuensialQuery,
  useGetPembahasanQuery,
  useNextLatihanSoalSekuensialMutation,
} from "@/redux/api/latihanSoalApi";
import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import { useLatihanContext } from "../../context/LatihanContext";
import { QuestionContent } from "./QuestionContent";

import { cn } from "@/lib/utils";
import Timer from "../Timer";
import { QuestionNavigator } from "./QuestionNavigator";

const TimedQuestionContainer = () => {
  const { data, refetch, isLoading } = useGetLatihanSoalSekuensialQuery();
  const { timeLimit, setTimeLimit, slug, timedSoalData, handleSubmitLatihan } =
    useLatihanContext();

  const [fetchNextQuestion, { data: nextQuestionData }] =
    useNextLatihanSoalSekuensialMutation();

  const [attemptQuestion] = useAttemptLatihanSoalTimedMutation();

  const { data: riwayatTimedLatihanSoal } =
    useGetAllAttemptedCurrentQuestionsQuery(
      {
        id: slug[0],
      },
      {
        skip: !slug?.[0],
      },
    );

  const [endTime, setEndTime] = useState<Date>();

  const { data: pembahasanData } = useGetPembahasanQuery(
    {
      question_id: slug[1],
      attempt_id: data?.data?.attempt?.id || "",
    },
    {
      skip: slug.slice(-1)[0] !== "feedback" || !data?.data?.attempt?.id,
    },
  );

  const handleAttemptQuestion = async (
    choice_id: string,
    answer_history: string,
  ) => {
    await attemptQuestion({
      timed_question_id: slug[0] || data?.data.timed_question_id || "",
      question_id: data?.data.content.id || "",
      choice_id,
      answer_history,
      answers: [],
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!!data && !timeLimit) {
      if (!!data.data) {
        setTimeLimit(data.data.time_limit);
      }
    }
    if (!!nextQuestionData?.data?.next_question_id) {
      refetch();
    }
  }, [nextQuestionData, timeLimit, data]);

  useEffect(() => {
    if (timeLimit && !!timedSoalData) {
      const start = new Date(timedSoalData.created_at);
      const end = new Date(start.getTime() + timeLimit * 1000);
      setEndTime(end);
    }
  }, [timeLimit, data]);

  return isLoading ? (
    <div className="">
      <div>
        <div className="skeleton relative mt-2 h-48 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="skeleton relative mt-2 h-10 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"
          />
        ))}
      </div>
    </div>
  ) : (
    !!data?.data && (
      <div className="flex flex-col gap-3 px-5 py-5 md:px-10">
        <MediaQuery maxWidth={1023}>
          <div className="mb-5  rounded-lg bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center p-4 text-sm font-700 text-white">
            <div className="flex w-full items-center justify-between">
              <div>No {data.data.current_number}</div>
              <div>{endTime && <Timer endTime={endTime} />}</div>
            </div>
            <div className="mt-1 grid grid-cols-5 gap-1 rounded-lg bg-emerald-900/20 p-1 shadow-inner">
              {riwayatTimedLatihanSoal &&
                riwayatTimedLatihanSoal.data.subject_ids.map((subjectId) => (
                  <>
                    {riwayatTimedLatihanSoal.data.questions[subjectId].map(
                      ({ question_id, is_attempted }, idx) => {
                        const isCurrentNumber =
                          idx + 1 == data.data.current_number;
                        return (
                          <button
                            key={question_id}
                            style={
                              is_attempted
                                ? {
                                    boxShadow:
                                      "0px 1px 2px 0px rgba(0, 0, 0, 0.05), 0px 1px 1px 0px rgba(255, 255, 255, 0.2) inset",
                                    background: "white",
                                  }
                                : {}
                            }
                            className={cn(
                              "flex items-center justify-center rounded-md font-600",
                              !is_attempted &&
                                data.data.current_number > idx + 1 &&
                                "bg-rose-500 text-white",
                              (isCurrentNumber || is_attempted) &&
                                "!bg-emerald-400 text-white",
                              isCurrentNumber && "!bg-white text-black",
                            )}
                          >
                            {idx + 1}
                          </button>
                        );
                      },
                    )}
                  </>
                ))}
            </div>
          </div>
        </MediaQuery>
        <QuestionContent
          content={data.data.content.content}
          options={data.data.options}
          attempt={data.data.attempt}
          handleAnswerQuestion={handleAttemptQuestion}
          pembahasanData={pembahasanData?.data}
          topic={data.data.content.topic}
          subject={data.data.content.subject}
          currentNumber={data.data.current_number}
          timedQuestionId={data.data.timed_question_id}
        />
        {!!pembahasanData && (
          <div className="pt-6">
            <PembahasanContainer data={pembahasanData.data} attemptId={""} />
          </div>
        )}
        <QuestionNavigator
          hasNext={
            data?.data.current_number < (timedSoalData?.max_number || 20)
          }
          handleNext={() => {
            fetchNextQuestion({
              sequential_id: data.data.timed_question_id,
            });
          }}
          handleSubmit={handleSubmitLatihan}
          isSekuensial
        />
      </div>
    )
  );
};

export default TimedQuestionContainer;
