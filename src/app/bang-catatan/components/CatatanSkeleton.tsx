export const CatatanSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <div className="flex flex-col gap-2">
        <div className="skeleton aspect-[16/10] rounded-xl bg-surface-300 from-surface-300 via-surface-100 to-surface-300 px-16 pt-10">
          <div className="skeleton h-full w-full rounded-t-lg bg-surface-200 from-surface-200 via-surface-100 to-surface-200 shadow-2xl" />
        </div>
        <div className="skeleton mx-3 h-6 grow rounded-md bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="skeleton aspect-[16/10] rounded-xl bg-surface-300 from-surface-300 via-surface-100 to-surface-300 px-16 pt-10">
          <div className="skeleton h-full w-full rounded-t-lg bg-surface-200 from-surface-200 via-surface-100 to-surface-200 shadow-2xl" />
        </div>
        <div className="skeleton mx-3 h-6 grow rounded-md bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="skeleton aspect-[16/10] rounded-xl bg-surface-300 from-surface-300 via-surface-100 to-surface-300 px-16 pt-10">
          <div className="skeleton h-full w-full rounded-t-lg bg-surface-200 from-surface-200 via-surface-100 to-surface-200 shadow-2xl" />
        </div>
        <div className="skeleton mx-3 h-6 grow rounded-md bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
      </div>
      <div className="hidden flex-col gap-2 sm:flex xl:hidden">
        <div className="skeleton aspect-[16/10] rounded-xl bg-surface-300 from-surface-300 via-surface-100 to-surface-300 px-16 pt-10">
          <div className="skeleton h-full w-full rounded-t-lg bg-surface-200 from-surface-200 via-surface-100 to-surface-200 shadow-2xl" />
        </div>
        <div className="skeleton mx-3 h-6 grow rounded-md bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
      </div>
    </div>
  );
};
