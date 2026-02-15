"use client";
import { useGetLatihanSoalQuery } from "@/redux/api/latihanSoalApi";
import * as Tabs from "@radix-ui/react-tabs";
import { useParams, useRouter } from "next/navigation";
import { Suspense, lazy, useEffect, useState } from "react";
import { AutoSizer, List } from "react-virtualized";
import { useLatihanSoalContext } from "../context";
import { SoalSelectorI } from "./interface";

const MarkdownPreview = lazy(() => import("./RenderMarkdown")); // Lazy load markdown for better performance

export default function SoalSelector({
  subject_id,
  subjectSlug,
  min_year,
  max_year,
  topic_id,
  filtersOpened,
}: SoalSelectorI) {
  const router = useRouter();
  const { slug } = useParams();
  const [tiles, setTiles] = useState<{ id: string; content: string }[]>([]);

  const {
    selectedSubject,
    setSoalData,
    soalData: soalDataContext,
    defaultValueTabIndex,
    setDefaultValueTabIndex,
  } = useLatihanSoalContext();

  const { data: soalData } = useGetLatihanSoalQuery(
    {
      subject_id,
      topic_id: topic_id != "ALL" ? topic_id : undefined,
      min_year: `${min_year}`,
      max_year: `${max_year}`,
      question_id:
        topic_id == "ALL" &&
        slug?.[1] &&
        !soalDataContext.find(({ id }) => id == slug?.[1])
          ? undefined
          : slug?.[1] || undefined,
    },
    {
      skip: subjectSlug != slug?.[0] || filtersOpened,
    },
  );

  // force scroll to given question id for desktop view
  useEffect(() => {
    if (slug?.[1] && soalData?.data?.questions) {
      const index = soalData?.data?.questions?.findIndex(
        ({ id }) => id === slug?.[1],
      );
      if (index && index >= 0 && index !== defaultValueTabIndex) {
        setDefaultValueTabIndex(index);
      }
    }
  }, [slug?.[1], soalData?.data?.questions]);

  useEffect(() => {
    if (soalDataContext.length <= 0) {
      if (soalData?.data?.questions) {
        setSoalData(soalData?.data?.questions ?? []);
      }
    }
    if (soalData?.data?.questions) {
      setSoalData(soalData?.data?.questions ?? []);
      setTiles(
        soalData?.data?.questions?.map(({ id, content }) => {
          return {
            id,
            content,
          };
        }) as { id: string; content: string }[],
      );
    }
  }, [soalData?.data.questions]);

  const renderTile = ({ index, key, style }: any) => {
    return (
      <div className="flex flex-col items-center">
        <Tabs.Trigger
          key={key}
          value={`tab-${index + 1}`}
          className="relative !h-[4.25rem] overflow-hidden rounded-lg bg-surface-100 p-3 text-left text-xs font-500 text-content-100 transition-[opacity] before:absolute before:inset-0 before:shadow-[inset_-24px_-24px_32px_0_rgba(0,0,0,1)] before:shadow-surface-100 data-[state=active]:cursor-default data-[state=active]:opacity-100 data-[state=inactive]:opacity-30 data-[state=inactive]:hover:opacity-60"
          onClick={() => {
            setDefaultValueTabIndex(index);
            router.push(`/latihan-soal/${subjectSlug}/${tiles[index].id}`);
          }}
          style={style}
        >
          <MarkdownPreview
            className="text-base"
            markdown={tiles[index].content}
          />
        </Tabs.Trigger>
      </div>
    );
  };

  return (
    <Tabs.Root
      value={`tab-${defaultValueTabIndex + 1}`}
      orientation="vertical"
      className="grow"
    >
      <Tabs.List className="flex h-full w-full flex-col gap-1">
        {subjectSlug === selectedSubject?.slug && tiles ? (
          <Suspense fallback={<SoalCardSkeleton />}>
            <AutoSizer>
              {({ height, width }) => (
                <List
                  scrollToIndex={defaultValueTabIndex}
                  height={height}
                  width={width}
                  rowCount={tiles.length}
                  rowHeight={70}
                  rowRenderer={renderTile}
                />
              )}
            </AutoSizer>
          </Suspense>
        ) : (
          <SoalCardSkeleton />
        )}
      </Tabs.List>
    </Tabs.Root>
  );
}

export const SoalCardSkeleton = () => {
  return Array.from([1, 2, 3]).map((el) => {
    return (
      <div
        key={el}
        className="skeleton relative h-16 w-full rounded-xl bg-surface-300 from-surface-300 via-surface-100 to-surface-300"
      ></div>
    );
  });
};
