import QuestionTableHeader from "@/app/latihan-soal/components/QuestionTableHeader";
import RenderMarkdown from "@/app/latihan-soal/components/RenderMarkdown";
import { cn } from "@/lib/utils";
import { LatihanSoalHistoryByIdResponse } from "@/types";
import { useEffect, useState } from "react";

interface QuestionHistoryTableProps {
  isCorrectState: boolean; // flag for the correct answer
  data: LatihanSoalHistoryByIdResponse;
  filledAnswersAttempt: string[];
}

const QuestionHistoryTable = ({
  isCorrectState,
  data,
  filledAnswersAttempt,
}: QuestionHistoryTableProps): JSX.Element => {
  const [correctIndexes, setCorrectIndexes] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      const correctKeys = data.data.question.options.map(({ is_true }) => {
        return is_true ? "TRUE" : "FALSE";
      });
      setCorrectIndexes(correctKeys);
    }
  }, [data]);

  return (
    <div className="w-full">
      {data &&
        isCorrectState &&
        data.data.question.content.map(({ content, isMedia }, index) => {
          return (
            <RenderMarkdown
              key={index}
              markdown={!isMedia ? content : ""}
              asset={isMedia ? content : undefined}
            />
          );
        })}
      <table className="mb-5 w-full border-separate border-spacing-y-5">
        <QuestionTableHeader />
        <tbody>
          {data?.data?.question.options?.map((option, index) => {
            const value = correctIndexes[index];
            const choosenAnswer = filledAnswersAttempt[index];

            return (
              <tr
                key={option.id}
                className={
                  isCorrectState
                    ? "bg-gray-100"
                    : cn(
                        filledAnswersAttempt[index] === correctIndexes[index]
                          ? "bg-green-100"
                          : "bg-red-100",
                      )
                }
              >
                <td className="rounded-l-lg py-5 pl-5 text-base font-semibold text-gray-500">
                  <RenderMarkdown markdown={option.content} />
                </td>
                <td className="relative text-center">
                  <div className="absolute right-0 top-0 flex h-full items-center justify-center">
                    <span className="h-[30%] w-[0.5px] bg-gray-300"></span>
                  </div>
                  {isCorrectState ? (
                    <input
                      checked={isCorrectState ? value === "TRUE" : false}
                      disabled={true}
                      value="TRUE"
                      type="radio"
                      name={option.id}
                      id={option.id}
                    />
                  ) : (
                    <input
                      checked={choosenAnswer === "TRUE"}
                      disabled={true}
                      type="radio"
                      id={option.id}
                    />
                  )}
                </td>
                <td className="relative mr-5 rounded-r-lg text-center">
                  <div className="absolute left-0 top-0 flex h-full items-center justify-center">
                    <span className="h-[30%] w-[0.75px] bg-gray-300"></span>
                  </div>
                  {isCorrectState ? (
                    <input
                      checked={isCorrectState ? value === "FALSE" : false}
                      disabled={true}
                      value="FALSE"
                      type="radio"
                      name={option.id}
                      id={option.id}
                    />
                  ) : (
                    <input
                      checked={choosenAnswer === "FALSE"}
                      disabled={true}
                      type="radio"
                      id={option.id}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionHistoryTable;
