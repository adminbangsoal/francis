// libs
import type { Metadata } from "next";
import QuestionHistoryContainer from "./components/QuestionHistoryContainer";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Riwayat Latihan Soal | BangSoal";
  return {
    title,
    description: "BangSoal - Riwayat Latihan Soal Page",
  };
}

export default function RiwayatLatihanSoal() {
  return (
    <main className="min-h-screen md:py-10 lg:h-screen lg:overflow-y-scroll">
      <QuestionHistoryContainer />
    </main>
  );
}
