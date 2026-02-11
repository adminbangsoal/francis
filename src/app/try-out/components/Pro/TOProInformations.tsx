import { cn } from "@/lib/utils";
import { TagVariants } from "../style";

interface TOProInformationsProps {
  total_sets_questions: number;
  total_sets_duration: number;
}
const TOProInformations = ({
  total_sets_duration,
  total_sets_questions,
}: TOProInformationsProps) => {
  return (
    <div className="hidden flex-col gap-1 lg:flex">
      <div className={cn(TagVariants({ rounded: "large" }), "font-bold")}>
        <i className="i-ph-books-bold size-5" />
        {total_sets_questions} soal
      </div>
      <div className={cn(TagVariants({ rounded: "large" }), "font-bold")}>
        <i className="i-ph-timer-bold size-5" />
        {Math.round((total_sets_duration / 60) * 10) / 10} menit
      </div>
    </div>
  );
};

export default TOProInformations;
