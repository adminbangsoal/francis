import { cn } from "@/lib/utils";
import { useGetTOHistorySubjectAnalyticsQuery } from "@/redux/api/tryoutHistoryApi";
import { BrainIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { FC, useState } from "react";
import MediaQuery from "react-responsive";
import { topicIndex } from "../../constants";

const AverageScoreDetail: FC = ({}) => {
  const [topicTab, setTopicTab] = useState<number>(0);

  const { data: toHistorySubject } = useGetTOHistorySubjectAnalyticsQuery();

  const lowest_subject =
    !!toHistorySubject?.data &&
    Object.keys(toHistorySubject?.data.subject_analytics).reduce((a, b) =>
      (toHistorySubject?.data.subject_analytics[a].avg_score ?? 0) <
      (toHistorySubject?.data.subject_analytics[b].avg_score ?? 0)
        ? a
        : b,
    );

  return (
    <>
      <p className="mt-8 text-center text-xl font-semibold lg:text-left">
        Detail Average Score
      </p>
      <MediaQuery maxWidth={1023}>
        <div
          className={cn(
            "mt-4 flex w-full flex-col rounded-md border-[1px] p-4",
            lowest_subject === topicIndex[topicTab]
              ? "border-red-200 bg-red-50"
              : "border-[#E9EEF4] bg-slate-50",
          )}
        >
          <div className="flex items-center justify-between">
            <div
              className="aspect-square rounded-md border-[1px] border-slate-300 p-2"
              onClick={() => setTopicTab((prev) => (prev - 1 + 7) % 7)}
            >
              <ChevronLeft size={24} color="#334155" />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <BrainIcon size={24} color="#6B7280" />
                <p className="text-xl font-semibold">
                  {topicTab === 0 && "PU"}
                  {topicTab === 1 && "PK"}
                  {topicTab === 2 && "PPU"}
                  {topicTab === 3 && "PBM"}
                  {topicTab === 4 && "PM"}
                  {topicTab === 5 && "LBI"}
                  {topicTab === 6 && "LBE"}
                </p>
              </div>
            </div>
            <div
              className="aspect-square rounded-md border-[1px] border-slate-300 p-2"
              onClick={() => setTopicTab((prev) => (prev + 1) % 7)}
            >
              <ChevronRight size={24} color="#334155" />
            </div>
          </div>
          <div className="mt-4 grid w-full grid-cols-2 gap-3">
            <div className="col-span-2">
              <p className="text-sm font-semibold text-slate-500">
                Average Score
              </p>
              <p className="mt-1 text-2xl font-bold">
                {Math.floor(
                  toHistorySubject?.data?.subject_analytics?.[
                    topicIndex[topicTab]
                  ]?.avg_score ?? 0,
                )}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-600">
                Highest Score
              </p>
              <p className="mt-1 text-2xl font-bold">
                {Math.floor(
                  toHistorySubject?.data?.subject_analytics?.[
                    topicIndex[topicTab]
                  ]?.max_score ?? 0,
                )}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-red-600">Lowest Score</p>
              <p className="mt-1 text-2xl font-bold">
                {Math.floor(
                  toHistorySubject?.data?.subject_analytics?.[
                    topicIndex[topicTab]
                  ]?.min_score ?? 0,
                )}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-x-2">
            <p className="min-w-fit text-xs font-medium">
              Topik yang belum kamu kuasai
            </p>
            <div className="h-[1px] w-full bg-gray-300" />
          </div>
          <div className="mt-2 h-52 overflow-y-auto first:mt-0">
            {!!toHistorySubject?.data &&
              toHistorySubject.data.subject_analytics[
                topicIndex[topicTab]
              ].topics.map(
                ({ id, name, correct_answers_count, questions_count }, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "mt-2 flex items-center rounded-md p-2",
                      lowest_subject === topicIndex[topicTab]
                        ? "bg-red-100"
                        : "bg-slate-100",
                    )}
                  >
                    <p className="text-sm font-medium">{name}</p>
                    <p className="ml-2 text-[13px] text-slate-600">
                      {correct_answers_count}/{questions_count} soal benar
                    </p>
                  </div>
                ),
              )}
          </div>
        </div>
      </MediaQuery>
      <MediaQuery minWidth={1024}>
        <div className="mt-4 grid w-full grid-cols-2 gap-2">
          {topicIndex.map((topic, idx) => (
            <div
              key={topic}
              className={cn(
                "flex aspect-video flex-col rounded-md border-[1px] p-4",
                lowest_subject === topic
                  ? "border-red-200 bg-red-50"
                  : "border-[#E9EEF4] bg-slate-50",
              )}
            >
              <div className="grid grid-cols-3">
                <div>
                  <div className="flex items-center gap-x-2">
                    <BrainIcon
                      size={24}
                      color={lowest_subject === topic ? "#EF4444" : "#6B7280"}
                    />
                    <p className="text-xl font-semibold">
                      {topic === "Kemampuan Penalaran Umum" && "PU"}
                      {topic === "Pengetahuan Kuantitatif" && "PK"}
                      {topic === "Pengetahuan dan Pemahaman Umum" && "PPU"}
                      {topic === "Pemahaman Bacaan dan Menulis" && "PBM"}
                      {topic === "Penalaran Matematika" && "PM"}
                      {topic === "Bahasa Indonesia" && "LBI"}
                      {topic === "Bahasa Inggris" && "LBE"}
                    </p>
                  </div>
                  <p className="mt-1 text-2xl font-bold">
                    {Math.floor(
                      toHistorySubject?.data?.subject_analytics?.[topic]
                        ?.avg_score ?? 0,
                    )}
                  </p>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="mt-1 text-sm font-semibold text-blue-600">
                    Highest Score
                  </p>
                  <p className="mt-1 text-2xl font-bold">
                    {Math.floor(
                      toHistorySubject?.data?.subject_analytics?.[topic]
                        ?.max_score ?? 0,
                    )}
                  </p>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="mt-1 text-sm font-semibold text-red-600">
                    Lowest Score
                  </p>
                  <p className="mt-1 text-2xl font-bold">
                    {Math.floor(
                      toHistorySubject?.data?.subject_analytics?.[topic]
                        ?.min_score ?? 0,
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-x-2">
                <p className="min-w-fit text-xs font-medium">
                  Topik yang belum kamu kuasai
                </p>
                <div className="h-[1px] w-full bg-gray-300" />
              </div>
              <div className="mt-2 h-0 flex-1 grow overflow-y-auto first:mt-0">
                {!!toHistorySubject?.data &&
                  toHistorySubject.data.subject_analytics[topic].topics.map(
                    ({ id, name, correct_answers_count, questions_count }) => (
                      <div
                        key={id}
                        className={cn(
                          "mt-2 flex items-center rounded-md p-2",
                          lowest_subject === topic
                            ? "bg-red-100"
                            : "bg-slate-100",
                        )}
                      >
                        <p className="text-sm font-medium">{name}</p>
                        <p className="ml-2 text-[13px] text-slate-600">
                          {correct_answers_count}/{questions_count} soal benar
                        </p>
                      </div>
                    ),
                  )}
              </div>
            </div>
          ))}
        </div>
      </MediaQuery>
    </>
  );
};

export default AverageScoreDetail;
