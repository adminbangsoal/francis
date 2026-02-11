import { SoalTracker } from "@/app/latihan-soal-timed/components/Aside/SoalTracker";
import {
  useGetTryoutQuestionDetailQuery,
  useGetTryoutSetQuestionListQuery,
  useUpdateCurrentToQuestionMutation,
} from "@/redux/api/tryoutApi";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTryoutContextV2 } from "../../context/TryoutContextV2";
import { TOTimer } from "../TOTimer";
interface SoalTrackerMobileProps {
  setId: string;
  maxNum?: number;
  isRiwayat?: boolean;
  eventName?: string;
}

const SoalTrackerMobile = ({
  setId,
  isRiwayat = false,
  eventName, // handling tryout event
}: SoalTrackerMobileProps) => {
  const {
    currentNumber: contextCurrentNumber,
    isOnIstirahat,
    setCurrentNumber: setContextCurrentNumber,
    currentQuestionId,
    tryoutState,
  } = useTryoutContextV2();

  const [wrongNumbers, setWrongNumbers] = useState<number[]>([]);

  const [flaggedNumber, setFlaggedNumber] = useState<number[]>([]);
  const [answeredNumber, setAnsweredNumber] = useState<number[]>([]);
  const { data } = useGetTryoutQuestionDetailQuery(
    {
      set_id: setId,
      question_id: currentQuestionId,
    },
    {
      skip: !currentQuestionId || isRiwayat,
    },
  );

  const [updateCurrentQuestion] = useUpdateCurrentToQuestionMutation();

  const { data: toSetQuestions } = useGetTryoutSetQuestionListQuery(
    { set_id: setId },
    {
      skip: !setId || isOnIstirahat || isRiwayat,
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    if (toSetQuestions) {
      const flaggedNumbers: number[] = [];

      toSetQuestions.data.questions.forEach((question, idx) => {
        if (question.is_flagged) {
          flaggedNumbers.push(idx + 1);
        }
      });

      setFlaggedNumber(flaggedNumbers);
    }
  }, [toSetQuestions?.data.questions]);

  useEffect(() => {
    if (contextCurrentNumber > 0 && toSetQuestions) {
      const questionId =
        toSetQuestions.data.questions[contextCurrentNumber - 1].id;
      updateCurrentQuestion({
        set_id: setId,
        question_id: questionId,
      });
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [contextCurrentNumber]);

  useEffect(() => {
    const flaggedNumbers: number[] = [];
    const answeredNumbers: number[] = [];
    const wrongNumbers: number[] = [];
    if (toSetQuestions) {
      toSetQuestions.data.questions.forEach((question, idx) => {
        if (question.is_flagged) {
          flaggedNumbers.push(idx + 1);
        }
        if (question.is_answered) {
          answeredNumbers.push(idx + 1);
        }
      });
    }
    // if (!!TOQuestionsHistoryData) {
    //   TOQuestionsHistoryData.data.questions.forEach((question, index) => {
    //     if (question.is_answered) {
    //       answeredNumbers.push(index + 1);
    //     }
    //     if (question.is_flagged) {
    //       flaggedNumbers.push(index + 1);
    //     }
    //     if (question.is_correct === false && isRiwayat) {
    //       wrongNumbers.push(index + 1);
    //     }
    //   });
    // }
    setFlaggedNumber(flaggedNumbers);
    setAnsweredNumber(answeredNumbers);
    setWrongNumbers(wrongNumbers);
  }, [
    toSetQuestions?.data.questions,
    //  TOQuestionsHistoryData?.data.questions
  ]);

  return (
    <div className="sticky top-0 z-30  w-full lg:hidden">
      <div className="relative z-30 rounded-md bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center p-4">
        {/* {isRiwayat && !!TOQuestionsHistoryData && (
          <div className="mb-3">
            <div className="relative z-50 flex w-full pb-3 ">
              <Select.Root
                value={selectedTOSet}
                onValueChange={(value) => {
                  setSelectedTOSet(value);
                }}
              >
                <Select.Trigger
                  id="topik"
                  className="flex grow items-center justify-between rounded bg-gray-100 px-2 py-1 text-left text-gray-500 shadow-inner-lg outline-none"
                  aria-label="Topik"
                >
                  <Select.Value />
                  <Select.Icon>
                    <i className="i-ph-caret-down-bold" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="absolute z-50 ml-4 mr-0 w-full rounded-lg border border-surface-400/40 bg-surface-100/20 p-2 text-content-100 shadow-lg backdrop-blur-2xl">
                    <Select.ScrollUpButton className="flex h-6 cursor-default items-center justify-center text-content-100">
                      <i className="i-ph-caret-up-bold animate-bounce" />
                    </Select.ScrollUpButton>
                    <Select.Viewport>
                      {TOHistorySetsData?.data.sets.map(
                        ({ id, subject_name }) => {
                          return (
                            <Select.Item
                              key={id}
                              value={id}
                              className="relative cursor-pointer select-none rounded-md px-5 py-1 pl-9 text-sm text-content-100 outline-none data-[state=checked]:bg-content-200 data-[state=unchecked]:data-[highlighted]:bg-surface-700/10 data-[state=checked]:text-white"
                            >
                              <Select.ItemText asChild>
                                <div className="flex w-[75vw] grow flex-row items-center justify-between font-semibold md:w-[85vw]">
                                  <span className="grow">{subject_name}</span>
                                </div>
                              </Select.ItemText>
                              <Select.ItemIndicator className="absolute left-2 top-1/2 inline-flex w-6 -translate-y-1/2 items-center justify-center">
                                <i className="i-ph-check-bold" />
                              </Select.ItemIndicator>
                            </Select.Item>
                          );
                        },
                      )}
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex h-6 cursor-default items-center justify-center text-content-100">
                      <i className="i-ph-caret-down-bold animate-bounce" />
                    </Select.ScrollDownButton>
                    <Select.Arrow />
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
            <RiwayatSubjectTracker
              correct={TOQuestionsHistoryData.data.correct_answers ?? 0}
              wrong={TOQuestionsHistoryData.data.wrong_answers ?? 0}
              notAnswered={
                TOQuestionsHistoryData.data.unanswered_questions ?? 0
              }
              score={
                TOHistoryDetailData?.data.set_results
                  .find((toSet) => setId == toSet.id)
                  ?.score?.toFixed(0) ?? 0
              }
            />
          </div>
        )} */}
        {!isRiwayat && (
          <div>
            <div className="bg-emerald- mb-4 flex justify-between text-lg font-bold text-white">
              <div className="flex w-full items-center  justify-between">
                <p className="m-0 max-w-[13rem]">
                  {data?.data.subject_name}{" "}
                  <span className="text-[#FFFFFF32]">|</span> N
                  <sup>
                    <u>o</u>
                  </sup>{" "}
                  {contextCurrentNumber}
                </p>
                {tryoutState?.data?.current_set && (
                  <TOTimer
                    setId={setId}
                    endTime={dayjs(tryoutState.data?.current_set?.startedAt)
                      .add(
                        tryoutState.data?.current_set?.duration as number,
                        "second",
                      )
                      .toDate()}
                    onTimeUp={() => {}}
                  />
                )}
              </div>
            </div>
            {eventName && (
              <div className="-m-2 h-12 p-0 text-center">
                <p className="p-0 text-base font-semibold text-white">
                  {eventName}
                </p>
              </div>
            )}
          </div>
        )}
        <div>
          <SoalTracker
            answeredNumber={answeredNumber}
            flaggedNumber={flaggedNumber}
            currentNumber={contextCurrentNumber}
            wrongNumber={isRiwayat ? wrongNumbers : []}
            maxNumber={
              // isRiwayat
              //   ? TOQuestionsHistoryData?.data.questions.length ?? 10
              //   :
              toSetQuestions?.data.questions.length ?? 10
            }
            isTO
            handleNumberClick={(_, idx) => {
              setContextCurrentNumber(idx + 1);
              // setCurrentQuestionId(
              //   TOQuestionsHistoryData?.data.questions[idx]?.id ?? "",
              // );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SoalTrackerMobile;
