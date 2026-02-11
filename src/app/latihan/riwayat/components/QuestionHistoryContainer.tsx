"use client";

import PembahasanContainer from "@/app/latihan-soal/components/PembahasanContainer";
import QuestionFillIn from "@/app/latihan-soal/components/QuestionFillIn";
import RenderMarkdown from "@/app/latihan-soal/components/RenderMarkdown";
import { OptionBoxVariants } from "@/app/latihan-soal/components/style";
import Iconify from "@/components/Iconify";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useGetLatihanSoalHistoryByIdQuery,
  useGetPembahasanQuery,
} from "@/redux/api/latihanSoalApi";
import { LatihanSoalHistoryByIdResponse } from "@/types";
import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRiwayatLatihanSoalContext } from "../context";
import QuestionHistoryTable from "./QuestionHistoryTable";

const QuestionHistoryContainer = () => {
  const { selectedQuestionId, selectedSubject } =
    useRiwayatLatihanSoalContext();

  const { data, isLoading } = useGetLatihanSoalHistoryByIdQuery(
    {
      id: selectedQuestionId,
    },
    {
      skip: !selectedQuestionId,
    },
  );
  const [correctKeyId, setCorrectKeyId] = useState<string[]>([]);

  const { data: pembahasan } = useGetPembahasanQuery(
    {
      question_id: data?.data.question.id as string,
      attempt_id: data?.data.attempts[0]?.id as string,
    },
    {
      skip: !data?.data.question.id,
    },
  );

  useEffect(() => {
    // set correct key id for multiple choice question
    if (data) {
      const correctKey = data.data.question.options
        ?.filter((option) => option.is_true)
        .map((option) => option.id);
      setCorrectKeyId(correctKey);
    }
  }, [data]);

  const renderQuestion = (data: LatihanSoalHistoryByIdResponse) => {
    switch (data.data.question.type) {
      case "fill-in":
        return (
          <QuestionFillIn
            content={data?.data.question.content}
            correctAnswer={data?.data.question.filled_answers}
          />
        );
      case "multiple-answer":
        return data.data.question.content.map((content, index) => {
          return (
            <div key={index}>
              <RenderMarkdown
                className="text-lg"
                asset={content.isMedia ? content.content : ""}
                markdown={content.isMedia ? "" : content.content}
              />
              <div className="mt-4 flex flex-col gap-y-3">
                {renderOptions(data, [], [])}
              </div>
            </div>
          );
        });
      case "table-choice":
        return (
          <QuestionHistoryTable
            isCorrectState={true}
            data={data}
            filledAnswersAttempt={[]}
          />
        );
      default:
        return data.data.question.content.map((content, index) => {
          return (
            <RenderMarkdown
              key={index}
              className="text-lg"
              asset={content.isMedia ? content.content : ""}
              markdown={content.isMedia ? "" : content.content}
            />
          );
        });
    }
  };

  const renderOptions = (
    data: LatihanSoalHistoryByIdResponse,
    choiceId: string[],
    filledAnswers: string[],
  ) => {
    switch (data.data.question.type) {
      case "fill-in":
        const result: any = [];

        const textThatHaveInput = data?.data.question.content.filter(
          (content) =>
            content.isMedia === false && content.content.includes("[FILL]"),
        );
        let counter = 0;
        textThatHaveInput.map((content) => {
          const splittedContent = content.content.split("[FILL]");
          for (let i = 0; i < splittedContent.length - 1; i++) {
            const firstMarkdownToBeRendered = splittedContent[i].split(" ");
            // get 5 last words from the splitted content
            const lastFiveWords = firstMarkdownToBeRendered.slice(-5).join(" ");

            const isCorrect =
              filledAnswers[counter] ===
              data.data.question.filled_answers[counter];

            const color = isCorrect
              ? "bg-emerald-100 text-emerald-700 border-emerald-500 "
              : "bg-rose-100 text-rose-500 border-rose-500 ";

            result.push(
              <div className="my-5 flex gap-x-2">
                <RenderMarkdown markdown={lastFiveWords} />
                <input
                  disabled
                  className={`h-8 w-20 rounded-md border-2 px-2 ${color}`}
                  value={filledAnswers[counter]}
                />
              </div>,
            );

            counter++;
          }
        });

        return result;

      case "table-choice":
        return (
          <QuestionHistoryTable
            isCorrectState={false}
            data={data}
            filledAnswersAttempt={filledAnswers}
          />
        );
      default:
        return data?.data.question.options.map(({ content, key, id }) => {
          // is id in correct key array
          let isCorrect = correctKeyId.includes(id);

          const isMultipleAnswer =
            data.data.question.type === "multiple-answer" &&
            choiceId.length == 0; // for multiple answer as the correct example

          const correctAnswers = data.data.question.options
            .filter((option) => option.is_true)
            .map((option) => option.id);

          // check all of the given filled answers are correct
          if (choiceId.includes(id)) {
            isCorrect = correctKeyId.includes(id);
          }

          return (
            <button
              key={id}
              disabled={true}
              className={cn(
                OptionBoxVariants({
                  variant: "inactive",
                }),
                "text-gray-700",
                choiceId.includes(id) && isCorrect && "!bg-emerald-100",
                choiceId.includes(id) &&
                  !isCorrect &&
                  "!bg-rose-100 !text-rose-700",
                isMultipleAnswer &&
                  correctAnswers.includes(id) &&
                  "!bg-emerald-100",
              )}
            >
              <div
                className={cn(
                  "flex h-8 min-h-8 w-8 min-w-8 items-center justify-center rounded-lg bg-white text-center align-middle font-700 text-gray-800",
                  choiceId.includes(id) &&
                    isCorrect &&
                    "bg-emerald-50 font-800 text-emerald-800",
                  choiceId.includes(id) &&
                    !isCorrect &&
                    "!bg-rose-50 !text-rose-800 ",
                  isMultipleAnswer &&
                    correctAnswers.includes(id) &&
                    "bg-emerald-50 text-emerald-800",
                )}
              >
                {key}
              </div>
              <RenderMarkdown markdown={content} className="leading-8" />
            </button>
          );
        });
    }
  };

  return (
    <div className="flex flex-col gap-5 px-5 lg:px-10">
      <div className="flex flex-col overflow-y-scroll">
        <h2 className="text-3xl font-700 text-content-100">
          {selectedSubject?.name}
        </h2>
        {selectedQuestionId && (
          <>
            {isLoading ? (
              <div className="skeleton relative mt-2 h-5 w-44 rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
            ) : (
              <h2 className="py-1 text-xl font-600 text-content-300">
                {data?.data?.question?.topic_name}
              </h2>
            )}
            {isLoading ? (
              <div className="skeleton relative mt-2 h-5 w-1/4 rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
            ) : (
              <h2 className="text-xl font-600 text-content-300">
                {data?.data?.question?.source} {data?.data?.question?.year}
              </h2>
            )}
          </>
        )}
      </div>
      {selectedQuestionId ? (
        <>
          {data && (
            <div id="mdown" className="w-full text-gray-500">
              {renderQuestion(data)}
            </div>
          )}
          {data?.data.attempts.map((attempt) => {
            return (
              <div key={attempt.id}>
                <div className="mb-4 flex w-full items-center">
                  <div className="w-fit rounded-2xl bg-gray-100 p-2 font-700 text-gray-500">
                    {dayjs(attempt.timestamp).format("DD MMMM YYYY")}
                  </div>
                  <div className="ml-3 h-[2px] flex-grow rounded-full bg-gray-100"></div>
                </div>
                <div
                  className={cn(
                    data.data.question.type == "fill-in" && "my-10",
                    data.data.question.type != "fill-in" &&
                      data.data.question.type != "table-choice" &&
                      "flex w-full grid-flow-col grid-cols-2 grid-rows-3 flex-col gap-4 lg:mb-8 lg:grid",
                    isLoading && "mt-10",
                  )}
                >
                  {renderOptions(
                    data,
                    !attempt.choice_id
                      ? attempt.filled_answers
                      : [attempt.choice_id],
                    attempt.filled_answers,
                  )}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div className="rounded-2xl border-2 border-red-200 bg-red-100 p-5">
            <h2 className="flex items-center gap-x-2 text-left font-bold text-red-700">
              <Iconify icon="zondicons:exclamation-outline" /> Anda belum
              memulai latihan soal pada bab ini
            </h2>
          </div>
          <Link
            href={`/latihan-soal/${selectedSubject?.slug}`}
            className={buttonVariants({ variant: "bsPrimary" })}
          >
            Latihan Soal {selectedSubject && selectedSubject.alternate_name}
            <ArrowRight className="ml-1 w-4" />
          </Link>
        </>
      )}
      {pembahasan?.data && selectedQuestionId && (
        <div className="pb-32 pt-6 md:pb-4 lg:pb-0">
          <PembahasanContainer data={pembahasan.data} />
        </div>
      )}
    </div>
  );
};

export default QuestionHistoryContainer;
