import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationsContainerProps {
  currentNumber: number;
  handleToggleFlag: (currentNumber: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  disableNext: boolean;
  disablePrev: boolean;
  onSubmitCondition: boolean;
}
const NavigationsContainer = ({
  currentNumber,
  disableNext,
  disablePrev,
  handleNext,
  handlePrev,
  handleToggleFlag,
  onSubmitCondition,
}: NavigationsContainerProps) => {
  const submitVariant = onSubmitCondition ? "bsPrimary" : "bsWhite";
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        onClick={() => handleToggleFlag(currentNumber)}
        variant={"bsWhite"}
        className="col-span-2 font-semibold lg:order-3 lg:bg-gray-200  lg:text-gray-500"
      >
        <i className="i-ph-flag-banner-fill mr-1 size-4" />
        Tandain Soal
      </Button>

      <Button
        disabled={disablePrev}
        onClick={handlePrev}
        variant={"bsWhite"}
        className="border lg:order-1 lg:border-gray-400 lg:bg-gray-300"
      >
        <i className="i-ph-arrow-left-light size-4 " />
      </Button>
      {
        <Button
          disabled={disableNext}
          onClick={handleNext}
          variant={submitVariant}
          className={cn(
            !onSubmitCondition && "border lg:border-gray-400 lg:bg-gray-300",
            "lg:order-2 lg:mb-2",
          )}
        >
          {onSubmitCondition ? (
            "Submit"
          ) : (
            <i className="i-ph-arrow-right-light size-4" />
          )}
        </Button>
      }
    </div>
  );
};

export default NavigationsContainer;
