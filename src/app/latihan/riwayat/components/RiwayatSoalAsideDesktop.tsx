import Iconify from "@/components/Iconify";
import { Subject } from "@/types";
import * as Accordion from "@radix-ui/react-accordion";
import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import Link from "next/link";
import MediaQuery from "react-responsive";
import { AutoSizer, List } from "react-virtualized";
import { useRiwayatLatihanSoalContext } from "../context";
import Filters from "./Filters";
import SoalSelector from "./SoalSelector";

const SubjectSkeleton = ({ isExpanded = false }: { isExpanded?: boolean }) => {
  return (
    <div className={`group relative flex flex-col rounded-xl bg-cover ${
      isExpanded ? "grow" : "h-11"
    }`}>
      <div className="group z-10 flex w-full items-center gap-2 rounded-xl rounded-b-none px-3 py-2 text-xl font-[650]">
        <div className="skeleton relative h-5 w-5 rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
        <div className="skeleton relative h-5 w-32 rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
        <div className="skeleton relative h-5 w-5 rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300 ml-auto"></div>
      </div>
      {isExpanded && (
        <div className="z-10 flex grow flex-col rounded-b-xl bg-gray-300 px-1 pb-1">
          {/* Filters Skeleton */}
          <div className="flex flex-col rounded-lg bg-gray-400 px-3 py-2">
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex items-center gap-2">
                <div className="skeleton relative h-4 w-12 shrink-0 rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
                <div className="skeleton relative h-6 flex-1 rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
              </div>
            </div>
          </div>
          {/* SoalSelector Skeleton - using same layout as actual SoalSelector */}
          <Tabs.Root
            value="tab-1"
            orientation="vertical"
            className="grow"
          >
            <Tabs.List className="flex h-full w-full flex-col gap-1">
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    height={height}
                    width={width}
                    rowCount={6}
                    rowHeight={70}
                    rowRenderer={({ index, key, style }) => (
                      <div key={key} style={style} className="flex flex-col items-center">
                        <div className="skeleton relative h-[4.25rem] w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
                      </div>
                    )}
                  />
                )}
              </AutoSizer>
            </Tabs.List>
          </Tabs.Root>
        </div>
      )}
    </div>
  );
};

const RiwayatSoalAsideDesktop = () => {
  const {
    currentTopic,
    selectedSubject,
    subjects,
    yearRange,
    setCurrentTopic,
    setYearRange,
    setSelectedSubject,
    isLoadingSubjects,
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
          {isLoadingSubjects ? (
            <div className="flex grow flex-col gap-2">
              {/* First subject expanded (like when data is loaded) */}
              <SubjectSkeleton isExpanded={true} />
              {/* Other subjects collapsed */}
              {[...Array(5)].map((_, idx) => (
                <SubjectSkeleton key={idx} isExpanded={false} />
              ))}
            </div>
          ) : selectedSubject ? (
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
          ) : null}
        </div>
      </aside>
    </MediaQuery>
  );
};

export default RiwayatSoalAsideDesktop;
