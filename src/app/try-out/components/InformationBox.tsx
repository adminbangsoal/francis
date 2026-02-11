import { cn } from "@/lib/utils";

interface InformationBoxProps {
  message: string;
  className?: string;
}
export const InformationBox = ({
  message,
  className = "",
}: InformationBoxProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <i className="i-ph-seal-warning-fill mx-auto size-10 w-full text-emerald-700" />
      <div className="-mt-5 rounded-lg bg-emerald-100 px-3 pb-3 pt-6 text-justify font-semibold text-emerald-700">
        {message}
      </div>
    </div>
  );
};
