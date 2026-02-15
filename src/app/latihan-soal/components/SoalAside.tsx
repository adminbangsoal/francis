"use client";

// libs
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

// utils
import { useWindowsBreakpoints } from "@/lib/hooks/useWindowBreakpoints";
import { Subject } from "@/types";
import { useLatihanSoalContext } from "../context";
import SoalAsideDesktop from "./SoalAsideDesktop";
import SoalAsideMobile from "./SoalAsideMobile";

interface SoalAsideProps {
  subject: Subject;
}

export default function SoalAside({ subject }: SoalAsideProps) {
  const { slug } = useParams();
  const router = useRouter();
  const { isDesktopBreakpoint } = useWindowsBreakpoints();

  const { soalData, setDefaultValueTabIndex } = useLatihanSoalContext();

  useEffect(() => {
    if (!subject) {
      router.replace("/latihan-soal/pu");
    }
  }, [slug?.[0], subject]);
  // if the subject is changing, set the default value of the tab index to be the first question
  useEffect(() => {
    if (!slug?.[1] && soalData.length > 0) {
      setDefaultValueTabIndex(0);
      router.replace(`/latihan-soal/${subject.slug}/${soalData[0].id}`);
    }
  }, [slug?.[0], soalData, subject, slug?.[1]]);

  return isDesktopBreakpoint ? (
    <SoalAsideDesktop subject={subject} />
  ) : (
    <SoalAsideMobile subject={subject} />
  );
}
