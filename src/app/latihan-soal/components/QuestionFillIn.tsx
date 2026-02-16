"use client";
import { Content } from "@/types";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const RenderMarkdown = dynamic(() => import("./RenderMarkdown"), {
  ssr: false,
  loading: () => (
    <div className="skeleton relative h-6 w-full rounded-lg bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
  ),
});

interface QuestionFillInProps {
  content: Content[];
  filledAnswers?: string[];
  correctAnswer?: string[];
  isCorrect?: boolean;
}

const QuestionFillIn = ({
  content,
  filledAnswers = [],
  correctAnswer = [],
  isCorrect,
}: QuestionFillInProps): JSX.Element => {
  const pathname = usePathname();

  const isRiwayatPage = pathname.includes("riwayat");

  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const contentElement = contentRef.current;

    if (contentElement) {
      setTimeout(() => {
        let inputCount = 0;
        const htmlContent = contentElement.innerHTML;

        if (htmlContent === null) return;

        if (!isRiwayatPage) {
          const updatedHTML = htmlContent.replace(/\[FILL\]/g, () => {
            if (correctAnswer[inputCount] || filledAnswers[inputCount]) {
              const correct =
                isCorrect ||
                filledAnswers[inputCount] === correctAnswer[inputCount];
              const color = correct
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-500";

              return `<input type="text" class="w-20 h-8 border border-gray-400 rounded-md px-2 ${color}" value="${filledAnswers[inputCount++]}" disabled />`;
            }
            return `<input type="text" class="w-20 h-8 border border-gray-400 rounded-md px-2" />`;
          });
          contentElement.innerHTML = updatedHTML;
        } else {
          const updatedHTML = htmlContent.replace(/\[FILL\]/g, () => {
            return `<input type="text" class="w-20 h-8 border border-gray-400 rounded-md px-2 bg-emerald-100 text-emerald-700" value="${correctAnswer[inputCount++]}" disabled />`;
          });
          contentElement.innerHTML = updatedHTML;
        }
      }, 0);
    }
  }, [content, filledAnswers, correctAnswer]);

  return (
    <div className="flex flex-wrap">
      <div ref={contentRef}>
        {content.map(({ content, isMedia }, index) => {
          return !isMedia ? (
            <RenderMarkdown markdown={content} key={index} />
          ) : (
            <Image
              src={content}
              alt="asset image"
              width={500}
              height={300}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionFillIn;
