"use client";
import { useGetLatihanSoalQuery, latihanSoal } from "@/redux/api/latihanSoalApi";
import { useAppDispatch } from "@/redux/store";
import * as Tabs from "@radix-ui/react-tabs";
import { useParams, useRouter } from "next/navigation";
import { Suspense, lazy, useEffect, useState } from "react";
import { AutoSizer, List } from "react-virtualized";
import { useLatihanSoalContext } from "../context";
import { SoalSelectorI } from "./interface";

const MarkdownPreview = lazy(() => import("./RenderMarkdown")); // Lazy load markdown for better performance

const INITIAL_BATCH_SIZE = 10;
const BATCH_SIZE = 20; // Load 20 more at a time

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
  const dispatch = useAppDispatch();
  const [tiles, setTiles] = useState<{ id: string; content: string }[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalLoaded, setTotalLoaded] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const {
    selectedSubject,
    setSoalData,
    soalData: soalDataContext,
    defaultValueTabIndex,
    setDefaultValueTabIndex,
  } = useLatihanSoalContext();

  // Initial fetch: only 10 questions
  const { data: initialSoalData, isLoading: isLoadingInitial } = useGetLatihanSoalQuery(
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
      limit: INITIAL_BATCH_SIZE,
      offset: 0,
    },
    {
      skip: subjectSlug != slug?.[0] || filtersOpened,
    },
  );

  // Progressive loading: fetch rest in background
  useEffect(() => {
    if (!initialSoalData?.data?.questions || isLoadingInitial || filtersOpened) return;
    
    const initialQuestions = initialSoalData.data.questions;
    
    // Always set initial data first for immediate display
    setSoalData(initialQuestions);
    setTiles(
      initialQuestions.map(({ id, content }) => ({
        id,
        content,
      }))
    );
    setTotalLoaded(initialQuestions.length);
    
    // Check if we need to load more (if initial batch is full, likely there's more)
    if (initialQuestions.length >= INITIAL_BATCH_SIZE) {
      setHasMore(true);
      
      // Load rest in background after a short delay to let initial render complete
      const loadMoreTimeout = setTimeout(() => {
        setIsLoadingMore(true);
        
        // Fetch all remaining questions (without limit to get everything)
        dispatch(
          latihanSoal.endpoints.getLatihanSoal.initiate({
            subject_id,
            topic_id: topic_id != "ALL" ? topic_id : undefined,
            min_year: `${min_year}`,
            max_year: `${max_year}`,
            // Don't pass limit/offset - let backend return all, then we'll merge
          }, { forceRefetch: true })
        ).then((result) => {
          if (result.data?.data?.questions) {
            const allQuestions = result.data.data.questions;
            
            // Remove duplicates based on ID
            const uniqueQuestions = allQuestions.filter(
              (q, index, self) => index === self.findIndex((t) => t.id === q.id)
            );
            
            setTotalLoaded(uniqueQuestions.length);
            setHasMore(false); // We got everything
            
            // Update context with all questions
            setSoalData(uniqueQuestions);
            setTiles(
              uniqueQuestions.map(({ id, content }) => ({
                id,
                content,
              }))
            );
          }
          setIsLoadingMore(false);
        }).catch(() => {
          setIsLoadingMore(false);
        });
      }, 800); // Delay to let initial render and user interaction happen first
      
      return () => clearTimeout(loadMoreTimeout);
    } else {
      // If initial batch is less than expected, we have all data
      setHasMore(false);
    }
  }, [initialSoalData, isLoadingInitial, subject_id, topic_id, min_year, max_year, dispatch, setSoalData, filtersOpened]);

  // Use initial data for immediate display
  const soalData = initialSoalData;

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

  // Update tiles when soalDataContext changes (from background loading)
  useEffect(() => {
    if (soalDataContext.length > 0) {
      setTiles(
        soalDataContext.map(({ id, content }) => ({
          id,
          content,
        }))
      );
    }
  }, [soalDataContext]);

  const renderTile = ({ index, key, style }: any) => {
    const tile = tiles[index];
    if (!tile) return null;
    
    return (
      <div key={key} className="flex flex-col items-center" style={style}>
        <Tabs.Trigger
          value={`tab-${index + 1}`}
          className="relative !h-[4.25rem] overflow-hidden rounded-lg bg-surface-100 p-3 text-left text-xs font-500 text-content-100 transition-[opacity] before:absolute before:inset-0 before:shadow-[inset_-24px_-24px_32px_0_rgba(0,0,0,1)] before:shadow-surface-100 data-[state=active]:cursor-default data-[state=active]:opacity-100 data-[state=inactive]:opacity-30 data-[state=inactive]:hover:opacity-60"
          onClick={() => {
            setDefaultValueTabIndex(index);
            router.push(`/latihan-soal/${subjectSlug}/${tile.id}`);
          }}
        >
          <MarkdownPreview
            className="text-base"
            markdown={tile.content}
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
        {subjectSlug === selectedSubject?.slug && tiles.length > 0 ? (
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
                  overscanRowCount={5}
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
