"use client";
import { Button } from "@/components/ui/button";
import { cn, replaceSubjectName } from "@/lib/utils";
import { useRouter } from "next/navigation";
import MediaQuery from "react-responsive";
import { useLatihanContext } from "../../context/LatihanContext";
import { SelesaikanLatihanButton } from "./SelesaikanLatihanButton";

interface QuestionNavigatorI {
  hasNext: boolean;
  hasPrev?: boolean;
  handleNext: () => void;
  handlePrev?: () => void;
  handleSubmit: () => void;
  isSekuensial?: boolean;
}
export const QuestionNavigator = ({
  hasNext,
  hasPrev,
  handleNext,
  handlePrev,
  handleSubmit,
  isSekuensial = false,
}: QuestionNavigatorI) => {
  const router = useRouter();
  const { selectedSubject, subjects, slug, setSelectedSubject } =
    useLatihanContext();
  const currentSubjectIndex = subjects.findIndex(
    (subject) => subject == selectedSubject,
  );
  return (
    <div className="pt-5">
      <div className="flex flex-row items-center gap-4">
        <div className="hidden h-[1px] w-10 bg-neutral-100 lg:block" />
        {!isSekuensial && (
          <MediaQuery maxWidth={1023}>
            <div className="flex w-full gap-x-2">
              <Button
                disabled={!hasPrev}
                onClick={handlePrev}
                variant="bsPrimary"
                className="flex-grow"
              >
                <i className="i-ph-arrow-left size-5 text-white" />
              </Button>
              {hasNext && (
                <Button
                  disabled={!hasNext}
                  onClick={handleNext}
                  variant="bsPrimary"
                  className="flex-grow"
                >
                  <i className="i-ph-arrow-right size-5 text-white" />
                </Button>
              )}
            </div>
          </MediaQuery>
        )}
        {!isSekuensial && (
          <>
            <MediaQuery minWidth={1024}>
              <button
                disabled={!hasPrev}
                onClick={handlePrev}
                className={cn(
                  "flex items-center rounded-full bg-gray-100 p-2",
                  hasPrev && "group hover:bg-emerald-500",
                )}
              >
                <i className="i-ph-arrow-left-bold h-[16px] w-[16px] text-gray-500 group-hover:text-white" />
              </button>
            </MediaQuery>
          </>
        )}
        <div className="hidden h-[1px] grow bg-neutral-100 lg:block" />
        {isSekuensial ? (
          <Button
            className="w-full lg:w-auto"
            variant={hasNext ? "bsPrimary" : "danger"}
            onClick={() => {
              if (hasNext) {
                handleNext();
              } else {
                handleSubmit();
              }
            }}
          >
            {hasNext ? "Selanjutnya" : "Selesaikan Latihan"}
          </Button>
        ) : hasNext ? (
          <MediaQuery minWidth={1024}>
            <Button variant={"bsPrimary"} onClick={handleNext}>
              Selanjutnya
            </Button>
          </MediaQuery>
        ) : currentSubjectIndex == subjects.length - 1 ? (
          <div className="w-full lg:w-auto">
            <SelesaikanLatihanButton />
          </div>
        ) : (
          <Button
            variant={"bsPrimary"}
            onClick={() => {
              const nextSubject = subjects[currentSubjectIndex + 1];
              setSelectedSubject(nextSubject);
              const subjectName = replaceSubjectName(
                nextSubject.alternate_name,
              );
              const slugName = subjectName.toLowerCase().replace(" ", "-");
              router.replace(
                `/latihan-soal-timed/classic/${slug[0]}/${slugName}/1`,
              );
            }}
          >
            Subjek Selanjutnya
          </Button>
        )}
      </div>
    </div>
  );
};
