import Lottie from "react-lottie";
import { DESCRIPTION } from "../../contants/copywriting";
import { sekuensialMobileAnimationOptions } from "../modals/lottie.options";

interface PrestepSectionsProps {
  selectedMode: "sequential" | "classic" | undefined;
}

const PrestepSections = ({
  selectedMode,
}: PrestepSectionsProps): JSX.Element => {
  return (
    <div className="rounded-lg bg-emerald-900/20 p-3">
      <div className="rounded-lg bg-white shadow-md">
        <Lottie
          options={sekuensialMobileAnimationOptions}
          style={{
            objectFit: "cover",
            overflow: "hidden",
          }}
        />
      </div>
      <p className="mb-3 mt-6 px-3 text-center font-600">
        {selectedMode == "sequential"
          ? DESCRIPTION.sequential
          : DESCRIPTION.classic}
      </p>
    </div>
  );
};
export default PrestepSections;
