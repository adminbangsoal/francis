"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useAttemptLatihanSoalMutation,
  useGetAttemptLatihanSoalQuery,
  useSubmitLatihanSoalMutation,
} from "@/redux/api/latihanSoalApi";
import { LatihanSoalAttemptResponse, QuestionType } from "@/types";
import * as Separator from "@radix-ui/react-separator";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [submitMutation, { isLoading: isSubmitting, error: submitError }] = useSubmitLatihanSoalMutation();
  const [attemptSoal, { isSuccess, data: attemptData, isLoading: isAttempting }] =
    useAttemptLatihanSoalMutation();
  const { data: latestAttemptData, refetch: refetchAttempt } = useGetAttemptLatihanSoalQuery(
    { question_id: slug?.[1] || "" },
    { skip: !slug?.[1] }
  );
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Use latest attempt data if available, otherwise fall back to prop data
  const currentAttemptData = latestAttemptData || data;

  const currentNumber = soalData.findIndex((item) => item.id === slug?.[1]);
  const isLastNumber = currentNumber === soalData.length - 1;
  const isFirstNumber = currentNumber === 0;

  useEffect(() => {
    if (isSuccess && attemptData && questionType === "fill-in" && !isProcessing) {
      setIsProcessing(true);
      submitMutation({
        attempt_id: attemptData.data.id,
        question_id: slug?.[1] || "",
      })
        .unwrap()
        .catch((error) => {
          console.error("Error submitting attempt:", error);
          setIsProcessing(false);
        });
    }
  }, [isSuccess, attemptData, questionType, isProcessing]);

  // Reset processing state when question changes
  useEffect(() => {
    setIsProcessing(false);
  }, [slug?.[1]]);

  const next = () => {
    router.replace(
      `/latihan-soal/${slug?.[0] || ""}/${soalData[currentNumber + 1].id}`,
    );
  };

  const prev = () => {
    router.replace(
      `/latihan-soal/${slug?.[0] || ""}/${soalData[currentNumber - 1].id}`,
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
        disabled={disableCekJawaban || isSubmitting || isAttempting || isProcessing || (!currentAttemptData?.data?.id && questionType !== "fill-in")}
        onClick={async () => {
          if (isSubmitting || isAttempting || isProcessing) return;
          
          if (
            questionType === "multiple-choice" ||
            questionType === "multiple-answer" ||
            questionType === "table-choice"
          ) {
            // Ensure we have a valid attempt_id by refetching if needed
            let attemptId = currentAttemptData?.data?.id;
            
            if (!attemptId || attemptId.startsWith("temp-")) {
              // Refetch to get the latest attempt data
              const { data: refetchedData } = await refetchAttempt();
              attemptId = refetchedData?.data?.id;
              
              // Wait a bit more if still not available
              if (!attemptId || attemptId.startsWith("temp-")) {
                let attempts = 0;
                while ((!attemptId || attemptId.startsWith("temp-")) && attempts < 5) {
                  await new Promise((resolve) => setTimeout(resolve, 300));
                  const { data: retryData } = await refetchAttempt();
                  attemptId = retryData?.data?.id;
                  attempts++;
                }
              }
              
              // If still no valid attempt_id, show error and return
              if (!attemptId || attemptId.startsWith("temp-")) {
                alert("Jawaban belum tersimpan. Silakan pilih jawaban lagi dan tunggu sebentar sebelum klik Cek Jawaban.");
                return;
              }
            }
            
            setIsProcessing(true);
            try {
              await submitMutation({
                attempt_id: attemptId,
                question_id: slug?.[1] || "",
              }).unwrap();
            } catch (error: any) {
              console.error("Error submitting attempt:", error);
              setIsProcessing(false);
              
              // Show user-friendly error message
              if (error?.status === 404 || error?.data?.message?.includes("not found")) {
                alert("Jawaban belum tersimpan. Silakan pilih jawaban lagi dan tunggu sebentar sebelum klik Cek Jawaban.");
              }
            }
          } else if (questionType == "fill-in") {
            const input = document.querySelectorAll(
              "input",
            ) as NodeListOf<HTMLInputElement>;
            const answers = Array.from(input).map((item) => item.value);
            setIsProcessing(true);
            try {
              await attemptSoal({
                answer_history: answers.join(","),
                answers: answers,
                choice_id: undefined,
                question_id: slug?.[1] || "",
              }).unwrap();
            } catch (error) {
              console.error("Error attempting question:", error);
              setIsProcessing(false);
            }
          }
        }}
        variant="emerald"
        className="mb-32 w-full rounded-full disabled:bg-gray-200 disabled:text-gray-400 md:mb-0 lg:w-fit"
      >
        {isSubmitting || isProcessing ? "Memproses..." : "Cek Jawaban"}
      </Button>
    </div>
  );
};

export default QuestionNavigator;
