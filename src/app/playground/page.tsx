"use client";
import { cn } from "@/lib/utils";
import {
  useAttemptLatihanSoalMutation,
  useGetAttemptLatihanSoalQuery,
  useGetLatihanSoalDetailQuery,
  useGetPembahasanQuery,
} from "@/redux/api/latihanSoalApi";
import { Pembahasan } from "@/types";
import { useEffect, useState } from "react";
import RenderMarkdown from "../latihan-soal/components/RenderMarkdown";

const Playground = () => {
  const [correctChoicesMapping, setCorrectChoicesMapping] = useState<string[]>(
    [],
  );
  const { data } = useGetLatihanSoalDetailQuery({
    id: "f4f4484e-01b0-4cf0-af2a-4a0cc8253a5f",
  });

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
      question_id: data?.data?.id as string,
      attempt_id: attemptD?.data?.id as string,
    },
    {
      skip: !attemptD?.data,
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
        data.data.content.map(({ content }, idx) => {
          return <RenderMarkdown key={idx} markdown={content} />;
        })}
      <div className="w-full p-5">
        <table className="mb-5 w-full border-separate border-spacing-y-5">
          <thead>
            <tr className="pb-5">
              <th className="pb-5 text-left">
                <span className="mr-2 text-base font-bold text-gray-700">
                  Pernyataan
                </span>
                <span className="hidden text-base font-bold text-gray-400 md:inline">
                  (Pilih benar/salah pada tiap baris pernyataan)
                </span>
              </th>
              <th className="px-2 pb-5 text-center text-base font-bold text-emerald-700">
                Benar
              </th>
              <th className="px-2 pb-5 text-center text-base font-bold text-rose-700">
                Salah
              </th>
            </tr>
          </thead>
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
                    <div className="absolute right-[1px] top-0 flex h-full items-center justify-center">
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
    </div>
  );
};

export default Playground;
