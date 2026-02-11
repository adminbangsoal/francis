import { cn } from "@/lib/utils";

const TRYOUT_LABEL_CHIP_VARIANT = {
  kpu: "text-purple-600 bg-purple-200 border-purple-300",
  ppu: "border-orange-300 text-orange-600 bg-orange-200",
  pbm: "border-teal-300 text-teal-600 bg-teal-200",
  pk: "border-pink-300 text-pink-600 bg-pink-200",
  pb: "border-cyan-300 text-cyan-600 bg-cyan-200",
  pm: "border-yellow-300 text-yellow-600 bg-yellow-200",
};

interface TryoutLabelChipProps {
  variant: keyof typeof TRYOUT_LABEL_CHIP_VARIANT;
  subject: string;
  soalCount: number;
  duration: number;
  strongSubject?: boolean;
}

const TryoutLabelChip = ({
  variant,
  subject,
  soalCount,
  duration,
  strongSubject = false,
}: TryoutLabelChipProps) => {
  return (
    <div>
      <p
        className={cn(
          "mb-2 text-sm font-600 text-emerald-50",
          strongSubject && "text-base font-bold",
        )}
      >
        {subject}
      </p>
      <div className="flex gap-x-2">
        <div
          className={cn(
            TRYOUT_LABEL_CHIP_VARIANT[variant],
            "flex items-center gap-x-1 rounded-full border px-3 py-1 text-sm font-600",
          )}
        >
          <i className="i-ph-books-fill size-4"></i>
          {soalCount} soal
        </div>
        <div
          className={cn(
            TRYOUT_LABEL_CHIP_VARIANT[variant],
            "flex items-center gap-x-1 rounded-full border px-3 py-1 text-sm font-600",
          )}
        >
          <i className="i-ph-timer size-4"></i>
          {duration} menit
        </div>
      </div>
    </div>
  );
};

export default TryoutLabelChip;
