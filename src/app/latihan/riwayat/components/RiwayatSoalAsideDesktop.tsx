import Iconify from "@/components/Iconify";
import { Subject } from "@/types";
import * as Accordion from "@radix-ui/react-accordion";
import Image from "next/image";
import Link from "next/link";
import MediaQuery from "react-responsive";
import { useRiwayatLatihanSoalContext } from "../context";
import Filters from "./Filters";
import SoalSelector from "./SoalSelector";

const RiwayatSoalAsideDesktop = () => {
  const {
    currentTopic,
    selectedSubject,
    subjects,
    yearRange,
    setCurrentTopic,
    setYearRange,
    setSelectedSubject,
  } = useRiwayatLatihanSoalContext();

  return (
    <MediaQuery minWidth={768}>
      <aside className="sticky top-0 flex h-screen w-80 shrink-0 flex-col gap-6 border-r border-surface-300 bg-surface-200">
        <div className="flex h-16 items-center justify-center gap-2 pt-4 text-xl font-700 text-content-200">
          <Link href="/dashboard" className="text-gray-700 hover:text-gray-700">
            <p className="!mb-0">BangSoal</p>
          </Link>
          <p className="!mb-0 text-surface-400">|</p>
          <p className="!mb-0 font-[550]">Latihan Soal</p>
        </div>
        <div className="flex grow flex-col gap-5 px-5 pb-5 text-content-300">
          {selectedSubject && (
            <Accordion.Root
              className="flex grow flex-col"
              type="single"
              defaultValue={selectedSubject?.slug}
              onValueChange={(value) => {
                const subject = subjects?.find(
                  ({ slug }) => value === slug,
                ) as Subject;
                setSelectedSubject(subject);
              }}
            >
              {subjects?.map(({ id, alternate_name, icon, slug, name }) => {
                return (
                  <Accordion.Item
                    key={alternate_name}
                    value={`${slug}`}
                    className="group relative flex flex-col rounded-xl bg-cover data-[state=closed]:h-11 data-[state=open]:grow data-[state=closed]:animate-slide-up-item data-[state=open]:animate-slide-down-item data-[state=closed]:overflow-hidden data-[state=open]:overflow-visible"
                  >
                    <Accordion.Trigger className="group z-10 flex w-full items-center gap-2 rounded-xl rounded-b-none px-3 py-2 text-xl font-[650] text-content-300 outline-none transition-colors duration-500 data-[state=open]:cursor-default data-[state=open]:bg-gray-300 data-[state=open]:text-surface-100 data-[state=closed]:focus-within:text-content-100 data-[state=closed]:hover:text-content-100">
                      <Image
                        src={icon}
                        alt={slug}
                        width={20}
                        height={20}
                        className="w-5 text-black"
                      />
                      <p className="mb-0 grow truncate text-left">
                        {alternate_name}
                      </p>
                      <Iconify
                        icon="ph:caret-down-bold"
                        className="transition-transform duration-500 group-data-[state=open]:rotate-180"
                      />
                    </Accordion.Trigger>
                    <Accordion.Content
                      forceMount
                      className="z-10 flex grow flex-col rounded-b-xl bg-gray-300 px-1 pb-1 data-[state=closed]:h-0 data-[state=open]:h-[--radix-accordian-content-height]  data-[state=closed]:animate-slide-up-content data-[state=open]:animate-slide-down-content"
                    >
                      <Filters
                        subject_id={id}
                        currentTopic={currentTopic}
                        setCurrentTopic={setCurrentTopic}
                        yearRange={yearRange}
                        setYearRange={setYearRange}
                        selectedSubject={selectedSubject}
                      />
                      {slug === selectedSubject?.slug && (
                        <SoalSelector
                          subjectId={id}
                          subjectName={name}
                          topicId={currentTopic[slug]}
                        />
                      )}
                    </Accordion.Content>
                  </Accordion.Item>
                );
              })}
            </Accordion.Root>
          )}
        </div>
      </aside>
    </MediaQuery>
  );
};

export default RiwayatSoalAsideDesktop;
