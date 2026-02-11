import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Subject, SubjectResponse } from "@/types";
import { SetStateAction } from "react";

interface ToggleTimedSubjectProps {
  subjects: SubjectResponse;
  setSelectedSubjects: (value: SetStateAction<Subject | null>) => void;
  selectedSubject: Subject | null;
}

const ToggleTimedSubject = ({
  subjects,
  setSelectedSubjects,
  selectedSubject,
}: ToggleTimedSubjectProps): JSX.Element => {
  return (
    <ToggleGroup
      type="single"
      value={selectedSubject?.id ?? ""}
      className="w-full rounded-full bg-gray-200 py-1 text-gray-500 shadow-inner"
      onValueChange={(value) => {
        const subject = subjects.data.find((data) => data.id === value) || null;
        // Mixpanel.track("Clicked Subject", { subject: subject?.name });
        setSelectedSubjects(subject);
      }}
    >
      {subjects.data.map((data) => {
        return (
          <ToggleGroupItem
            key={data.id}
            value={data.id}
            className="data-[state=on]after:shadow-highlight data-[state=on]after:shadow-white/25 rounded-full data-[state=on]:border data-[state=on]:border-emerald-500 data-[state=on]:bg-emerald-400 data-[state=on]:text-white data-[state=on]:shadow data-[state=on]:after:rounded-full"
          >
            <h6 className="font-700">{selectedSubject?.alternate_name}</h6>
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
};

export default ToggleTimedSubject;
