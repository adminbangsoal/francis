"use client";
import { cn, formatDateToIndonesian } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllActiveTOKilatsDummy } from "../dummy";

export const TOKilatAside = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const subjectQuery = searchParams.get("subject");
  const [currentTopic, setCurrentTopic] = useState<string>(
    subjectQuery ?? getAllActiveTOKilatsDummy.tryouts?.[0]?.id,
  );

  useEffect(() => {
    if (!!currentTopic && currentTopic !== "") {
      router.replace(`/try-out?type=kilat&subject=${currentTopic}`);
    }
  }, [currentTopic]);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-center gap-2 py-2 lg:justify-start">
          <p className="whitespace-nowrap text-lg font-bold text-gray-500">
            Pilih subjek
          </p>
          <div className="hidden h-1 grow rounded-full bg-gray-300 lg:block" />
        </div>
        <div className="w-full lg:hidden">
          {/* <SelectTO
            currentTopic={currentTopic}
            setCurrentTopic={setCurrentTopic}
            listData={[
              { id: "Topic 1", name: "Penalaran Umum" },
              { id: "123", name: "Bahasa Inggris" },
            ]}
          /> */}
        </div>
        <div className="hidden flex-col gap-1 rounded-lg bg-gray-200 p-2 text-start font-semibold text-gray-700 lg:flex">
          {getAllActiveTOKilatsDummy.tryouts.map(
            ({ id, name, expiry_date }) => (
              <button
                className={cn(
                  subjectQuery == id &&
                    "rounded-lg border border-emerald-500 bg-emerald-400 text-white shadow after:shadow-highlight after:shadow-white/25  hover:border-emerald-600 hover:bg-emerald-500 hover:text-white active:scale-95",
                  "px-2 py-1",
                )}
                key={id}
                onClick={() => setCurrentTopic(id)}
                // href={`/try-out?type=kilat&subject=${id}`}
                // replace
              >
                <div className="flex flex-row justify-between">
                  <p>{name}</p>
                  <p>{formatDateToIndonesian(expiry_date)}</p>
                </div>
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
};
