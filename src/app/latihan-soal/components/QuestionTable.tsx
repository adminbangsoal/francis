import { cn } from "@/lib/utils";
import {
  useAttemptLatihanSoalMutation,
  useGetAttemptLatihanSoalQuery,
  useGetPembahasanQuery,
} from "@/redux/api/latihanSoalApi";
import { Pembahasan, SoalQuestionDetailResponse } from "@/types";
import { useEffect, useState } from "react";
import QuestionTableHeader from "./QuestionTableHeader";
import RenderMarkdown from "./RenderMarkdown";

interface QuestionTableProps {
  data: SoalQuestionDetailResponse;
}

const QuestionTable = ({ data }: QuestionTableProps) => {
  const [correctChoicesMapping, setCorrectChoicesMapping] = useState<string[]>(
    [],
  );

  const { data: attemptD } = useGetAttemptLatihanSoalQuery(
    {
      question_id: data?.data.id as string,
    },
    {
      skip: !data,
    },
  );

  const [attempt] = useAttemptLatihanSoalMutation();

  const { data: pembahasan } = useGetPembahasanQuery(
    {
      question_id: data?.data.id as string,
      attempt_id: attemptD?.data?.id as string,
    },
    {
      skip: !attemptD?.data?.submitted,
    },
  );

  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (attemptD?.data && attemptD.data?.filledAnswers) {
      setAnswers([...attemptD.data.filledAnswers]);
    }
  }, [attemptD?.data]);

  useEffect(() => {
    if (pembahasan?.data) {
      const isTrueMapping = (
        pembahasan?.data?.correct_answer as Pembahasan
      ).choice?.map((choice) => (choice.is_true ? "TRUE" : "FALSE"));
      setCorrectChoicesMapping(isTrueMapping || []);
    }
  }, [pembahasan?.data, attemptD]);

  return (
    <div>
      {data &&
        data.data.content.map(({ content }, index) => {
          return <RenderMarkdown key={index} markdown={content} />;
        })}

      <table className="mb-5 w-full border-separate border-spacing-y-5">
        <QuestionTableHeader />
        <tbody>
          {data?.data?.options?.map((option, index) => {
            const isCorrect = correctChoicesMapping[index] === answers[index];
            return (
              <tr
                key={option.id}
                className={cn(
                  "bg-gray-100",
                  pembahasan &&
                    correctChoicesMapping.length > 0 &&
                    (isCorrect ? "bg-emerald-100" : "bg-rose-100"),
                )}
              >
                <td className="rounded-l-lg py-5 pl-5 text-base font-semibold text-gray-500">
                  <RenderMarkdown markdown={option.content} />
                </td>
                <td className="relative text-center">
                  <div className="absolute right-0 top-0 flex h-full items-center justify-center">
                    <span className="h-[30%] w-[0.5px] bg-gray-300"></span>
                  </div>
                  <input
                    checked={answers[index] === "TRUE"}
                    disabled={pembahasan !== undefined}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[index] = e.target.value;

                      // fill the empty answer with empty string
                      for (let i = 0; i < newAnswers.length; i++) {
                        if (newAnswers[i] === undefined) {
                          newAnswers[i] = "";
                        }
                      }
                      attempt({
                        question_id: data.data.id,
                        answers: newAnswers,
                        answer_history: "",
                        choice_id: undefined,
                      });
                      setAnswers(newAnswers);
                    }}
                    value="TRUE"
                    type="radio"
                    name={option.id}
                    id={option.id}
                  />
                </td>

                <td className="relative mr-5 rounded-r-lg text-center">
                  <div className="absolute left-0 top-0 flex h-full items-center justify-center">
                    <span className="h-[30%] w-[0.75px] bg-gray-300"></span>
                  </div>
                  <input
                    checked={answers[index] === "FALSE"}
                    disabled={pembahasan !== undefined}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[index] = e.target.value;
                      // fill the empty answer with empty string
                      for (let i = 0; i < newAnswers.length; i++) {
                        if (newAnswers[i] === undefined) {
                          newAnswers[i] = "";
                        }
                      }
                      attempt({
                        question_id: data.data.id,
                        answers: newAnswers,
                        answer_history: "",
                        choice_id: undefined,
                      });
                      setAnswers(newAnswers);
                    }}
                    value="FALSE"
                    type="radio"
                    name={option.id}
                    id={option.id}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionTable;
