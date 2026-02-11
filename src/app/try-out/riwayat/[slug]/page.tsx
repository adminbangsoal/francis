"use client";

import RenderMarkdown from "@/app/latihan-soal/components/RenderMarkdown";
import { cn } from "@/lib/utils";

import {
  OptionBoxVariants,
  correctChoice,
  wrongChoice,
} from "@/app/latihan-soal/components/style";

import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import {
  useAddTOHistoryExplanationFeedbackMutation,
  useGetTOHistoryExplanationQuery,
  useGetTOHistoryQuestionAnalyticsQuery,
  useGetTOHistoryQuestionDetailQuery,
} from "@/redux/api/tryoutHistoryApi";
import { TOHistoryQuestionDetail } from "@/types/tryout-history";
import { TabsList } from "@radix-ui/react-tabs";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";
import SoalTrackerMobile from "../../components/Pro/SoalTrackerMobile";
import { useTryoutHistoryContext } from "../../context/TryoutHistoryContext";
import AnalyticsContainer from "../components/AnalyticsContainer";
import ExplanationContainers from "../components/ExplanationContainer";

export default function TryOutRiwayatProPage({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const {
    currentQuestionId,
    selectedTOSet,
    currentNumber,
    TOQuestionsHistoryData,
  } = useTryoutHistoryContext();

  const [isUpgraded, setIsUpgraded] = useState<boolean>(false);

  const [isPenjelasan, setIsPenjelasan] = useState<boolean>(true);
  const { data: questionData, isLoading } = useGetTOHistoryQuestionDetailQuery(
    {
      question_id: currentQuestionId,
    },
    { skip: !currentQuestionId },
  );
  const { data: explanationData } = useGetTOHistoryExplanationQuery(
    {
      question_id: currentQuestionId,
    },
    { skip: !currentQuestionId },
  );

  const { data: analyticsData, isError: isAnalyticsError } =
    useGetTOHistoryQuestionAnalyticsQuery(
      {
        question_id: currentQuestionId,
      },
      { skip: !currentQuestionId },
    );

  const [addExplanationFeedback, { data: feedbackData }] =
    useAddTOHistoryExplanationFeedbackMutation();
  const [question, setQuestion] = useState<TOHistoryQuestionDetail | null>(
    null,
  );

  useEffect(() => {
    if (!!questionData?.data) {
      setQuestion(questionData.data);
    }
  }, [questionData]);
  useEffect(() => {
    setIsUpgraded(explanationData?.data != null);
  }, [isAnalyticsError]);

  const toggleLike = async (is_liked: boolean) => {
    await addExplanationFeedback({ question_id: currentQuestionId, is_liked });
  };

  return (
    <>
      <div className="grow rounded-full bg-gray-200 md:h-0.5" />
      <main className="w-full pb-8 md:h-screen md:overflow-y-auto md:px-16 md:py-10 lg:h-auto">
        <SoalTrackerMobile setId={selectedTOSet} isRiwayat />
        <h1 className="hidden pt-8 text-3xl font-700 text-content-100 md:pt-0 lg:block">
          {TOQuestionsHistoryData?.data.subject_name}
        </h1>
        <div className=" w-full items-center gap-x-4 pl-4 pt-4 md:pl-0 md:pt-0 lg:flex">
          <h2 className="hidden text-xl font-600 text-content-300">
            Soal N
            <sup>
              <u>o</u>
            </sup>{" "}
            {currentNumber}
          </h2>
          <div className="hidden h-0.5 grow rounded-full bg-gray-200 md:block" />
          {!!analyticsData?.data && (
            <div
              className={cn(
                "mt-4 w-fit rounded-full bg-emerald-500 px-4 py-1 md:w-auto lg:mt-0",
                !question?.is_correct && "bg-rose-700",
              )}
            >
              <p className="m-0 flex items-center text-sm font-semibold text-white">
                {question?.is_correct && (
                  <i className="i-ph-check-circle-fill mr-2" />
                )}
                {!question?.is_correct && (
                  <i className="i-ph-x-circle-fill mr-2" />
                )}
                {questionData?.data?.is_correct ? "Benar" : "Salah"}{" "}
                <span
                  className={cn(
                    "mx-2 text-emerald-600",
                    !question?.is_correct && "text-white",
                    !analyticsData.data.correct_answer_percentage && "hidden",
                  )}
                >
                  |
                </span>{" "}
                {analyticsData.data.correct_answer_percentage && (
                  <i className="i-ph-users-three mr-2" />
                )}
                <span
                  className={cn(
                    !analyticsData.data.correct_answer_percentage && "hidden",
                  )}
                >
                  {analyticsData.data.correct_answer_percentage}% menjawab benar
                </span>
              </p>
            </div>
          )}
        </div>
        {isLoading ? (
          <div className="my-8 flex flex-col gap-y-3">
            <div className="skeleton relative h-9 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
            <div className="skeleton relative mt-2 h-9 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
            <div className="skeleton relative mt-2 h-9 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
          </div>
        ) : (
          <div className="mb-8 mt-4 w-full p-4 md:p-0 lg:my-8">
            <RenderMarkdown markdown={questionData?.data?.content ?? ""} />
          </div>
        )}

        <div
          className={cn(
            "flex w-full grid-flow-col grid-cols-2 grid-rows-3 flex-col gap-4 p-4 md:p-0 lg:mb-12 lg:grid",
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
          ) : (
            question?.options.map(
              ({ id: choice_id, content, key, is_true }) => {
                const answer_option_id = question?.option_id;
                return (
                  <button
                    key={choice_id}
                    disabled
                    className={cn(
                      OptionBoxVariants({
                        variant:
                          answer_option_id == choice_id ? "active" : "inactive",
                      }),
                      answer_option_id == choice_id && is_true && correctChoice,
                      answer_option_id == choice_id && !is_true && wrongChoice,
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 min-h-8 w-8 min-w-8 items-center justify-center rounded-lg text-center align-middle group-hover:bg-gray-600",
                        answer_option_id == choice_id
                          ? "bg-gray-600"
                          : "bg-white",

                        answer_option_id != choice_id && "group-hover:bg-white",

                        answer_option_id == choice_id &&
                          is_true &&
                          "bg-emerald-50 group-hover:bg-emerald-50",

                        answer_option_id == choice_id &&
                          !is_true &&
                          "bg-red-50 group-hover:bg-red-50",
                      )}
                    >
                      {key}
                    </div>
                    <div></div>
                    <div className="leading-8">
                      <MathpixLoader>
                        <MathpixMarkdown text={content} />
                      </MathpixLoader>
                    </div>
                  </button>
                );
              },
            )
          )}
        </div>

        <div className="relative mt-12 w-full p-4 md:p-0 lg:m-0 lg:mt-0">
          <div className="relative rounded-md border-2 border-gray-200 px-4">
            <Tabs
              onValueChange={(value) => {
                setIsPenjelasan(value === "penjelasan");
              }}
              value={isPenjelasan ? "penjelasan" : "analitika"}
              className="pb-5"
            >
              <TabsList className="absolute -top-4  flex w-64 rounded-full bg-gray-200 p-1 text-gray-500 shadow-inner">
                <TabsTrigger
                  value="penjelasan"
                  className="h-min w-full min-w-max rounded-full px-3 py-0.5 data-[state=on]:border data-[state=on]:border-emerald-500 data-[state=on]:bg-emerald-400 data-[state=on]:text-white"
                >
                  <p className="m-0 flex items-center font-semibold">
                    <i className="i-ph-info mr-2" /> Penjelasan
                  </p>
                </TabsTrigger>
                <TabsTrigger
                  value="analitika"
                  className="h-min w-full min-w-max rounded-full px-3 py-0.5 data-[state=on]:border data-[state=on]:border-emerald-500 data-[state=on]:bg-emerald-400 data-[state=on]:text-white"
                >
                  <p className="m-0 flex items-center font-semibold">
                    <i className="i-ph-chart-line-up mr-2" /> Analitika
                  </p>
                </TabsTrigger>
              </TabsList>
              <div className="h-12 w-full"></div>
              <TabsContent value="penjelasan">
                <ExplanationContainers
                  explanationData={explanationData}
                  isUpgraded={isUpgraded}
                  toggleLike={toggleLike}
                />
              </TabsContent>
              <TabsContent value="analitika">
                {analyticsData && (
                  <AnalyticsContainer analyticsData={analyticsData} />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  );
}
