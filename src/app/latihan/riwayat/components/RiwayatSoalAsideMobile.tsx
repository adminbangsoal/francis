import Nav from "@/app/components/Navbar";
import { Button } from "@/components/ui/button";
import { Subject } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import MediaQuery from "react-responsive";
import { useRiwayatLatihanSoalContext } from "../context";
import Filters from "./Filters";
import SoalSelector from "./SoalSelector";

const RiwayatSoalAsideMobile = () => {
  const {
    subjects,
    activeSubjectIndex,
    currentTopic,
    setCurrentTopic,
    setActiveSubjectIndex,
    yearRange,
    setYearRange,
    selectedSubject,
    setSelectedSubject,
  } = useRiwayatLatihanSoalContext();

  const [openFilters, setOpenFilters] = useState<boolean>(false);

  return (
    <MediaQuery maxWidth={767}>
      <div className="fixed z-30">
        <Nav />
      </div>
      <div className="fixed bottom-0 z-20 w-full rounded-t-lg bg-white shadow-2xl">
        {selectedSubject?.id && (
          <SoalSelector
            subjectId={(subjects as Subject[])[activeSubjectIndex].id}
            subjectName={selectedSubject.alternate_name}
            topicId={currentTopic[selectedSubject.slug]}
          />
        )}

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
                    {subjects && activeSubjectIndex != 0 && (
                      <ArrowLeft
                        onClick={() => {
                          const subjectAlternateName =
                            subjects?.[activeSubjectIndex - 1];
                          setSelectedSubject(subjectAlternateName);
                          setActiveSubjectIndex(activeSubjectIndex - 1);
                        }}
                        className="absolute left-2 h-4 w-4"
                      />
                    )}
                    <span className="w-fit">{selectedSubject?.name}</span>
                    {subjects && activeSubjectIndex != subjects.length - 1 && (
                      <ArrowRight
                        onClick={() => {
                          const subjectAlternateName =
                            subjects?.[activeSubjectIndex + 1];
                          setSelectedSubject(subjectAlternateName);
                          setActiveSubjectIndex(activeSubjectIndex + 1);
                        }}
                        className="absolute right-2 h-4 w-4"
                      />
                    )}
                  </div>
                  {activeSubjectIndex >= 0 &&
                    (subjects as Subject[])[activeSubjectIndex] && (
                      <div className="mb-3 px-2">
                        <Filters
                          subject_id={
                            (subjects as Subject[])[activeSubjectIndex].id
                          }
                          currentTopic={currentTopic}
                          setCurrentTopic={setCurrentTopic}
                          yearRange={yearRange}
                          setYearRange={setYearRange}
                          selectedSubject={selectedSubject}
                        />
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

export default RiwayatSoalAsideMobile;
