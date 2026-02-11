"use client";
import RenderMarkdown from "@/app/latihan-soal/components/RenderMarkdown";
import { OptionBoxVariants } from "@/app/latihan-soal/components/style";
import { useTryoutContextV2 } from "@/app/try-out/context/TryoutContextV2";
import { cn } from "@/lib/utils";
import {
  useAttemptTryoutQuestionMutation,
  useGetTryoutDetailQuery,
  useGetTryoutQuestionDetailQuery,
  useGetTryoutSetQuestionListQuery,
  useGetTryoutStateQuery,
  useSubmitTryoutMutation,
  useSubmitTryoutSetMutation,
  useToggleFlagTryoutQuestionMutation,
} from "@/redux/api/tryoutApi";
import { TryoutSetQuestionsResponse } from "@/types/tryout";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import NavigationsContainer from "../../NavigationsContainer";
import FinishedTryoutModal from "../FinishedTOModal";
import NextSetModal from "../NextSetModal";
import SoalTrackerMobile from "../SoalTrackerMobile";
import SubmitTOModal from "../SubmitTOModal";

interface TOProAttemptContainerProps {
  setId: string;
}

const TOProAttemptContainer = ({ setId }: TOProAttemptContainerProps) => {
  const {
    currentQuestionId,
    setCurrentNumber: setContextCurrentNumber,
    currentNumber: contextCurrentNumber,
    tryoutState,
    isOnIstirahat,
    setOpenFinishedModal,
    openFinishedModal,
  } = useTryoutContextV2();

  const params = useParams();
  const { id } = params;

  const [nextModal, setNextModal] = useState<boolean>(false);
  const [submitModal, setSubmitModal] = useState<boolean>(false);

  const [choice, setChoice] = useState<string>("");
  const [attempt] = useAttemptTryoutQuestionMutation();
  const [maxNumber, setMaxNumber] = useState<number>(0);
  const { refetch } = useGetTryoutStateQuery();
  const [submitTryoutSet, { isLoading: isLoadingTryoutSet }] =
    useSubmitTryoutSetMutation();
  const [submitTryout, { isLoading: isLoadingTryout }] =
    useSubmitTryoutMutation();

  const {
    data,
    isLoading: isLoadingContext,
    isSuccess,
    refetch: refetchTOQuestionDetail,
  } = useGetTryoutQuestionDetailQuery(
    {
      set_id: setId,
      question_id: currentQuestionId,
    },
    {
      skip: !currentQuestionId || !setId,
    },
  );

  const { data: tryoutDetailData } = useGetTryoutDetailQuery({
    id: id as string,
  });

  const isLoading = isLoadingContext || isLoadingTryoutSet || isLoadingTryout;

  const [toggleFlagQuestion] = useToggleFlagTryoutQuestionMutation();
  const [textAnswer, setTextAnswer] = useState<string>("");
  const {
    data: toSetQuestions,
    isSuccess: isSuccessQuestionList,
    refetch: refetchQuestionList,
  } = useGetTryoutSetQuestionListQuery(
    { set_id: setId },
    {
      skip: !setId || isOnIstirahat,
    },
  );

  useEffect(() => {
    if (isSuccess) {
      const selectedOptionId = data?.data.options.find(
        (option) => option.id === data.data.option_id,
      )?.id;
      setChoice(selectedOptionId || "");
      if (data?.data.answer && data.data.is_text_answer && textAnswer == "") {
        setTextAnswer(data.data.answer);
      }
    }
  }, [isSuccess, contextCurrentNumber, data]);

  const handleNext = useCallback(() => {
    if (
      tryoutState?.data?.next_set_id == null &&
      contextCurrentNumber == maxNumber
    ) {
      setSubmitModal(true);
    }
    if (contextCurrentNumber == maxNumber) {
      setNextModal(true);
    } else {
      setContextCurrentNumber(contextCurrentNumber + 1);
    }
  }, [contextCurrentNumber, tryoutState?.data?.next_set_id, maxNumber]);

  const handlePrev = useCallback(() => {
    setContextCurrentNumber(contextCurrentNumber - 1);
  }, [contextCurrentNumber]);

  const handleToggleFlag = useCallback(
    (currentNum: number) => {
      toggleFlagQuestion({
        question_id: (toSetQuestions as TryoutSetQuestionsResponse).data
          .questions[currentNum - 1].id,
        set_id: setId,
      }).then(() => {
        refetchQuestionList();
      });
    },
    [isSuccessQuestionList, tryoutState, setId],
  );

  const handleSubmitTryoutSet = useCallback(() => {
    submitTryoutSet({ set_id: setId }).then(() => {
      refetch();
      setNextModal(false);
    });
  }, [setId, refetch]);

  const handleSubmitTryout = useCallback(() => {
    submitTryoutSet({ set_id: setId }).then(() => {
      submitTryout({ tryout_id: id as string }).then(() => {
        setOpenFinishedModal(true);
      });
    });
  }, [setId, refetch]);

  useEffect(() => {
    if (isSuccessQuestionList && toSetQuestions) {
      // find current question id index in the list
      const currentQuestionIndex = toSetQuestions.data.questions.findIndex(
        (question) => question.id === toSetQuestions.data.current_question_id,
      );
      setContextCurrentNumber(currentQuestionIndex + 1);
    }
  }, [isSuccessQuestionList]);

  useEffect(() => {
    if (toSetQuestions) {
      const flaggedNumbers: number[] = [];

      toSetQuestions.data.questions.forEach((question, idx) => {
        if (question.is_flagged) {
          flaggedNumbers.push(idx + 1);
        }
      });

      // setFlaggedNumber(flaggedNumbers);
      setMaxNumber(toSetQuestions.data.questions.length);
    }
  }, [toSetQuestions?.data.questions]);

  useEffect(() => {
    if (submitModal) {
      setNextModal(false);
    }
  }, [submitModal]);

  useEffect(() => {
    if (
      data?.data.is_text_answer &&
      data.data.answer !== textAnswer &&
      textAnswer !== ""
    ) {
      attempt({
        set_id: setId,
        question_id: currentQuestionId,
        answer: textAnswer,
      }).then(() => {
        refetchTOQuestionDetail(); // force refetch to get the latest data
        refetchQuestionList();
      });
    }
  }, [textAnswer]);

  useEffect(() => {
    if (isSuccess) {
      refetchTOQuestionDetail();
    }
  }, [contextCurrentNumber, isSuccess]);

  return (
    <div className="min-h-screen">
      <NextSetModal
        loading={isLoading}
        handleSubmitTryoutSet={handleSubmitTryoutSet}
        nextModal={nextModal}
        setNextModal={setNextModal}
      />
      <SubmitTOModal
        loading={isLoading}
        openModal={submitModal}
        handleSubmitTryoutSet={handleSubmitTryout}
        setOpenModal={setSubmitModal}
      />
      <FinishedTryoutModal
        openModal={openFinishedModal}
        setOpenModal={setOpenFinishedModal}
      />
      <MediaQuery maxWidth={1023}>
        {!submitModal && !nextModal && (
          <SoalTrackerMobile
            eventName={tryoutDetailData?.data.event_name ?? ""}
            maxNum={maxNumber}
            setId={setId}
          />
        )}
      </MediaQuery>
      <div className="px-6 pb-5 pt-5 lg:p-10">
        <p className="mt-2 hidden text-lg font-bold text-gray-500 lg:block">
          Soal No {contextCurrentNumber} |{" "}
          <span className="text-sm font-500">
            Adaptasi soal <b>{data?.data.source}</b>
          </span>
        </p>
        <p className="pb-2 text-sm font-500 italic text-gray-500 lg:hidden">
          Diadaptasi dari soal {data?.data.source}
        </p>
        {data?.data.content_asset && (
          <Image
            src={data.data.content_asset}
            alt="content-image"
            width={500}
            height={300}
          />
        )}
        <RenderMarkdown
          className="lg:mt-4 lg:text-lg"
          markdown={data?.data.content || ""}
        />
        <div
          className={cn(
            "mb-8 mt-8 flex w-full grid-flow-col grid-cols-2 grid-rows-3 flex-col gap-4 lg:mb-12 lg:grid",
            isLoading && "mt-10",
          )}
        >
          {isLoading ? (
            <>
              <div className="skeleton relative mt-2 h-10 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
              <div className="skeleton relative mt-2 h-10 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
              <div className="skeleton relative mt-2 h-10 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
              <div className="skeleton relative mt-2 h-10 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
              <div className="skeleton relative mt-2 h-10 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
              <div className="skeleton relative mt-2 h-10 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
            </>
          ) : data?.data.is_text_answer ? (
            <div className="flex flex-col gap-2">
              <input
                value={textAnswer}
                onChange={(e) => {
                  setTextAnswer(e.target.value);
                  if (e.target.value === "") {
                    attempt({
                      set_id: setId,
                      question_id: currentQuestionId,
                      answer: "",
                    }).then(() => {
                      refetchTOQuestionDetail(); // force refetch to get the latest data
                      refetchQuestionList();
                    });
                  }
                }}
                type="text"
                className="w-full rounded-lg border border-gray-300 p-2"
                placeholder="Jawaban"
              />
            </div>
          ) : (
            data?.data.options.map(({ content, key, id }) => (
              <button
                key={id}
                onClick={() => {
                  setChoice(id);
                  attempt({
                    set_id: setId,
                    question_id: currentQuestionId,
                    answer: id,
                  }).then(() => {
                    refetchTOQuestionDetail(); // force refetch to get the latest data
                    refetchQuestionList();
                  });
                }}
                className={cn(
                  OptionBoxVariants({
                    variant: choice == id ? "active" : "inactive",
                  }),
                )}
              >
                <div
                  className={cn(
                    "flex h-8 min-h-8 w-8 min-w-8 items-center justify-center rounded-lg text-center align-middle group-hover:bg-gray-600 group-hover:text-white",
                    choice == id ? "bg-gray-600" : "bg-white",
                  )}
                >
                  {key}
                </div>
                <RenderMarkdown
                  markdown={content}
                  className={cn(
                    "group-hover:text-white",
                    choice == id && "text-white",
                  )}
                />
              </button>
            ))
          )}
        </div>
        <NavigationsContainer
          currentNumber={contextCurrentNumber}
          disablePrev={contextCurrentNumber === 1}
          handleNext={handleNext}
          handlePrev={handlePrev}
          disableNext={false}
          handleToggleFlag={handleToggleFlag}
          onSubmitCondition={
            contextCurrentNumber == toSetQuestions?.data.questions.length
          }
        />
      </div>

      <Image
        src="/illustrations/gradient-background.png"
        alt="background"
        fill
        className="-z-50 block lg:hidden"
      />
    </div>
  );
};

export default TOProAttemptContainer;
