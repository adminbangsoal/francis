"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useAttemptLatihanSoalMutation,
  useSubmitLatihanSoalMutation,
} from "@/redux/api/latihanSoalApi";
import { LatihanSoalAttemptResponse, QuestionType } from "@/types";
import * as Separator from "@radix-ui/react-separator";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLatihanSoalContext } from "../context";

const QuestionNavigator = ({
  disableCekJawaban,
  data,
  questionType,
}: {
  disableCekJawaban: boolean;
  data: LatihanSoalAttemptResponse | undefined;
  questionType: QuestionType;
}) => {
  const router = useRouter();
  const { slug } = useParams();
  const { soalData } = useLatihanSoalContext();
  const [submitMutation] = useSubmitLatihanSoalMutation();
  const [attemptSoal, { isSuccess, data: attemptData }] =
    useAttemptLatihanSoalMutation();

  const currentNumber = soalData.findIndex((item) => item.id === slug[1]);
  const isLastNumber = currentNumber === soalData.length - 1;
  const isFirstNumber = currentNumber === 0;

  useEffect(() => {
    if (isSuccess && attemptData && questionType === "fill-in") {
      submitMutation({
        attempt_id: attemptData.data.id,
        question_id: slug[1],
      });
    }
  }, [isSuccess, attemptData]);

  const next = () => {
    router.replace(
      `/latihan-soal/${slug[0]}/${soalData[currentNumber + 1].id}`,
    );
  };

  const prev = () => {
    router.replace(
      `/latihan-soal/${slug[0]}/${soalData[currentNumber - 1].id}`,
    );
  };

  return (
    <div className="flex items-center lg:justify-between lg:gap-x-2">
      <div className="flex gap-x-4">
        <button
          disabled={!currentNumber}
          onClick={() => {
            prev();
          }}
          className={cn(
            "hidden h-[36px] w-[36px] items-center justify-center rounded-full bg-gray-100 lg:flex",
            !isFirstNumber && "group hover:bg-emerald-600",
          )}
        >
          <div className="i-ph-arrow-left-bold h-[16px] w-[16px] text-gray-500 group-hover:text-white"></div>
        </button>
        <button
          disabled={currentNumber === soalData.length - 1}
          onClick={() => {
            next();
          }}
          className={cn(
            "hidden h-[36px] w-[36px] items-center justify-center rounded-full bg-gray-100 lg:flex",
            !isLastNumber && "group hover:bg-emerald-600",
          )}
        >
          <div className="i-ph-arrow-right-bold h-[16px] w-[16px] text-gray-500 group-hover:text-white"></div>
        </button>
      </div>
      <Separator.Root
        orientation="horizontal"
        className="hidden h-[2px] bg-gray-100 lg:flex-grow"
      />
      <Button
        disabled={disableCekJawaban}
        onClick={() => {
          if (data) {
            if (
              questionType === "multiple-choice" ||
              questionType === "multiple-answer" ||
              questionType === "table-choice"
            ) {
              submitMutation({
                attempt_id: data?.data.id,
                question_id: slug[1],
              });
            } else if (questionType == "fill-in") {
              const input = document.querySelectorAll(
                "input",
              ) as NodeListOf<HTMLInputElement>;
              const answers = Array.from(input).map((item) => item.value);
              attemptSoal({
                answer_history: answers.join(","),
                answers: answers,
                choice_id: undefined,
                question_id: slug[1],
              });
            }
          }
        }}
        variant="emerald"
        className="mb-32 w-full rounded-full disabled:bg-gray-200 disabled:text-gray-400 md:mb-0 lg:w-fit"
      >
        Cek Jawaban
      </Button>
    </div>
  );
};

export default QuestionNavigator;
