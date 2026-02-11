import { DismissibleBox } from "./DismissibleBox";
import { LatsolOverview } from "./LatsolOverview";
import { OngoingLatihan } from "./OngoingLatihan";
import { TopicStatistics } from "./TopicStatistics";

export const LatihanSoalSettings = () => {
  return (
    <div className="flex flex-col gap-5 pb-4">
      <DismissibleBox />
      <OngoingLatihan />
      <LatsolOverview />
      <TopicStatistics />
    </div>
  );
};
