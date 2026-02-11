import Link from "next/link";

const choices = [
  {
    id: "a",
    text: "Beranda",
    link: "/",
  },
  {
    id: "b",
    text: "Latihan soal",
    link: "/latihan-soal",
  },
  {
    id: "c",
    text: "Leaderboard",
    link: "/leaderboard",
  },
  {
    id: "d",
    text: "BangCatatan",
    link: "/bang-catatan",
  },
];

export default function NotFound() {
  return (
    <main className="relative flex h-svh flex-col items-center justify-center gap-5 overflow-hidden px-20">
      <h1 className="text-balance text-center text-5xl font-600">
        Halaman tidak ditemukan bang!
      </h1>
      <div className="flex w-full max-w-screen-xs flex-col gap-1">
        {choices.map((choice) => (
          <Link
            key={choice.id}
            href={choice.link}
            className="group flex h-auto w-full select-none items-center justify-start gap-2 rounded-md border border-surface-300 bg-surface-100 p-1 pr-2 text-left font-500 text-content-200 transition-transform hover:scale-[1.025] hover:bg-surface-100 active:scale-[0.975]"
          >
            <div className="flex w-8 shrink-0 items-center justify-center self-stretch rounded-sm bg-surface-200 font-700 uppercase text-content-100">
              {choice.id}
            </div>
            <p className="py-2">{choice.text}</p>
          </Link>
        ))}
      </div>

      <div className="absolute inset-0 -z-10 gradient-mask-b-0">
        <div className="absolute left-1/2 top-1/2 aspect-square w-2/6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-100" />
        <div className="absolute left-1/2 top-1/2 aspect-square w-3/6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-100/85" />
        <div className="absolute left-1/2 top-1/2 aspect-square w-4/6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-100/70" />
        <div className="absolute left-1/2 top-1/2 aspect-square w-5/6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-100/55" />
      </div>
    </main>
  );
}
