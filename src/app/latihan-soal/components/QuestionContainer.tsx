"use client";
// components
import Iconify from "@/components/Iconify";
// libs
import { cn } from "@/lib/utils";
import {
  useAttemptLatihanSoalMutation,
  useDownloadPdfLatihanSoalMutation,
  useGetAttemptLatihanSoalQuery,
  useGetLatihanSoalDetailQuery,
  useGetPembahasanQuery,
} from "@/redux/api/latihanSoalApi";

import { Choice, Pembahasan } from "@/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLatihanSoalContext } from "../context";
import QuestionNavigator from "./QuestionNavigator";
import { OptionBoxVariants, correctChoice, wrongChoice } from "./style";

const QuestionFillIn = dynamic(() => import("./QuestionFillIn"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col gap-y-3">
      <div className="skeleton relative mt-2 h-9 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
      <div className="skeleton relative mt-2 h-9 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
      <div className="skeleton relative mt-2 h-9 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
    </div>
  ),
});

const RenderMarkdown = dynamic(() => import("./RenderMarkdown"), {
  ssr: false,
  loading: () => (
    <div className="skeleton relative h-6 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
  ),
});

const PembahasanContainer = dynamic(() => import("./PembahasanContainer"), {
  ssr: false,
  loading: () => (
    <div className="relative mb-10 rounded-xl border-2 border-gray-200 px-6 pb-10 pt-4">
      <div className="skeleton relative h-4 w-24 rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300 mb-4"></div>
      <div className="skeleton relative h-32 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
    </div>
  ),
});

const QuestionTable = dynamic(() => import("./QuestionTable"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col gap-y-3">
      <div className="skeleton relative h-9 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
      <div className="skeleton relative h-9 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
      <div className="skeleton relative h-9 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
    </div>
  ),
});

interface QuestionContainerI {
  slug: string[];
}
export const QuestionContainer = ({ slug }: QuestionContainerI) => {
  const [choice, setChoice] = useState<string[]>([]);

  const [disableChoice, setDisableChoice] = useState<boolean>(false);
  const { selectedTopicId, subjects, yearRange, selectedSubject, soalData } =
    useLatihanSoalContext();
  const [downloadPdf, { isSuccess: successDownload, data: dataPdf }] =
    useDownloadPdfLatihanSoalMutation();

  const { data: attemptQuestionData, isSuccess: finishedGetAttempt } =
    useGetAttemptLatihanSoalQuery(
      {
        question_id: slug?.[1] || "",
      },
      {
        skip: !slug?.[1],
      },
    );

  const {
    data: pembahasan,
    isSuccess: pembahasanFetched,
    isFetching: pembahasanFetching,
  } = useGetPembahasanQuery(
    {
      question_id: slug?.[1] || "",
      attempt_id: attemptQuestionData?.data?.id as string,
    },
    {
      skip: !finishedGetAttempt || !attemptQuestionData?.data?.submitted,
    },
  );

  const { data, isSuccess, isLoading } = useGetLatihanSoalDetailQuery(
    {
      id: slug?.[1] || "",
    },
    {
      skip: !slug?.[1],
    },
  );
  const [question, setQuestion] = useState(data?.data ?? null);

  useEffect(() => {
    if (isSuccess) {
      setQuestion(data?.data ?? null);
    }
  }, [isSuccess]);

  const [attemptSoal] = useAttemptLatihanSoalMutation();

  const onClickOption = async (
    choice_id: string | null,
    content: string,
    choiceIds: string[],
  ) => {
    if (question) {
      switch (question.type) {
        case "multiple-answer":
          await attemptSoal({
            question_id: question.id,
            choice_id: undefined,
            answer_history: content,
            answers: [...choiceIds],
          });
          break;
        default:
          await attemptSoal({
            question_id: question.id,
            choice_id: choice_id || undefined,
            answer_history: content,
            answers: [],
          });
          break;
      }
    }
  };
  useEffect(() => {
    if (attemptQuestionData?.data) {
      const questionType = attemptQuestionData?.data.type;

      if (questionType === "multiple-choice") {
        setChoice([attemptQuestionData?.data?.choice_id]);
      } else if (questionType === "multiple-answer") {
        setChoice([...attemptQuestionData?.data.filledAnswers]);
      }
    }
    if (attemptQuestionData?.data?.submitted) {
      setDisableChoice(true);
    }
  }, [
    attemptQuestionData?.data,
    question,
    attemptQuestionData?.data?.filledAnswers,
  ]);

  useEffect(() => {
    if (pembahasan && question) {
      if (question.type === "multiple-answer") {
        setChoice([...pembahasan.data.attempt.filled_answer]);
      } else if (question.type === "multiple-choice") {
        setChoice([pembahasan.data.attempt.choice_id]);
      }
    }
  }, [pembahasan, question]);

  useEffect(() => {
    if (successDownload) {
      const URL =
        process.env.NODE_ENV === "production"
          ? "https://pdf.bangsoal.co.id"
          : "http://localhost:3002";
      window.open(`${URL}/${dataPdf?.data.url}`, "_blank");
    }
  }, [successDownload]);

  const renderDownloadPDFButton = () => {
    return (
      <button
        onClick={() => {
          const subject = slug?.[0] || "";
          // get object key
          downloadPdf({
            subject_id: subjects.filter(
              (subject) => subject.slug === slug?.[0],
            )[0]?.id || "",
            topic_id: selectedTopicId !== "ALL" ? selectedTopicId : undefined,
            max_year: yearRange[slug?.[0] as string]?.[1] || 2024,
            min_year: yearRange[slug?.[0] as string]?.[0] || 2009,
          });
        }}
        className="group flex items-center gap-1 rounded-full px-2 text-sm font-500 text-surface-400 duration-200 hover:bg-emerald-400 hover:text-emerald-100 md:flex lg:ml-3"
      >
        <Iconify icon="ph:download-simple-bold" />
        <p className="mb-0 group-hover:block">Download</p>
      </button>
    );
  };

  const isChoiceCorrect = (choiceId: string, options: Choice[]) => {
    if (!options) {
      return pembahasan?.data.is_correct;
    }
    const isCorrect = options.find((option) => option.id === choiceId);
    return isCorrect?.is_true;
  };

  const renderOptionBox = question?.options.map(
    ({ id: choiceId, content, key }) => {
      const isSelected = choice.find((c) => c == choiceId);
      const isCorrect =
        pembahasan &&
        isChoiceCorrect(
          choiceId,
          (pembahasan?.data?.correct_answer as Pembahasan).choice as Choice[],
        );

      return (
        <button
          key={choiceId}
          disabled={disableChoice}
          onClick={() => {
            if (question.type == "multiple-answer") {
              if (isSelected) {
                onClickOption(
                  null,
                  content,
                  choice.filter((c) => c !== choiceId),
                );
                setChoice(choice.filter((c) => c !== choiceId));
              } else {
                onClickOption(null, content, [...choice, choiceId]);
                setChoice([...choice, choiceId]);
              }
            } else if (question.type == "multiple-choice") {
              setChoice([choiceId]);
              onClickOption(choiceId, content, []);
            }
          }}
          className={cn(
            OptionBoxVariants({
              variant: isSelected ? "active" : "inactive",
            }),
            pembahasanFetched && isSelected && isCorrect && correctChoice,
            pembahasanFetched && isSelected && !isCorrect && wrongChoice,
          )}
        >
          <div
            className={cn(
              "flex h-8 min-h-8 w-8 min-w-8 items-center justify-center rounded-lg text-center align-middle ",
              !disableChoice && "group-hover:bg-gray-600",
              isSelected ? "bg-gray-600" : "bg-white",
              disableChoice && isSelected && "group-hover:bg-white",
              pembahasanFetched &&
                isSelected &&
                isCorrect &&
                "bg-emerald-50 group-hover:bg-emerald-50",
              pembahasanFetched &&
                isSelected &&
                !isCorrect &&
                "bg-red-50 group-hover:bg-red-50",
            )}
          >
            {key}
          </div>
          <RenderMarkdown
            id="option-content"
            className={cn(
              pembahasanFetched && isSelected && isCorrect && correctChoice,
              pembahasanFetched && isSelected && !isCorrect && wrongChoice,
              !pembahasanFetched && isSelected && "text-white",
              !pembahasanFetched && "group-hover:text-white",
            )}
            markdown={content}
          />
        </button>
      );
    },
  );

  const render = () => {
    if (
      question?.type === "multiple-choice" ||
      question?.type === "multiple-answer"
    ) {
      return (
        <div>
          {question.content.map(({ content, isMedia }) => {
            return !isMedia ? (
              <RenderMarkdown key={content} markdown={content} />
            ) : (
              <Image
                key={content}
                src={content}
                alt="asset image"
                width={500}
                height={300}
              />
            );
          })}
          <div className="mb-4 mt-6 h-fit  text-sm font-medium text-content-300">
            Pilih jawaban yang benar{" "}
            {question?.type === "multiple-answer"
              ? "(dapat lebih dari satu)"
              : ""}
          </div>
          <div
            className={cn(
              "flex w-full grid-flow-col grid-cols-2 grid-rows-3 flex-col gap-4 lg:mb-8 lg:grid lg:pt-3",
              isLoading && "mt-10",
              question?.type === "multiple-answer" &&
                "grid-flow-row grid-cols-1",
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
            ) : (
              renderOptionBox
            )}
          </div>
        </div>
      );
    } else if (question?.type === "fill-in" && !pembahasanFetching) {
      return (
        <QuestionFillIn
          isCorrect={pembahasan?.data.is_correct}
          filledAnswers={pembahasan?.data.attempt?.filled_answer}
          content={question.content}
          correctAnswer={
            (pembahasan?.data.correct_answer as Pembahasan)?.filled_answer
          }
        />
      );
    } else if (question?.type == "table-choice" && data) {
      return <QuestionTable data={data} />;
    }
  };

  return (
    <div className="flex justify-center lg:px-10 lg:pt-0">
      <div className="flex w-full max-w-3xl flex-col gap-5 px-5 lg:max-w-none lg:gap-2 lg:px-10">
        <div className="mb-4 flex flex-col gap-1">
          <div className="flex w-full flex-col pt-2 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-3xl font-700 text-content-100">
              {selectedSubject?.name}
            </h1>
            {question?.last_attempted && (
              <span className="my-4 w-fit rounded-2xl border-[1px] border-green-700 bg-green-500 px-2 py-1 text-xs text-white lg:text-sm">
                Sudah Pernah Dikerjakan
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {isLoading ? (
              <div className="skeleton relative mt-2 h-5 w-44 rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
            ) : (
              <h2 className="text-xl font-600 text-content-300">
                {question?.topic}
              </h2>
            )}
            {question && (
              <div className="hidden lg:block">{renderDownloadPDFButton()}</div>
            )}
          </div>
          {isLoading ? (
            <div className="skeleton relative mt-2 h-5 w-1/4 rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
          ) : (
            <h2 className="text-xl font-600 text-content-300">
              {question?.label}
            </h2>
          )}
          {question && (
            <div className="lg:hidden">{renderDownloadPDFButton()}</div>
          )}
        </div>
        {isLoading ? (
          <div className="flex flex-col gap-y-3">
            <div className="skeleton relative mt-2 h-9 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
            <div className="skeleton relative mt-2 h-9 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
            <div className="skeleton relative mt-2 h-9 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
          </div>
        ) : (
          question && <div className="mb-10">{render()}</div>
        )}
        {pembahasanFetched && attemptQuestionData?.data && (
          <div className="pt-6">
            <PembahasanContainer
              data={pembahasan.data}
              attemptId={attemptQuestionData?.data.id}
            />
          </div>
        )}
        {data && (
          <QuestionNavigator
            questionType={question?.type || "multiple-choice"}
            data={attemptQuestionData}
            disableCekJawaban={
              pembahasanFetched ||
              (!attemptQuestionData?.data && question?.type !== "fill-in")
            }
          />
        )}
      </div>
    </div>
  );
};
