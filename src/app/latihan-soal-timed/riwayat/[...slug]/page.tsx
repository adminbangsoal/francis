import { Metadata } from "next";
import RiwayatTimedSoalAsideContainer from "../components/Aside";
import RiwayatTimedSoalContainer from "../components/RiwayatTimedSoalContainer";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: "Riwayat Latihan Soal Berwaktu | BangSoal",
    description: "BangSoal - Riwayat Latihan Soal Berwaktu Page",
  };
}

const LatihanSoalTimedRiwayatPage = ({
  params,
}: Readonly<{ params: { slug: string[] } }>) => {
  const { slug } = params;

  return (
    <main className="flex">
      <RiwayatTimedSoalAsideContainer timedQuestionId={slug[0]} />
      <RiwayatTimedSoalContainer timedQuestionId={slug[0]} />
    </main>
  );
};

export default LatihanSoalTimedRiwayatPage;
