import TOProContainer from "@/app/try-out/components/Pro/Container/TOProContainer";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = `TryOut | BangSoal`;
  return {
    title,
    description: "BangSoal - TryOut Page",
  };
}

export default async function TryOutProAttemptPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  return (
    <div>
      <TOProContainer />
    </div>
  );
}
