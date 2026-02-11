export const SoalTrackerSkeleton = () => {
  return (
    <div className="grid grid-cols-5 place-items-start gap-1">
      {[...Array(20)].map((_, idx) => {
        return (
          <div
            key={idx}
            className="skeleton relative h-10 w-full shrink-0 rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300"
          />
        );
      })}
    </div>
  );
};
