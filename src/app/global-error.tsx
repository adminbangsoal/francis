"use client";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  console.error("Global error:", error);

  return (
    <div>
      <h2>Something went wrong!</h2>
    </div>
  );
}
