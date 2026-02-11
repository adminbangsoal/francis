"use client";
import { SoalTracker } from "@/app/latihan-soal-timed/components/Aside/SoalTracker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";

import { useTryoutHistoryContext } from "../context/TryoutHistoryContext";
import { RiwayatSubjectTracker } from "./RiwayatSubjectTracker";
import { SelectTO } from "./SelectTO";

export const scoreStyle = (score: number) => {
  if (score >= 600) return "bg-green-500 border-green-700";
  if (score >= 400) return "bg-yellow-500 border-yellow-700";
  else return "bg-red-500 border-red-700";
};

export const RiwayatAside = () => {
  const {
    setSelectedTO,
    selectedTO,
    setSelectedTOSet,
    selectedTOSet,
    setCurrentQuestionId,
    setCurrentNumber,
    currentNumber,
    TOQuestionsHistoryData,
    TOHistorySetsData,
    TOHistoryList,
    TOHistoryDetailData,
  } = useTryoutHistoryContext();

  const router = useRouter();

  const [answeredIndices, setAnsweredIndices] = useState<number[]>([]);
  const [flaggedIndices, setFlaggedIndices] = useState<number[]>([]);
  const [wrongIndices, setWrongIndices] = useState<number[]>([]);

  useEffect(() => {
    const answeredArray: number[] = [];
    const flaggedArray: number[] = [];
    const wrongIndices: number[] = [];
    if (!!TOQuestionsHistoryData) {
      TOQuestionsHistoryData.data.questions.forEach((question, index) => {
        if (question.is_answered) {
          answeredArray.push(index + 1);
        }
        if (question.is_flagged) {
          flaggedArray.push(index + 1);
        }
        if (question.is_correct === false) {
          wrongIndices.push(index + 1);
        }
      });
      setWrongIndices(wrongIndices);
      setAnsweredIndices(answeredArray);
      setFlaggedIndices(flaggedArray);
    }
  }, [TOQuestionsHistoryData]);

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="mb-4 flex w-full grow flex-col">
        <MediaQuery maxWidth={1023}>
          {selectedTO && !!TOHistoryList && (
            <SelectTO
              currentTopic={selectedTO}
              setCurrentTopic={setSelectedTO}
              listData={TOHistoryList.data.tryouts}
            />
          )}
        </MediaQuery>
        <MediaQuery minWidth={1024}>
          {!!TOHistoryDetailData && (
            <div className="flex flex-col gap-2">
              <p className="m-0 text-2xl font-bold text-gray-700">
                {TOHistoryDetailData.data.name}
              </p>
              <div
                className={cn(
                  "w-full rounded-xl border-2 py-1 text-white",
                  scoreStyle(TOHistoryDetailData.data.score),
                )}
              >
                <p className="m-0 p-0 text-center text-2xl font-bold">
                  {TOHistoryDetailData.data.score.toFixed(0)}
                </p>
              </div>
            </div>
          )}
        </MediaQuery>

        {/* to sets */}
        <div className="mt-4 h-full max-h-full w-full grow lg:flex lg:flex-col lg:gap-y-2">
          {!!TOHistorySetsData &&
            TOHistorySetsData.data.sets.map(({ subject_name, id }) => {
              const scoreSet =
                TOHistoryDetailData?.data.set_results
                  .find((toSet) => id == toSet.id)
                  ?.score?.toFixed(0) ?? 0;
              return (
                <div key={id}>
                  <div
                    className={cn(
                      "flex w-full flex-col rounded-lg px-2",
                      selectedTOSet == id && "bg-emerald-50 py-2",
                    )}
                  >
                    <div className="mb-3 flex justify-between">
                      <p
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedTOSet(id);
                          setCurrentQuestionId("");
                          setCurrentNumber(1);
                        }}
                        className={cn(
                          "z-20 m-0 cursor-pointer py-2 font-bold",
                          selectedTOSet == id
                            ? "text-gray-700"
                            : "text-gray-400 hover:translate-x-2 hover:scale-105 hover:text-gray-700",
                        )}
                      >
                        {subject_name}
                      </p>
                      <div
                        className={cn(
                          "m-0 flex items-center rounded-xl border-2 p-0 py-0 text-white lg:px-6",
                          scoreStyle(Number(scoreSet)),
                        )}
                      >
                        {scoreSet}
                      </div>
                    </div>
                    {selectedTOSet == id && !!TOQuestionsHistoryData?.data && (
                      <>
                        <RiwayatSubjectTracker
                          correct={
                            TOQuestionsHistoryData.data.correct_answers ?? 0
                          }
                          wrong={TOQuestionsHistoryData.data.wrong_answers ?? 0}
                          notAnswered={
                            TOQuestionsHistoryData.data.unanswered_questions ??
                            0
                          }
                        />
                        <div className="mt-2 rounded-lg bg-gray-300 p-1 shadow-inner-lg">
                          <SoalTracker
                            answeredNumber={answeredIndices}
                            flaggedNumber={flaggedIndices}
                            wrongNumber={wrongIndices}
                            currentNumber={currentNumber}
                            maxNumber={
                              TOQuestionsHistoryData.data.questions.length ?? 10
                            }
                            isTO
                            handleNumberClick={(_, idx) => {
                              setCurrentNumber(idx + 1);
                              setCurrentQuestionId(
                                TOQuestionsHistoryData.data.questions[idx].id ??
                                  "",
                              );
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <Button
        onClick={() => router.push(`/try-out/`)}
        variant="bsSecondary"
        className="z-20 w-full border-[1px] border-gray-400 bg-gray-300 font-semibold text-gray-500"
      >
        Kembali
      </Button>
    </div>
  );
};
