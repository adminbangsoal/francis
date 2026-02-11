import { DetailAverageScore } from "./DetailAverageScore";
import { TOOverview } from "./TOOverview";
import { Tips } from "./Tips";

export const TryOutSettings = () => {
  return (
    <div className="flex flex-col gap-5 pb-4">
      <TOOverview />
      <DetailAverageScore />
      <Tips />
    </div>
  );
};
