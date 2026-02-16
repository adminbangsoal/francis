import { Accordion } from "@/components/ui/accordion";
import { useGetDashboardQuery } from "@/redux/api/dashboardApi";
import { TopicCard } from "./TopicCard";

const TopicCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-row items-center gap-3">
          <div className="skeleton relative h-5 w-5 rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
          <div className="skeleton relative h-5 w-32 rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
        </div>
        <div className="skeleton relative h-8 w-48 rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
      </div>
    </div>
  );
};

export const TopicStatistics = () => {
  const { data, isLoading } = useGetDashboardQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <TopicCardSkeleton />
        <TopicCardSkeleton />
        <TopicCardSkeleton />
      </div>
    );
  }

  return (
    <Accordion
      type="multiple"
      className="grid grid-cols-1 gap-3 md:grid-cols-2"
    >
      {data?.data.map((stats, idx) => {
        return (
          <TopicCard
            key={idx}
            value={`item-${idx}`}
            subject={{
              name: stats.subject,
              icon: stats.icon,
              slug: stats.slug,
            }}
            soalFinished={stats.total_correct_answer}
            feedbacks={stats.topics}
          />
        );
      })}
    </Accordion>
  );
};
