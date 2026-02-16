import { buttonVariants } from "@/components/ui/button";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useWindowsBreakpoints } from "@/lib/hooks/useWindowBreakpoints";
import { AlertCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DashboardBoxContainer } from "../elements/DashboardBoxContainer";

export const MAPEL_MAPPING: Record<
  string,
  {
    slug: string;
    desktop: string;
    mobile: string;
  }
> = {
  "Pengetahuan Kuantitatif & Penalaran Matematika": {
    slug: "pkpm",
    desktop: "PK & PM",
    mobile: "PK & PM",
  },
  "Penalaran Umum": {
    slug: "pu",
    desktop: "Penalaran Umum",
    mobile: "PU",
  },
  "Bahasa Inggris": {
    slug: "bahasa-inggris",
    desktop: "Bahasa Inggris",
    mobile: "BING",
  },
  "Pemahaman Bacaan dan Menulis": {
    slug: "pbm",
    desktop: "Pemahaman Bacaan dan Menulis",
    mobile: "PBM",
  },
  "Pengetahuan dan Pemahaman Umum": {
    slug: "ppu",
    desktop: "Pengetahuan dan Pemahaman Umum",
    mobile: "PPU",
  },
  "Bahasa Indonesia": {
    slug: "bahasa-indonesia",
    desktop: "Bahasa Indonesia",
    mobile: "BINDO",
  },
};

export type FeedbackSoal = {
  topic: string;
  correct: number;
  total_question: number;
};

interface TopicCardI {
  subject: {
    name: string;
    icon: string;
    slug: string;
  };
  soalFinished: number;
  feedbacks: FeedbackSoal[];
  value: string;
}
export const TopicCard = ({
  subject,
  soalFinished,
  feedbacks,
  value,
}: TopicCardI) => {
  const { isXLDesktopBreakpoint } = useWindowsBreakpoints();
  return (
    <AccordionItem
      value={value}
      className="border-none"
    >
      <DashboardBoxContainer
        variant={feedbacks.length > 0 ? "primary" : "danger"}
        className="h-fit"
      >
        <AccordionTrigger className="w-full hover:no-underline [&>svg]:shrink-0">
          <div className="flex w-full flex-col gap-2 pr-4 text-left">
            <div className="flex flex-row items-center gap-3">
              <Image
                src={"https://bangsoal.s3.ap-southeast-1.amazonaws.com/static/pk.png"}
                alt="icon"
                width={20}
                height={20}
              />
              <p className="font-medium">{subject.name}</p>
            </div>
            <p className="text-3xl font-bold">
              {soalFinished} Soal <span className="text-xl">dikuasai</span>
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-1 ">
              <p className="text-nowrap text-xs">Topik yang belum kamu kuasai</p>
              <div className="h-[0.5] w-full bg-slate-300" />
            </div>
            <div className="flex flex-col gap-1">
              {feedbacks.length > 0 ? (
                feedbacks.map((feedback, idx) => {
                  return (
                    <div
                      className="flex justify-between bg-slate-100 px-3 py-2"
                      key={idx}
                    >
                      <p className="w-1/2 max-w-56 lg:w-56">{feedback.topic}</p>
                      <p className="text-right text-sm text-slate-600 lg:w-32">
                        {" "}
                        {feedback.correct || 0}/{feedback.total_question || 0}{" "}
                        soal benar
                      </p>
                    </div>
                  );
                })
              ) : (
                <DashboardBoxContainer variant={"dangerSecondary"}>
                  <p>
                    <AlertCircle className="text-red-500" />
                    Perbanyak latihan soal
                  </p>
                  <p>
                    Jangan lupa untuk melatih dirimu di setiap mata pelajaran
                    dengan rutin latihan soal.
                  </p>
                </DashboardBoxContainer>
              )}
            </div>
            <Link
              href={`/latihan-soal/${subject.slug}`}
              className={buttonVariants({ variant: "bsPrimary" })}
            >
              Latihan Soal <ArrowRight className="ml-1 w-4" />
            </Link>
          </div>
        </AccordionContent>
      </DashboardBoxContainer>
    </AccordionItem>
  );
};
