"use client";
import { useGetSubjectBySlugQuery } from "@/redux/api/latihanSoalApi";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import SoalAside from "./components/SoalAside";
import TimedLatihanSoalModal from "./components/TimedLatihanSoalModal";
import { LatihanSoalProvider } from "./context";

function LatihanSoalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { slug } = useParams();
  const { data, isSuccess } = useGetSubjectBySlugQuery(
    {
      slug: slug?.[0] || "",
    },
    {
      skip: !slug?.[0],
    },
  );

  // force redirect if slug subject is not found
  useEffect(() => {
    if (isSuccess && !data.data) {
      redirect("/latihan-soal/pu");
    }
  }, [data, isSuccess]);

  return (
    <LatihanSoalProvider>
      <TimedLatihanSoalModal />
      <div className="flex w-full flex-col overflow-hidden md:h-screen md:max-h-screen md:flex-row">
        {data && <SoalAside subject={data.data} />}
        <div className="grow overflow-y-auto pt-16 md:pt-0">{children}</div>
      </div>
    </LatihanSoalProvider>
  );
}

export default LatihanSoalLayout;
