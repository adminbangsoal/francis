// libs
import { GetSubjectBySlugResponse } from "@/types";
import type { Metadata } from "next";
import { QuestionContainer } from "../components/QuestionContainer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
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

export default async function LatihanSoal({
  params,
}: Readonly<{ params: Promise<{ slug: string[] }> }>) {
  const { slug } = await params;
  return (
    <main className="md:h-screen md:overflow-y-scroll md:py-10">
      <QuestionContainer slug={slug} />
    </main>
  );
}
