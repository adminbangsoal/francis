import CheckboxGroup from "@/components/ui/checkbox-group";
import { TopicBySubjectResponse } from "@/types";

interface ChooseTopicSectionProps {
  topics: TopicBySubjectResponse;
  handleCheckboxChange: (selectedValues: string[]) => void;
  selectedValues: string[];
}

const ChooseTopicSection = ({
  topics,
  handleCheckboxChange,
  selectedValues,
}: ChooseTopicSectionProps): JSX.Element => {
  return (
    <div>
      <CheckboxGroup
        selectedValues={selectedValues}
        toggleSelectAll={true}
        options={topics.data.map(({ id, name }) => ({
          label: name,
          value: id,
        }))}
        className="flex flex-wrap gap-x-2 gap-y-1 rounded-lg bg-emerald-900/20 p-2 lg:grid lg:grid-cols-2 lg:gap-2 lg:bg-transparent"
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default ChooseTopicSection;
