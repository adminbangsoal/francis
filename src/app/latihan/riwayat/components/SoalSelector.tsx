import Iconify from "@/components/Iconify";
import { Button } from "@/components/ui/button";
import { useGetLatihanSoalHistoryQuery } from "@/redux/api/latihanSoalApi";
import * as Tabs from "@radix-ui/react-tabs";
import { Suspense, lazy, useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import { AutoSizer, List } from "react-virtualized";
import { SoalCardSkeleton } from "../../../latihan-soal/components/SoalSelector";
import { useRiwayatLatihanSoalContext } from "../context";
import { ISoalSelector } from "./types";

function loading(promise: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}

const MarkdownPreview = lazy(() =>
  loading(import("../../../latihan-soal/components/RenderMarkdown")),
); // Lazy load markdown for better performance

const SoalSelector = ({ subjectId, topicId }: ISoalSelector): JSX.Element => {
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [tiles, setTiles] = useState<{ id: string; content: string }[]>([]);

  const { data } = useGetLatihanSoalHistoryQuery({
    subject_id: subjectId,
    topic_id: topicId === "ALL" ? undefined : topicId,
  });

  const { selectedQuestionId, setSelectedQuestionId, selectedSubject } =
    useRiwayatLatihanSoalContext();

  useEffect(() => {
    setSelectedQuestionId(data?.data[0]?.questions_id as string);
    setTiles(
      data?.data?.map(({ questions, questions_id }) => {
        return {
          id: questions_id,
          content: questions[0].content,
        };
      }) as { id: string; content: string }[],
    );
  }, [data]);

  useEffect(() => {
    setCurrentNumber(0);
  }, [selectedSubject]);

  const renderTile = ({ index, key, style }: any) => {
    return (
      <div className="flex flex-col items-center">
        {tiles?.length > 0 && (
          <Tabs.Trigger
            key={key}
            value={`tab-${index + 1}`}
            className="relative !h-[4.25rem] overflow-hidden rounded-lg bg-surface-100 p-3 text-left text-xs font-500 text-content-100 transition-[opacity] before:absolute before:inset-0 before:shadow-[inset_-24px_-24px_32px_0_rgba(0,0,0,1)] before:shadow-surface-100 data-[state=active]:cursor-default data-[state=active]:opacity-100 data-[state=inactive]:opacity-30 data-[state=inactive]:hover:opacity-60"
            onClick={() => {
              setCurrentNumber(index);
              setSelectedQuestionId(tiles[index].id);
            }}
            style={style}
          >
            <MarkdownPreview
              className="text-base"
              markdown={tiles[index]?.content}
            />
          </Tabs.Trigger>
        )}
      </div>
    );
  };

  return (
    <>
      <Tabs.Root
        value={`tab-${currentNumber + 1}`}
        orientation="vertical"
        className="grow"
      >
        <Tabs.List className="flex h-full w-full flex-col gap-1">
          <Suspense fallback={<SoalCardSkeleton />}>
            {tiles && (
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    scrollToIndex={0}
                    height={height}
                    width={width}
                    rowCount={tiles.length}
                    rowHeight={70}
                    rowRenderer={renderTile}
                  />
                )}
              </AutoSizer>
            )}
          </Suspense>
        </Tabs.List>
      </Tabs.Root>

      <MediaQuery maxWidth={768}>
        <div className="flex gap-x-2 px-5 py-5">
          <Button
            onClick={() => {
              setSelectedQuestionId(
                data?.data[currentNumber - 1]?.questions_id as string,
              );
              setCurrentNumber(currentNumber - 1);
            }}
            disabled={currentNumber === 0}
            variant="emerald"
            className="h-7 flex-grow rounded-full shadow disabled:bg-gray-200 disabled:text-gray-400 lg:w-fit"
          >
            <Iconify icon="ph:caret-left-bold" className="text-lg" />
          </Button>
          <Button
            onClick={() => {
              setSelectedQuestionId(
                data?.data[currentNumber + 1]?.questions_id as string,
              );
              setCurrentNumber(currentNumber + 1);
            }}
            disabled={
              currentNumber ===
              (data?.data?.length ? data?.data?.length - 1 : 0)
            }
            variant="emerald"
            className="h-7 flex-grow rounded-full shadow disabled:bg-gray-200 disabled:text-gray-400 lg:w-fit"
          >
            <Iconify icon="ph:caret-right-bold" className="text-lg" />
          </Button>
        </div>
      </MediaQuery>
    </>
  );
};

export default SoalSelector;
