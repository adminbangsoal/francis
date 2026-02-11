// libs
import type { Metadata } from "next";
import { PilihMode } from "./components/modals/PilihMode";
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const title = `Latihan Soal | BangSoal`;
  return {
    title,
    description: "BangSoal - Latihan Soal Page",
  };
}

export default function LatihanSoalNewPage() {
  return (
    <div className="min-h-screen md:py-10 lg:h-screen lg:overflow-y-scroll">
      <PilihMode />
    </div>
  );
}
