import Nav from "@/app/components/Navbar";
import Iconify from "@/components/Iconify";
import { Button } from "@/components/ui/button";
import { Subject } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import { useLatihanSoalContext } from "../context";
import Filters from "./Filters";
import SoalSelector from "./SoalSelector";

interface SoalAsideProps {
  subject: Subject;
}

const SoalAsideMobile = ({ subject }: SoalAsideProps) => {
  const { slug } = useParams();

  const router = useRouter();

  const {
    soalData,
    setDefaultValueTabIndex,
    selectedSubject,
    setSelectedSubject,
    subjects,
    yearRange,
    setYearRange,
    currentTopic,
    setCurrentTopic,
    setSelectedTopicId,
    setSoalData,
    activeSubjectIndex,
    setActiveSubjectIndex,
  } = useLatihanSoalContext();

  const [openFilters, setOpenFilters] = useState<boolean>(false);

  const currentNumber = soalData.findIndex((item) => item.id === slug[1]);

  const next = () => {
    if (currentNumber < soalData.length - 1) {
      router.replace(
        `/latihan-soal/${subject.slug}/${soalData[currentNumber + 1].id}`,
      );
    }
  };

  const prev = () => {
    if (currentNumber >= 0) {
      router.replace(
        `/latihan-soal/${subject.slug}/${soalData[currentNumber - 1].id}`,
      );
    }
  };

  // force update selected subject with the current active index
  useEffect(() => {
    if (!openFilters) {
      if (selectedSubject && activeSubjectIndex >= 0) {
        if (selectedSubject?.id !== subjects[activeSubjectIndex].id) {
          setSoalData([]);
          setSelectedSubject(subjects[activeSubjectIndex]);
          router.replace(`/latihan-soal/${subjects[activeSubjectIndex].slug}`);
        }
      }

      // force update to the first question when the given id is not found
      if (
        soalData.length > 0 &&
        slug[1] &&
        !soalData.find(({ id }) => id == slug[1])
      ) {
        setDefaultValueTabIndex(0);
        router.replace(`/latihan-soal/${subject.slug}/${soalData[0].id}`);
      }
    }
  }, [activeSubjectIndex, openFilters, soalData, selectedSubject]);

  return (
    <MediaQuery maxWidth={767}>
      <div className="fixed z-30">
        <Nav />
      </div>
      <div className="fixed bottom-0 z-20 w-full rounded-t-lg bg-white shadow-2xl">
        {activeSubjectIndex >= 0 && subjects[activeSubjectIndex] && (
          <SoalSelector
            filtersOpened={openFilters}
            subject_id={subject.id}
            min_year={yearRange[subject.slug][0]}
            max_year={yearRange[subject.slug][1]}
            subjectSlug={subject.slug}
            topic_id={currentTopic[subject.slug]}
          />
        )}
        <div className="flex gap-x-2 px-5 py-5">
          <Button
            onClick={() => {
              prev();
            }}
            disabled={currentNumber === 0}
            variant="emerald"
            className="h-7 flex-grow rounded-full shadow disabled:bg-gray-200 disabled:text-gray-400 lg:w-fit"
          >
            <Iconify icon="ph:caret-left-bold" className="text-lg" />
          </Button>
          <Button
            disabled={currentNumber === soalData.length - 1}
            onClick={() => {
              next();
            }}
            variant="emerald"
            className="h-7 flex-grow rounded-full shadow disabled:bg-gray-200 disabled:text-gray-400 lg:w-fit"
          >
            <Iconify icon="ph:caret-right-bold" className="text-lg" />
          </Button>
        </div>
        <div className="px-5 pb-2">
          <Button
            onClick={() => {
              setOpenFilters(true);
            }}
            className="w-full rounded-full"
          >
            Filters
          </Button>
        </div>
        <AnimatePresence>
          {openFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-30 flex items-end justify-center bg-black bg-opacity-50"
              />
              <motion.div
                initial={{ y: "100vh", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100vh", opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="fixed inset-0 z-30 flex items-end justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenFilters(false);
                }}
              >
                <div
                  className="flex w-full flex-col gap-3 rounded-lg bg-white shadow-xl lg:max-w-screen-md lg:px-10 lg:py-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative mt-4 flex w-full items-center justify-center gap-2 px-3 text-center font-600 ">
                    {activeSubjectIndex != 0 && (
                      <ArrowLeft
                        onClick={() => {
                          setActiveSubjectIndex(activeSubjectIndex - 1);
                        }}
                        className="absolute left-2 h-4 w-4"
                      />
                    )}
                    <span className="w-fit">
                      {subjects[activeSubjectIndex].alternate_name}
                    </span>
                    {activeSubjectIndex != subjects.length - 1 && (
                      <ArrowRight
                        onClick={() => {
                          setActiveSubjectIndex(activeSubjectIndex + 1);
                        }}
                        className="absolute right-2 h-4 w-4"
                      />
                    )}
                  </div>
                  {activeSubjectIndex >= 0 && subjects[activeSubjectIndex] && (
                    <div className="px-3">
                      <Filters
                        isMobile
                        subject_id={subjects[activeSubjectIndex].id}
                        subjectSlug={subjects[activeSubjectIndex].slug}
                        currentTopic={currentTopic}
                        setCurrentTopic={setCurrentTopic}
                        yearRange={yearRange}
                        setYearRange={setYearRange}
                      />
                      <Link
                        href="/latihan/riwayat"
                        className="mb-2 mt-3 flex h-10 items-center justify-center gap-1.5 rounded-full bg-gray-800 font-600 text-surface-400 disabled:bg-gray-400"
                      >
                        <Iconify
                          icon="ph:clock-counter-clockwise-duotone"
                          className="text-xl"
                        />
                        Riwayat soal
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </MediaQuery>
  );
};

export default SoalAsideMobile;
