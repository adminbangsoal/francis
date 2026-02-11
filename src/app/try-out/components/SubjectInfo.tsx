"use client";
import { cn } from "@/lib/utils";
import { TagCVAProps, TagVariants } from "./style";

interface SubjectCardProps extends TagCVAProps {
  subject: string;
  total: number;
  duration: number;
  slug?: string;
  isSubject?: boolean;
}
export const SubjectInfo = ({
  subject,
  total,
  duration,
  isSubject,
  slug,
  ...cvaprops
}: SubjectCardProps) => {
  return (
    <div
      className={
        "place-center group grid grid-cols-1 gap-2 transition-all lg:grid-cols-6 lg:gap-3"
      }
    >
      <p className={cn(isSubject && "font-bold", "lg:col-span-3")}>{subject}</p>
      <div className="flex flex-row items-center gap-2 lg:col-span-2 lg:justify-self-center">
        <div
          className={cn(
            TagVariants({ ...cvaprops, size: "small" }),
            "w-28 whitespace-nowrap",
          )}
        >
          <i className="i-ph-books size-4" />
          <span>{total} soal</span>
        </div>
        <div
          className={cn(
            TagVariants({ ...cvaprops, size: "small" }),
            "w-28 whitespace-nowrap",
          )}
        >
          <i className="i-ph-timer size-4" />
          <span>{(duration / 60).toFixed(0)} menit</span>
        </div>
      </div>
    </div>
  );
};
