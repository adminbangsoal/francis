// libs
import type { Metadata } from "next";
import { LatsolSekuensialModule } from "../LatsolSekuensialModule";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: "Latihan Soal Berwaktu | BangSoal",
    description: "BangSoal - Latihan Soal Berwaktu Sekuensial Page",
  };
}

export default function LatihanSoalSekuensial({
  params,
}: Readonly<{ params: { slug: string[] } }>) {
  return (
    <main className="min-h-screen md:py-10 lg:h-screen lg:overflow-y-scroll">
      <LatsolSekuensialModule />
    </main>
  );
}
