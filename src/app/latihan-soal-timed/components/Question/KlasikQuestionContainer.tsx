"use client";
import { MAPEL_MAPPING } from "@/app/dashboard/latihan-soal/TopicCard";
import PembahasanContainer from "@/app/latihan-soal/components/PembahasanContainer";
import { Modal } from "@/components/ui/modal";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  useAttemptLatihanSoalTimedMutation,
  useGetLatihanSoalDetailQuery,
  useGetLatihanSoalTimedAttemptQuery,
  useGetPembahasanQuery,
  useLazyGetAllAttemptedCurrentQuestionsQuery,
  useUpdateTimedCurrentQuestionMutation,
} from "@/redux/api/latihanSoalApi";
import { Subject } from "@/types";
import { ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import { useLatihanContext } from "../../context/LatihanContext";
import Timer from "../Timer";
import { HasilLatianCard } from "../modals/HasilLatian";
import { QuestionContent } from "./QuestionContent";
import { QuestionNavigator } from "./QuestionNavigator";
import { SelesaikanLatihanButton } from "./SelesaikanLatihanButton";

export const KlasikQuestionContainer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    slug,
    handleSubmitLatihan,
    selectedSubject,
    soalIds,
    openSummary,
    setOpenSummary,
    timedSoalData,
    subjects,
  } = useLatihanContext();

  const [endTime, setEndTime] = useState<Date>();

  const { data, isLoading, refetch } = useGetLatihanSoalDetailQuery(
    {
      id: soalIds[parseInt(slug?.[2] || "1") - 1] || "",
    },
    {
      skip: !slug?.[2] || !soalIds[parseInt(slug?.[2] || "1") - 1],
    },
  );

  const [getRiwayatTimedLatihanSoal, { data: riwayatTimedLatihanSoal }] =
    useLazyGetAllAttemptedCurrentQuestionsQuery();

  const [attemptQuestion] = useAttemptLatihanSoalTimedMutation();
  const { data: attemptData } = useGetLatihanSoalTimedAttemptQuery(
    {
      timed_question_id: slug?.[0] || "",
      question_id: soalIds[parseInt(slug?.[2] || "1") - 1] || "",
    },
    {
      skip: !slug?.[2] || !soalIds[parseInt(slug?.[2] || "1") - 1],
    },
  );

  const { data: pembahasanData } = useGetPembahasanQuery(
    {
      question_id: soalIds[parseInt(slug?.[2] || "1") - 1] || "",
      attempt_id: attemptData?.data?.id || "",
    },
    {
      skip: slug?.slice(-1)[0] != "feedback" || !attemptData?.data?.id,
    },
  );

  const handleAttemptQuestion = async (
    choice_id: string,
    answer_history: string,
  ) => {
    await attemptQuestion({
      timed_question_id: slug?.[0] || "",
      question_id: data?.data.id || "",
      choice_id,
      answer_history,
      answers: [],
    });
  };

  const handleNavigateQuestion = async (action: "prev" | "next") => {
    const splittedPath = pathname.split("/");
    const basePath = splittedPath.slice(0, -1).join("/");
    const prevNum = parseInt(splittedPath.slice(-1)[0]);
    const newNum = action == "next" ? prevNum + 1 : prevNum - 1;
    router.replace(`${basePath}/${newNum}`, {
      scroll: false,
    });
  };
  const [updateCurrentQuestion] = useUpdateTimedCurrentQuestionMutation();

  const handleChangeQuestion = async (
    question_id: string,
    idx: number,
    subjectId: string,
  ) => {
    await updateCurrentQuestion({
      timed_question_id: slug?.[0] || "",
      question_id,
      current_number: idx,
    });
    refetch();
    const basePath = pathname.split("/").slice(0, -1).join("/");

    if (selectedSubject.id != subjectId) {
      const subject = subjects?.find(({ id }) => id == subjectId);
      const subjectSlug = MAPEL_MAPPING[subject?.name as string].slug;
      router.push(
        `/latihan-soal-timed/classic/${slug?.[0] || ""}/${subjectSlug}/${idx + 1}`,
        {
          scroll: false,
        },
      );
    } else {
      router.push(`${basePath}/${idx + 1}`, {
        scroll: false,
      });
    }
  };

  useEffect(() => {
    if (!!timedSoalData) {
      const start = new Date(timedSoalData.created_at);
      const end = new Date(start.getTime() + timedSoalData.time_limit * 1000);
      setEndTime(end);
    }
  }, [timedSoalData]);

  return isLoading ? (
    <div className="px-5 py-5 md:px-10">
      <div>
        <div className="skeleton relative mt-2 h-48 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="skeleton relative mt-2 h-10 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"
          />
        ))}
      </div>
    </div>
  ) : !!data?.data ? (
    <div className="relative flex min-h-screen w-full flex-col gap-1 py-5 md:px-10 lg:min-h-0 lg:px-5">
      <MediaQuery maxWidth={1023}>
        <div className="px-5">
          <div className="mb-5 flex w-full items-center justify-between rounded-lg bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center p-4 text-sm font-700 text-white">
            <div>
              {selectedSubject?.alternate_name} | No {slug?.[2] || ""}
            </div>
            <div>{endTime && <Timer endTime={endTime} />}</div>
          </div>
        </div>
        <Sheet>
          <SheetTrigger
            asChild
            className="sticky left-0 top-10 z-20"
            onClick={() => {
              getRiwayatTimedLatihanSoal({ id: slug?.[0] || "" });
            }}
          >
            <button className="h-10 w-7 rounded-r-full bg-emerald-400 font-700 text-white">
              <ChevronRight />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="overflow-auto bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center"
          >
            <h4 className="font-700 text-white">
              {selectedSubject?.alternate_name} | No {slug?.[2] || ""}
            </h4>
            <div className="mt-5">
              {endTime && <Timer endTime={endTime} />}
              {riwayatTimedLatihanSoal &&
                subjects &&
                riwayatTimedLatihanSoal.data.subject_ids.map((subjectId) => {
                  const label = (subjects as Subject[]).find(
                    ({ id }) => id == subjectId,
                  )?.alternate_name as string;

                  const currentSubjectQuestionList =
                    riwayatTimedLatihanSoal.data.questions[subjectId];
                  const length = Object.keys(currentSubjectQuestionList).length;
                  const alreadyAnswered =
                    riwayatTimedLatihanSoal.data.questions[subjectId].filter(
                      (question) => question.is_attempted,
                    ).length;
                  return (
                    <div key={subjectId} className="mt-5">
                      <div className="flex items-center justify-between gap-2 font-600 text-white">
                        <p className=" mb-0">{label}</p>
                        <h6 className="text-white">
                          {alreadyAnswered}/{length}
                        </h6>
                      </div>
                      <div className="mt-1 grid grid-cols-5 gap-1 rounded-lg bg-emerald-900/20 p-1 shadow-inner">
                        {riwayatTimedLatihanSoal.data.questions[subjectId].map(
                          ({ is_attempted, question_id }, idx) => {
                            const isCurrentNumber = data.data.id == question_id;
                            return (
                              <button
                                key={question_id}
                                onClick={() => {
                                  handleChangeQuestion(
                                    question_id,
                                    idx,
                                    subjectId,
                                  );
                                }}
                                style={
                                  is_attempted
                                    ? {
                                        boxShadow:
                                          "0px 1px 2px 0px rgba(0, 0, 0, 0.05), 0px 1px 1px 0px rgba(255, 255, 255, 0.2) inset",
                                        background: "white",
                                      }
                                    : {}
                                }
                                className={cn(
                                  "flex items-center justify-center rounded-md font-600",
                                  !is_attempted && "text-white",
                                  isCurrentNumber &&
                                    "!bg-emerald-400 text-white",
                                )}
                              >
                                {idx + 1}
                              </button>
                            );
                          },
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="mt-5">
              <SheetClose className="w-full">
                <SelesaikanLatihanButton />
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </MediaQuery>
      <div className="px-5">
        <div className="font-bold">
          <p className="m-0 mb-2 text-3xl">{selectedSubject?.name}</p>
          <p className="text-lg text-gray-500">{data.data.topic}</p>
        </div>
        <div className="flex flex-grow flex-col justify-between">
          <QuestionContent
            content={data.data.content}
            options={data.data.options.map(({ id, content, key }) => ({
              id,
              content: content,
              key: key,
            }))}
            attempt={
              !!attemptData?.data
                ? {
                    id: attemptData.data.id || "",
                    choice_id: attemptData.data.choice_id || "",
                  }
                : undefined
            }
            handleAnswerQuestion={handleAttemptQuestion}
            pembahasanData={pembahasanData?.data}
            timedQuestionId={slug?.[0] || ""}
          />

          {!!pembahasanData && (
            <div className="pt-6">
              <PembahasanContainer data={pembahasanData.data} attemptId={""} />
            </div>
          )}
          <QuestionNavigator
            hasPrev={parseInt(slug?.slice(-1)[0] || "1") > 1}
            hasNext={parseInt(slug?.slice(-1)[0] || "1") < soalIds.length}
            handleNext={() => {
              handleNavigateQuestion("next");
            }}
            handlePrev={() => {
              handleNavigateQuestion("prev");
            }}
            handleSubmit={handleSubmitLatihan}
          />
        </div>
      </div>
    </div>
  ) : (
    <Modal open={openSummary} setOpen={setOpenSummary} permanent>
      <HasilLatianCard timedQuestionId={slug?.[0] || ""} />
    </Modal>
  );
};
