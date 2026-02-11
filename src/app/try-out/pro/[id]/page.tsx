// libs
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = `TryOut | BangSoal`;
  return {
    title,
    description: "BangSoal - TryOut Page",
  };
}

export default function TryOutProPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  return <main className="md:h-screen md:overflow-y-scroll md:py-10 "></main>;
}
