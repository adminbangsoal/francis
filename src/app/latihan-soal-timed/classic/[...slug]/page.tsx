// libs
import type { Metadata } from "next";
import { LatsolKlasikModule } from "../LatsolKlasikModule";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: "Latihan Soal Berwaktu | BangSoal",
    description: "BangSoal - Latihan Soal Berwaktu Klasik Page",
  };
}

export default function LatihanSoalKlasik({
  params,
}: Readonly<{ params: { slug: string[] } }>) {
  return (
    <main className="min-h-screen md:py-10 lg:h-screen lg:overflow-y-scroll">
      <LatsolKlasikModule />
    </main>
  );
}
