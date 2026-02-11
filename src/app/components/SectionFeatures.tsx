"use client";
// components
import FeatureCard, { Feature } from "./FeatureCard";

// libs
import Image from "next/image";

// utils
import { shuffle } from "@/lib/utils";

export default function Features() {
  return (
    <section className="relative flex min-h-svh flex-col items-center px-5 py-20 sm:px-10 lg:px-20">
      <div className="flex flex-col gap-6 py-10">
        <h1 className="text-balance text-center text-3xl font-700 text-content-100 sm:text-5xl">
          Satu-satunya persiapan UTBK yang kamu butuhkan
        </h1>
        <p className="text-balance text-center font-500 text-content-300">
          Memberikan fitur-fitur yang kamu perlukan untuk masuk ke PTN impianmu
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-2">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            choices={shuffle(feature.choices)}
            answer={feature.answer}
            illustration={feature.illustration}
            description={feature.description}
            theme={feature.theme}
          />
        ))}
      </div>
      <div className="absolute -z-10 pt-36">
        <Image
          src="/bg-curve.svg"
          alt="Curve background"
          width={1440}
          height={240}
        />
        <Image
          src="/bg-curve.svg"
          alt="Curve background"
          width={1440}
          height={240}
        />
        <Image
          src="/bg-curve.svg"
          alt="Curve background"
          width={1440}
          height={240}
        />
        <Image
          src="/bg-curve.svg"
          alt="Curve background"
          width={1440}
          height={240}
        />
      </div>
    </section>
  );
}

const features: Feature[] = [
  {
    title: "Gimana melihat saingan yang mau masuk ke PTN tujuanku?",
    choices: ["Leaderboard", "Ranking", "Scoreboard", "Rating"],
    answer: "Leaderboard",
    illustration: "/illustrations/leaderboard.svg",
    description:
      "Dapatkan wawasan mengenai kompetisimu dan lihat posisimu melalui leaderboard.",
    theme: "emerald",
  },
  {
    title: "BangSoal menggunakan soal latihan tipe apa?",
    choices: [
      "Asli UTBK + Ujian Mandiri",
      "Prediksi",
      "Ujian sekolah",
      "Ujian bimbel",
    ],
    answer: "Asli UTBK + Ujian Mandiri",
    illustration: "/illustrations/latsol.svg",
    description:
      "BangSoal hanya menyediakan 100% asli soal UTBK, SIMAK, UM UGM, dan lebih dari tahun-tahun sebelumnya.",
    theme: "cyan",
  },
  {
    title: "Apa fitur yang akan membantu saya merasakan suasana ujian beneran?",
    choices: ["Timer", "Leaderboard", "Penjelasan jawaban", "Analytics"],
    answer: "Timer",
    illustration: "/illustrations/timer.svg",
    description:
      "Berlatih dengan ujian berdurasi untuk melihat seberapa baik kamu mengatur waktu.",
    theme: "indigo",
  },
  {
    title: "Apa yang bisa didapatkan dari mengerjakan latihan BangSoal?",
    choices: [
      "Feedback + penjelasan rinci",
      "Nilai",
      "Feedback",
      "Penjelasan rinci",
    ],
    answer: "Feedback + penjelasan rinci",
    illustration: "/illustrations/penjelasan.svg",
    description:
      "Dapatkan umpan balik dan penjelasan jawaban untuk setiap soal yang kamu kerjakan.",
    theme: "fuchsia",
  },
  {
    title: "Bagaimana aku bisa tetap termotivasi untuk belajar?",
    choices: ["Flash cards", "Kopi", "Bimbel", "Try out"],
    answer: "Flash cards",
    illustration: "/illustrations/flashcards.svg",
    description:
      "Tetap di puncak performamu dengan flash cards baru setiap hari",
    theme: "orange",
  },
  {
    title: "Apa cara terbaik untuk latihan soal di sekolah atau saat offline?",
    choices: ["PDF export", "Flash cards", "Scoreboard", "Rating"],
    answer: "PDF export",
    illustration: "/illustrations/print.svg",
    description:
      "Unduh dan cetak soal dengan mudah untuk dibagikan dengan teman dan berlatih di sekolah.",
    theme: "rose",
  },
];
