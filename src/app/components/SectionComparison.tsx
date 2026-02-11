"use client";
// components
import Logo from "@/components/Logo";
import ComparisonScrollArea from "./ComparisonScrollArea";

export default function Comparison() {
  return (
    <section className="flex min-h-svh flex-col items-center px-5 py-10 sm:px-10 lg:px-20">
      <div className="flex flex-col gap-6 py-10">
        <h1 className="text-balance text-center text-3xl font-700 text-content-100 sm:text-5xl">
          Temukan apa yang membuat BangSoal cocok untuk kamu
        </h1>
        <p className="text-balance text-center font-500 text-content-300">
          Tidak ada platform lain yang menawarkan fitur sebanyak ini untuk
          membantu kamu masuk ke PTN terbaik
        </p>
      </div>
      <div className="relative flex w-full">
        <div className="flex shrink-0 basis-2/5 sm:min-w-[320px]">
          <div className="flex flex-1 flex-col">
            <div className="sticky top-12 bg-surface-100">
              <div className="flex h-28 w-full items-end justify-center text-center text-xl font-600 text-content-100 sm:text-3xl">
                Features
              </div>
              <div className="my-3 h-1 bg-surface-300" />
            </div>
            {data.features.map((feature) => (
              <div
                key={feature}
                className="flex h-28 items-center justify-center px-2 text-center text-xs font-600 text-content-200 sm:px-5 sm:text-base"
              >
                {feature}
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col rounded-2xl bg-[url('/bg-mesh-vertical-2.webp')] bg-cover">
            <div className="sticky top-12 z-10 rounded-t-2xl bg-white/5 backdrop-blur-xl">
              <div className="flex h-28 items-center justify-center">
                <Logo className="size-16" />
              </div>
              <div className="relative my-3 h-1 bg-emerald-300">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-200 px-5 py-1 text-sm font-600 text-emerald-800 sm:text-base">
                  BangSoal
                </div>
              </div>
            </div>
            {[...Array(9)].map((e, i) => (
              <div
                key={data.features[i]}
                className="flex h-28 items-center justify-center"
              >
                <i className="i-ph-seal-check-bold size-10 text-emerald-700" />
              </div>
            ))}
          </div>
        </div>
        <ComparisonScrollArea />
      </div>
    </section>
  );
}

export const data = {
  features: [
    "Soal asli UTBK dan ujian mandiri",
    "Pembahasan lengkap dan terperinci",
    "Pencarian soal per bab dan mata pelajaran",
    "Simulasi asli UTBK",
    "Komunitas belajar eksklusif",
    "Analisis performa",
    "Flash card harian",
    "Leaderboard",
    "Forum berbagi catatan",
  ],
  others: [
    {
      id: "Buku soal",
      logo: "/icons/PhBookOpenText.svg",
      icons: [
        "i-ph-check-circle-bold text-emerald-500",
        "i-ph-check-circle-bold text-emerald-500",
        "i-ph-check-circle-bold text-emerald-500",
        "i-ph-minus-circle-bold text-surface-400",
        "i-ph-minus-circle-bold text-surface-400",
        "i-ph-minus-circle-bold text-surface-400",
        "i-ph-minus-circle-bold text-surface-400",
        "i-ph-minus-circle-bold text-surface-400",
        "i-ph-minus-circle-bold text-surface-400",
      ],
      tooltips: [
        "Tidak semua soal asli",
        "Tidak semua menyediakan pembahasan",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    },
    {
      id: "Ruangguru",
      logo: "/icons/ruangguru.svg",
      icons: [
        "i-ph-minus-circle-bold text-surface-400",
        "i-ph-check-circle-bold text-emerald-500",
        "i-ph-check-circle-bold text-emerald-500",
        "i-ph-check-circle-bold text-emerald-500",
        "i-ph-minus-circle-bold text-surface-400",
        "i-ph-minus-circle-bold text-surface-400",
        "i-ph-minus-circle-bold text-surface-400",
        "i-ph-minus-circle-bold text-surface-400",
        "i-ph-minus-circle-bold text-surface-400",
      ],
      tooltips: [null, null, null, null, null, null, null, null, null],
    },
    {
      id: "Inten",
      logo: "/icons/inten.svg",
      icons: [
        "i-ph-minus-circle-bold text-surface-400",
        "i-ph-check-circle-bold text-emerald-500",
        "i-ph-check-circle-bold text-emerald-500",
        "i-ph-check-circle-bold text-emerald-500",
        "i-ph-minus-circle-bold text-surface-400",
        "i-ph-minus-circle-bold text-surface-400",
        "i-ph-minus-circle-bold text-surface-400",
        "i-ph-minus-circle-bold text-surface-400",
        "i-ph-minus-circle-bold text-surface-400",
      ],
      tooltips: [null, null, null, null, null, null, null, null, null],
    },
  ],
};
