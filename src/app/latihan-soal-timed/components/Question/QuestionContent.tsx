"use client";
import RenderMarkdown from "@/app/latihan-soal/components/RenderMarkdown";
import { OptionBoxVariants } from "@/app/latihan-soal/components/style";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import { Content, PembahasanQuestion } from "@/types";
import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import { useLatihanContext } from "../../context/LatihanContext";
import { HasilLatianCard } from "../modals/HasilLatian";

interface QuestionContentI {
  content: Content[];
  options: {
    id: string;
    content: string;
    key: string;
  }[];
  handleAnswerQuestion?: (
    choice_id: string,
    answer_history: string,
  ) => Promise<void>;
  pembahasanData?: PembahasanQuestion;
  attempt?: {
    id: string;
    choice_id: string;
  };
  topic?: string;
  subject?: string;
  currentNumber?: number;
  timedQuestionId: string;
}

export const QuestionContent = ({
  handleAnswerQuestion,
  pembahasanData,
  content,
  options,
  attempt,
  topic,
  subject,
  currentNumber,
  timedQuestionId,
}: QuestionContentI) => {
  const [choiceId, setChoiceId] = useState<string[]>([]);

  const handleChoiceClick = async (
    choice_id: string,
    answer_history: string,
  ) => {
    if (handleAnswerQuestion) {
      setChoiceId([choice_id]);
      await handleAnswerQuestion(choice_id, answer_history);
    }
  };

  const {
    handleSubmitLatihan,
    openConfirmModal,
    setOpenConfirmModal,
    openSummary,
    setOpenSummary,
    isRiwayatPage,
  } = useLatihanContext();

  useEffect(() => {
    if (attempt?.choice_id) {
      setChoiceId([attempt.choice_id]);
    }
  }, [attempt?.choice_id]);

  return (
    <div className="relative">
      {subject && currentNumber && (
        <div className="flex items-center justify-between">
          <p className="m-0 p-0 text-3xl font-bold text-black">{subject}</p>
          <MediaQuery minWidth={1024}>
            <p className="mt-2 p-0 font-quicksand text-2xl font-700">
              {currentNumber}
            </p>
          </MediaQuery>
        </div>
      )}
      <Modal open={openConfirmModal} setOpen={setOpenConfirmModal}>
        <div className="flex flex-col">
          <p className="font-bold">Pastikan semua soal telah terjawab!</p>
          <div className="flex flex-row gap-3">
            <Button
              variant={"bsSecondary"}
              onClick={() => {
                setOpenConfirmModal(false);
              }}
              className="grow text-gray-800"
            >
              Batal
            </Button>
            <Button
              className="grow"
              variant={"danger"}
              onClick={handleSubmitLatihan}
            >
              Selesaikan
            </Button>
          </div>
        </div>
      </Modal>
      {!isRiwayatPage && (
        <Modal open={openSummary} setOpen={setOpenSummary} permanent>
          <HasilLatianCard timedQuestionId={timedQuestionId} />
        </Modal>
      )}
      <p className="mb-4 text-lg font-600 text-gray-400">{topic}</p>
      <div>
        {content.map(({ content, isMedia }, index) => {
          return (
            <RenderMarkdown
              key={index}
              className="text-lg"
              asset={isMedia ? content : undefined}
              markdown={isMedia ? "" : content}
            />
          );
        })}
        {!attempt && isRiwayatPage && (
          <h5 className="pt-8 font-600 text-rose-500 ">
            Kamu tidak menjawab soal ini!
          </h5>
        )}
        <div className="mt-8 grid w-full grid-cols-1 gap-3 md:grid-cols-2">
          {options.map(({ id, content, key }) => {
            const selected = choiceId.includes(id);

            const buttonStyle = !isRiwayatPage
              ? [
                  "group-hover:bg-gray-600",
                  selected ? "bg-gray-600" : "bg-white",
                ]
              : [
                  !!pembahasanData &&
                    selected &&
                    (pembahasanData.is_correct
                      ? "bg-emerald-50 font-700"
                      : "bg-rose-50 text-rose-800 font-800"),
                ];
            return (
              <button
                key={id}
                disabled={!(typeof handleAnswerQuestion === "function")}
                onClick={() => handleChoiceClick(id, content)}
                className={cn(
                  OptionBoxVariants({
                    variant: selected ? "active" : "inactive",
                  }),
                  isRiwayatPage &&
                    pembahasanData &&
                    (pembahasanData.is_correct
                      ? "cursor-default bg-emerald-100 font-500 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-700"
                      : "cursor-default bg-rose-100 font-800 text-rose-800 hover:bg-rose-100 hover:text-rose-800"),
                )}
              >
                <div
                  className={cn(
                    "flex h-8 min-h-8 w-8 min-w-8 items-center justify-center rounded-lg bg-white text-center align-middle",
                    ...buttonStyle,
                  )}
                >
                  {key}
                </div>
                <RenderMarkdown
                  markdown={content}
                  className={cn(
                    !isRiwayatPage && selected && "text-white",
                    !isRiwayatPage && "group-hover:text-white",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
