import Iconify from "@/components/Iconify";
import { cn, replaceSubjectName } from "@/lib/utils";
import {
  useGetLatihanSoalClassicBySubjectQuery,
  useGetLatihanSoalTimedCurrentQuestionQuery,
  useGetLatihanSoalTimedQuery,
  useGetSubjectsQuery,
  useUpdateTimedCurrentQuestionMutation,
} from "@/redux/api/latihanSoalApi";
import * as Accordion from "@radix-ui/react-accordion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import { useLatihanContext } from "../../context/LatihanContext";
import { SelesaikanLatihanButton } from "../Question/SelesaikanLatihanButton";
import Timer from "../Timer";
import { LatihanAsideContainer } from "./LatihanAsideContainer";
import { SoalTracker } from "./SoalTracker";
import { SoalTrackerSkeleton } from "./SoalTrackerSkeleton";
export const KlasikAside = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    subjects,
    setSubjects,
    slug,
    timedSoalData,
    setTimedSoalData,
    setSoalIds,
    selectedSubject,
    setSelectedSubject,
    isSuccessSummary,
  } = useLatihanContext();

  const { data: soalData } = useGetLatihanSoalTimedQuery(undefined, {
    skip: !!timedSoalData,
  });
  const { data: subjectsData } = useGetSubjectsQuery(undefined, {
    skip: subjects.length > 0,
  });
  const [endTime, setEndTime] = useState<Date>();

  const { data: currentQuestionData, refetch: refetchCurrentQuestion } =
    useGetLatihanSoalTimedCurrentQuestionQuery({
      timed_question_id: slug?.[0] || "",
    });
  const { data: currentSoalData, isLoading: currentSoalLoading } =
    useGetLatihanSoalClassicBySubjectQuery(
      {
        timed_question_id: slug?.[0] || "",
        subject_id: selectedSubject?.id || "",
      },
      {
        skip: !selectedSubject,
      },
    );

  const [updateCurrentQuestion] = useUpdateTimedCurrentQuestionMutation();

  const handleChangeQuestion = async (question_id: string, idx: number) => {
    await updateCurrentQuestion({
      timed_question_id: slug?.[0] || "",
      question_id,
      current_number: idx,
    });
    refetchCurrentQuestion();
    const basePath = pathname.split("/").slice(0, -1).join("/");
    router.push(`${basePath}/${idx + 1}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    if ((!selectedSubject || !slug?.[1]) && !!timedSoalData) {
      const currentSubject =
        subjects.find(({ slug: subjectSlug }) => {
          return subjectSlug == slug?.[1];
        }) || subjects[0];
      if (!!currentSubject) {
        setSelectedSubject(currentSubject);

        router.push(
          `/latihan-soal-timed/classic/${slug?.[0] || ""}/${currentSubject.slug}/${slug?.[2] ?? 1}`,
        );
      }
    }
    if (subjectsData && subjects.length == 0) {
      setSubjects(subjectsData.data);
    }
    if (!!timedSoalData) {
      const start = new Date(timedSoalData.created_at);
      const end = new Date(start.getTime() + timedSoalData.time_limit * 1000);
      console.log(end);
      setEndTime(end);
    }
    if (!!currentSoalData?.data) {
      setSoalIds(Object.keys(currentSoalData.data));
    }
    if (!!soalData) {
      setTimedSoalData(soalData.data);
    }
  }, [
    subjectsData,
    slug,
    timedSoalData,
    currentQuestionData,
    currentSoalData,
    soalData,
    selectedSubject,
  ]);

  useEffect(() => {
    if (slug?.[1]) {
      const value = slug[1];
      const currentSubject = subjects.find(({ slug: subjectSlug }) => {
        return subjectSlug == value;
      });
      if (currentSubject) {
        setSelectedSubject(currentSubject);
      }
    }
  }, [slug?.[1]]);

  useEffect(() => {
    if (currentSoalData) {
      const questionId = Object.keys(currentSoalData.data)[0];
      updateCurrentQuestion({
        timed_question_id: slug?.[0] || "",
        question_id: questionId,
        current_number: 0,
      });
    }
  }, [currentSoalData]);

  return (
    <MediaQuery minWidth={1024}>
      <LatihanAsideContainer>
        <div className="hidden flex-col gap-3 px-5 pb-5 lg:flex">
          {!!endTime && !isSuccessSummary && <Timer endTime={endTime} />}
          <Accordion.Root
            className="flex grow flex-col"
            type="single"
            defaultValue={`${slug?.[1] || ""}`}
            value={`${slug?.[1] || ""}`}
            onValueChange={(value) => {
              router.replace(
                `/latihan-soal-timed/classic/${slug?.[0] || ""}/${value}/1`,
              );
            }}
          >
            {subjects.length == 0 && (
              <div>
                <div className="skeleton h-32 w-full rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
                <div className="skeleton h-32 w-full rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
                <div className="skeleton h-32 w-full rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
                <div className="skeleton h-32 w-full rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
                <div className="skeleton h-32 w-full rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
                <div className="skeleton h-32 w-full rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
              </div>
            )}
            {subjects.map(({ alternate_name, icon }) => {
              const subjectName = replaceSubjectName(alternate_name);
              const slugName = subjectName.toLowerCase().replace(" ", "-");

              return (
                <Accordion.Item
                  key={alternate_name}
                  value={`${slugName}`}
                  className="group relative mb-2 flex flex-col justify-center rounded-xl bg-cover py-1 data-[state=closed]:h-11 data-[state=open]:grow data-[state=closed]:animate-slide-up-item data-[state=open]:animate-slide-down-item data-[state=closed]:overflow-hidden data-[state=open]:overflow-visible data-[state=open]:bg-[url('/bg-mesh-horizontal.webp')]"
                >
                  <Accordion.Trigger className="group z-10 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xl font-[650] text-content-300 outline-none transition-colors data-[state=open]:cursor-default data-[state=open]:text-surface-100 data-[state=closed]:focus-within:text-content-100 data-[state=closed]:hover:text-content-100">
                    <Image
                      src={icon}
                      alt={subjectName}
                      width={20}
                      height={20}
                      className="w-5 text-black"
                    />
                    <p className="mb-0 grow truncate text-left">
                      {subjectName}
                    </p>
                    <Iconify
                      icon="ph:caret-down-bold"
                      className="transition-transform duration-500 group-data-[state=open]:rotate-180"
                    />
                  </Accordion.Trigger>
                  <Accordion.Content
                    forceMount
                    className={cn(
                      "z-10 flex grow flex-col px-1 pb-1 pt-2 duration-100 data-[state=closed]:h-0 data-[state=closed]:animate-slide-up-content data-[state=open]:animate-slide-down-content",
                    )}
                  >
                    <div className="overflow-hidden">
                      {!currentSoalLoading &&
                      !!currentSoalData?.data &&
                      slug?.[0] ? (
                        <div className="overflow-hidden">
                          <SoalTracker
                            maxNumber={Object.keys(currentSoalData.data).length}
                            handleNumberClick={handleChangeQuestion}
                            classicSoalData={currentSoalData.data}
                          />
                        </div>
                      ) : (
                        <SoalTrackerSkeleton />
                      )}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              );
            })}
          </Accordion.Root>
          <SelesaikanLatihanButton />
        </div>
      </LatihanAsideContainer>
    </MediaQuery>
  );
};
