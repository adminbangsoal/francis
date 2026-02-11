"use client";
interface ProgressBarI {
  progress: number;
}
export const ProgressBar = ({ progress }: ProgressBarI) => {
  const value = Math.min(progress, 100);

  return (
    <div className="h-2 w-full rounded-full bg-[#E5E7EB]">
      <div
        className={`h-2 rounded-full bg-[#34D399]`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
