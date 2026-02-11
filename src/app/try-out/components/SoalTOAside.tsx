"use client";
import { SoalTracker } from "@/app/latihan-soal-timed/components/Aside/SoalTracker";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useTryoutContextV2 } from "../context/TryoutContextV2";
import { TOTimer } from "./TOTimer";

export const SoalTOAside = () => {
  const {
    tryoutState,
    isOnIstirahat,
    percentage,
    tryoutSetSequence,
    currentSubject,
    flaggedNumber,
    answeredNumber,
    toSetQuestions,
    currentNumber,
    changeCurrentNumber,
    handleSubmitTOset,
  } = useTryoutContextV2();

  return (
    <div className="flex h-full flex-col gap-2 pb-8">
      {tryoutState?.data?.current_set && (
        <TOTimer
          setId={tryoutState.data.current_set.id}
          endTime={dayjs(tryoutState.data?.current_set?.startedAt)
            .add(tryoutState.data?.current_set?.duration as number, "second")
            .toDate()}
          onTimeUp={() => {
            handleSubmitTOset(
              tryoutState.data?.current_set?.tryoutSetId as string,
            );
          }}
        />
      )}
      {tryoutState?.data?.tryout.event_name && (
        <div className="m-0 p-0 text-center">
          <p className="m-0 p-0 text-base font-semibold text-gray-700">
            {tryoutState.data?.tryout.event_name}
          </p>
        </div>
      )}
      <div className="flex w-full grow">
        <div className="flex h-fit w-full">
          <div className="px-2">
            <div className="h-full w-6 rounded-full bg-gray-200 p-1">
              <div
                className="h-full w-full rounded-full bg-emerald-500"
                style={{
                  height: `${percentage || 0}%`,
                }}
              />
            </div>
          </div>
          <div className="grow px-2">
            <>
              {tryoutSetSequence?.data.map(({ name }, idx) => {
                return (
                  <div key={name}>
                    <p
                      key={idx}
                      className={cn(
                        "mb-0 truncate text-wrap py-2 text-left text-base font-semibold text-gray-700",
                        currentSubject === name
                          ? "text-gray-700"
                          : "text-gray-300",
                      )}
                    >
                      {name}
                    </p>
                    {currentSubject == name && !isOnIstirahat && (
                      <div className="rounded-lg bg-gray-300 p-1 shadow-inner-lg">
                        <SoalTracker
                          answeredNumber={answeredNumber}
                          flaggedNumber={flaggedNumber}
                          currentNumber={currentNumber}
                          maxNumber={
                            toSetQuestions?.data.questions.length ?? 10
                          }
                          isTO
                          handleNumberClick={(_, idx) => {
                            changeCurrentNumber(idx + 1);
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
