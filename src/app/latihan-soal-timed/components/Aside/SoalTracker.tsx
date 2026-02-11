"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLatihanContext } from "../../context/LatihanContext";
import { SoalTrackerCVAProps, SoalTrackerVariants } from "./style";
interface SoalTrackerI {
  maxNumber: number;
  currentNumber?: number;
  isSekuensial?: boolean;
  classicSoalData?: { [key: string]: boolean };
  handleNumberClick?: (value: string, idx: number) => void;
  isTO?: boolean;
  flaggedNumber?: number[];
  answeredNumber?: number[];
  wrongNumber?: number[];
}
export const SoalTracker = ({
  maxNumber,
  isSekuensial = false,
  currentNumber,
  classicSoalData,
  handleNumberClick,
  isTO = false,
  flaggedNumber = [],
  answeredNumber = [],
  wrongNumber = [],
}: SoalTrackerI) => {
  const { slug } = useLatihanContext();
  const pathname = usePathname();
  const keys = Object.keys(classicSoalData || {});
  const isRiwayatTOPage = pathname.includes("/try-out/riwayat");
  const [unansweredNumbers, setUnansweredNumbers] = useState<number[]>([]);
  const getSoalTrackerVariant = (
    isActive: boolean,
    isTO: boolean,
    hasAnswer: boolean,
    isSekuensial: boolean,
    isDisabled: boolean,
  ): SoalTrackerCVAProps => {
    let subType = "none"; // default subtype

    if (isSekuensial && isDisabled) {
      subType = "disabled";
    } else if (isTO && isActive) {
      subType = "toActive";
    } else if (isTO && hasAnswer) {
      subType = "toAnswered";
    } else if (isActive || hasAnswer) {
      subType = "primary";
    }

    return {
      type: isTO ? "to" : isActive ? "active" : "inactive",
      subType: subType,
    } as SoalTrackerCVAProps;
  };

  useEffect(() => {
    if (isRiwayatTOPage) {
      const unansweredNumbers = [];
      for (let i = 0; i < maxNumber; i++) {
        if (!answeredNumber.includes(i + 1)) {
          unansweredNumbers.push(i + 1);
        }
      }
      setUnansweredNumbers(unansweredNumbers);
    }
  }, [answeredNumber, isRiwayatTOPage]);

  return (
    <div
      className={cn(
        isTO
          ? "flex w-full gap-1 overflow-x-auto lg:grid lg:grid-cols-5 lg:place-items-start lg:overflow-hidden"
          : "grid grid-cols-5 place-items-start gap-1 overflow-hidden",
      )}
    >
      {[...Array(maxNumber)].map((_, idx) => {
        const soalNum =
          (currentNumber ?? parseInt(slug.slice(-1)[0] || "0")) - 1;

        const isActive =
          currentNumber !== undefined
            ? idx == currentNumber - 1
            : idx == soalNum;

        const isDisabled = idx < soalNum;

        let hasAnswer = false;

        if (!!classicSoalData) {
          hasAnswer = classicSoalData[keys[idx]];
        }

        const isFlagged = flaggedNumber.includes(idx + 1);
        const isAnswered = answeredNumber.includes(idx + 1);
        const isWrong = wrongNumber.includes(idx + 1);
        const isUnanswered = unansweredNumbers.includes(idx + 1);
        return (
          <button
            key={idx}
            className={cn(
              SoalTrackerVariants(
                getSoalTrackerVariant(
                  isActive,
                  isTO,
                  hasAnswer,
                  isSekuensial,
                  isDisabled,
                ),
              ),

              isAnswered && !isActive && "bg-green-400 text-white",
              isFlagged && "border-orange-400 bg-orange-300 !text-white",
              isTO &&
                "lg:min-w-auto w-fit min-w-[2.5rem] px-2 lg:w-full lg:px-0",
              isWrong && "border-red-800 !bg-red-700 !text-white",
              isUnanswered && "border-gray-500 !bg-gray-400 !text-white",
            )}
            disabled={isSekuensial && isDisabled}
            onClick={() => {
              if (!!handleNumberClick) {
                handleNumberClick(keys[idx], idx);
              }
            }}
          >
            {!!isActive && !isTO && (
              <span className={cn("size-2 shrink-0 rounded-full bg-white")} />
            )}
            <span
              className={cn(
                "text-black",
                (isActive || isAnswered || isUnanswered) && "text-white",
              )}
            >
              {idx + 1}
            </span>
          </button>
        );
      })}
    </div>
  );
};
