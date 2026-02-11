import type { Metadata } from "next";
import { TOPreview } from "./components/TOPreview";

export async function generateMetadata(): Promise<Metadata> {
  const title = `TryOut | BangSoal`;
  return {
    title,
    description: "BangSoal - TryOut Page",
  };
}

export default function TryOutHomePage() {
  return (
    <main>
      <TOPreview />
    </main>
  );
}
