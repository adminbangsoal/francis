import { useGetDashboardQuery } from "@/redux/api/dashboardApi";
import { TopicCard } from "./TopicCard";

export const TopicStatistics = () => {
  const { data } = useGetDashboardQuery();

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {data?.data.map((stats, idx) => {
        return (
          <TopicCard
            key={idx}
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
    </div>
  );
};
