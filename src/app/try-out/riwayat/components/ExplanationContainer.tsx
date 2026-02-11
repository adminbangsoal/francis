import UpgradePremiumContainer from "@/app/components/UpgradePremiumContainer";
import { cn } from "@/lib/utils";
import { GetTOHistoryExplanationResponse } from "@/types/tryout-history";
import { MathpixLoader, MathpixMarkdown } from "mathpix-markdown-it";
import { useEffect, useState } from "react";

interface ExplanationContainersProps {
  isUpgraded: boolean;
  explanationData: GetTOHistoryExplanationResponse | undefined;
  toggleLike: (isLike: boolean) => void;
}

const ExplanationContainers = ({
  explanationData,
  isUpgraded,
  toggleLike,
}: ExplanationContainersProps) => {
  const [isPremium, setIsPremium] = useState<boolean>(false);

  useEffect(() => {
    if (!!explanationData && explanationData?.data.id) {
      setIsPremium(true);
    }
  }, [explanationData]);

  return !!explanationData?.data && isPremium ? (
    <div>
      <MathpixLoader>
        <div className={cn("text-left font-quicksand text-gray-500")}>
          <MathpixMarkdown text={explanationData.data.content} />
        </div>
      </MathpixLoader>
    </div>
  ) : (
    <UpgradePremiumContainer />
  );
};

export default ExplanationContainers;
