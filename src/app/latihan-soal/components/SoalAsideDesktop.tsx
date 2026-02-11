// assets
import bgMeshVertical from "@public/bg-mesh-vertical.webp";

// components
import Iconify from "@/components/Iconify";

import { SelectedSubjectType, Subject } from "@/types";
import * as Accordion from "@radix-ui/react-accordion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MediaQuery from "react-responsive";
import { useLatihanSoalContext } from "../context";
import Filters from "./Filters";
import SoalSelector from "./SoalSelector";

interface SoalAsideProps {
  subject: Subject;
}

const SoalAsideDesktop = ({ subject }: SoalAsideProps) => {
  const router = useRouter();

  const {
    subjects,
    currentTopic,
    setCurrentTopic,
    yearRange,
    setYearRange,
    setSelectedSubject,
    selectedSubject,
    setSelectedTopicId,
    soalData,
    setDefaultValueTabIndex,
    setSoalData,
  } = useLatihanSoalContext();

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
          {subjects.length && (
            <Accordion.Root
              className="flex grow flex-col"
              type="single"
              defaultValue={`${subject.slug}`}
              onValueChange={(value) => {
                const newSubject = subjects.find(({ slug }) => slug === value);
                setSelectedSubject(newSubject as Subject);
                setSelectedTopicId(
                  currentTopic[subject.alternate_name as SelectedSubjectType],
                );
                const currentNumber = soalData.findIndex(
                  ({ id }) => id === value,
                );
                setDefaultValueTabIndex(currentNumber ?? 0);
                setSoalData([]);
                router.replace(`/latihan-soal/${value}`);
              }}
            >
              {subjects.map(
                ({ id, alternate_name, icon, name, slug }, index) => {
                  return (
                    <Accordion.Item
                      key={alternate_name}
                      value={slug}
                      className="group relative flex flex-col rounded-xl bg-cover data-[state=closed]:h-11 data-[state=open]:grow data-[state=closed]:animate-slide-up-item data-[state=open]:animate-slide-down-item data-[state=closed]:overflow-hidden data-[state=open]:overflow-visible"
                    >
                      <Accordion.Trigger className="group z-10 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xl font-[650] text-content-300 outline-none transition-colors data-[state=open]:cursor-default data-[state=open]:text-surface-100 data-[state=closed]:focus-within:text-content-100 data-[state=closed]:hover:text-content-100">
                        <Image
                          src={icon}
                          alt={name}
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
                        className="z-10 flex grow flex-col px-1 pb-1 data-[state=closed]:h-0 data-[state=open]:h-[--radix-accordian-content-height] data-[state=closed]:animate-slide-up-content data-[state=open]:animate-slide-down-content"
                      >
                        <Filters
                          subject_id={id}
                          subjectSlug={subject.slug}
                          currentTopic={currentTopic}
                          setCurrentTopic={setCurrentTopic}
                          yearRange={yearRange}
                          setYearRange={setYearRange}
                        />
                        {slug === selectedSubject?.slug && (
                          <SoalSelector
                            subject_id={id}
                            min_year={yearRange[subject.slug][0]}
                            max_year={yearRange[subject.slug][1]}
                            subjectSlug={slug}
                            topic_id={currentTopic[subject.slug]}
                          />
                        )}
                      </Accordion.Content>
                      <Image
                        src={bgMeshVertical}
                        alt={""}
                        className="pointer-events-none absolute inset-0 h-full rounded-xl object-cover transition-[opacity] duration-500 group-data-[state=closed]:opacity-0 group-data-[state=open]:opacity-100"
                        aria-hidden="true"
                      />
                    </Accordion.Item>
                  );
                },
              )}
            </Accordion.Root>
          )}
          <Link
            href="/latihan/riwayat"
            className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-gray-800 font-600 text-surface-400 disabled:bg-gray-400"
          >
            <Iconify
              icon="ph:clock-counter-clockwise-duotone"
              className="text-xl"
            />
            Riwayat soal
          </Link>
        </div>
      </aside>
    </MediaQuery>
  );
};

export default SoalAsideDesktop;
