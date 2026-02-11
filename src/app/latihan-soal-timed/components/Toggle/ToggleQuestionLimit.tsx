import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ToggleQuestionLimitProps {
  setQuestionLimit: (value: number) => void;
  questionLimitValue: number;
}
const QUESTION_LIMIT = ["5", "10", "15", "20"];
const ToggleQuestionLimit = ({
  setQuestionLimit,
  questionLimitValue,
}: ToggleQuestionLimitProps): JSX.Element => {
  return (
    <div className="w-full">
      <ToggleGroup
        value={questionLimitValue.toString()}
        type="single"
        className="w-full rounded-full bg-gray-200 px-1 py-1 text-gray-500 shadow-inner"
        onValueChange={(value) => {
          setQuestionLimit(Number(value));
        }}
      >
        {QUESTION_LIMIT.map((num) => {
          return (
            <ToggleGroupItem
              key={num}
              value={num}
              className="data-[state=on]after:shadow-highlight data-[state=on]after:shadow-white/25 w-1/4 rounded-full data-[state=on]:border data-[state=on]:border-emerald-500 data-[state=on]:bg-emerald-400 data-[state=on]:text-white data-[state=on]:shadow data-[state=on]:after:rounded-full"
            >
              <h6 className="font-700">{num}</h6>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
};

export default ToggleQuestionLimit;
