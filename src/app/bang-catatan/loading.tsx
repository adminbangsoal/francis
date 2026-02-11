export default function Loading() {
  return (
    <main className="flex h-screen flex-col items-stretch gap-8 overflow-hidden px-5 pb-20 sm:px-10 xl:px-20">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 py-10">
          <h1 className="text-3xl font-700 text-content-100">Bang Catatan</h1>
          <h2 className="text-xl font-500 text-content-300">
            Temukan dan bagikan berbagai sumber belajar bersama Komunitas Bang
            Soal!
          </h2>
        </div>
        <div className="skeleton h-10 w-24 shrink-0 rounded-full bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
      </div>
      <div className="flex items-center gap-3 text-content-300">
        <div className="relative">
          <div className="skeleton absolute left-5 top-1/2 size-4 -translate-y-1/2 rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
          <input
            type="text"
            placeholder="Cari catatan"
            className="skeleton to surface-200 flex h-10 w-80 items-center rounded-full border-2 border-surface-300 bg-surface-200 from-surface-200 via-surface-100 pl-11 font-500"
          />
        </div>
        <div className="h-0.5 grow rounded-full bg-surface-200" />
      </div>
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
    </main>
  );
}
