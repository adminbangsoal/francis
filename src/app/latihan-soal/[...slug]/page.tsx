// libs
import { GetSubjectBySlugResponse } from "@/types";
import type { Metadata } from "next";
import { QuestionContainer } from "../components/QuestionContainer";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  try {
    const subject: GetSubjectBySlugResponse = await (
      await fetch(`${process.env.API_URL}/api/subjects/slug/` + (slug?.[0] || ""))
    ).json();

    const title = `${subject.data.name || "Latihan Soal"} | BangSoal`;

    return {
      title,
      description: "BangSoal - Latihan Soal Page",
    };
  } catch (error) {
    return {
      title: "BangSoal",
      description: "BangSoal - Latihan Soal Page",
    };
  }
}

export default function LatihanSoal({
  params,
}: Readonly<{ params: { slug: string[] } }>) {
  return (
    <main className="md:h-screen md:overflow-y-scroll md:py-10">
      <QuestionContainer slug={params.slug} />
    </main>
  );
}
