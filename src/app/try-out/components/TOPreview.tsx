"use client";
import { useSearchParams } from "next/navigation";
import MediaQuery from "react-responsive";
import { TOProOverview } from "../pro/TOProOverview";

export const TOPreview = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <div className="h-full min-h-screen border-gray-100 bg-[url('/bg-mesh-vertical.webp')] bg-cover px-5 pt-10 md:h-fit md:min-h-0 lg:border-t-2 lg:bg-white lg:bg-none lg:px-10 lg:pb-5 lg:pt-8">
      <MediaQuery maxWidth={1023}>
        <div className="flex flex-col justify-center gap-4 pb-8 text-center text-white">
          <p className="text-3xl font-bold">Try Out</p>
          <div className="h-[1px] w-full bg-white/20" />
        </div>
      </MediaQuery>
      <TOProOverview />
    </div>
  );
};
