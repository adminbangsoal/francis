import UpgradePremiumContainer from "@/app/components/UpgradePremiumContainer";
import { cn } from "@/lib/utils";
import { GetTOHistoryQuestionAnalyticsResponse } from "@/types/tryout-history";
import { useEffect, useState } from "react";

interface AnalyticsContainerProps {
  analyticsData: GetTOHistoryQuestionAnalyticsResponse;
}

const difficultyLevelStyle = {
  MUDAH: "bg-green-100 text-green-600",
  NORMAL: "bg-yellow-100 text-yellow-600",
  SULIT: "bg-rose-100 text-rose-600",
};

const AnalyticsContainer = ({ analyticsData }: AnalyticsContainerProps) => {
  const [isPremium, setIsPremium] = useState<boolean>(false);

  useEffect(() => {
    if (analyticsData.data.tryout_id) {
      setIsPremium(true);
    }
  }, [analyticsData]);

  return isPremium ? (
    <div className="flex w-full flex-col items-center">
      <div className="flex flex-col items-center justify-center gap-x-2 rounded-md border-[1px] border-gray-100 bg-gray-50 p-4 font-semibold lg:w-full lg:flex-row">
        <p className="m-0 hidden lg:block">
          Soal ini tergolong soal yang{" "}
          <span
            className={cn(
              "rounded-md p-2  lg:ml-1",
              difficultyLevelStyle[analyticsData.data.difficulty_level],
            )}
          >
            {analyticsData.data.difficulty_level}
          </span>
        </p>
        <p className="m-0 mb-4 block lg:mb-0 lg:hidden">
          Soal ini tergolong{" "}
          <span className="ml-1 rounded-md p-2 ">
            {analyticsData.data.difficulty_level}
          </span>
        </p>
        <div
          className={cn(
            "h-0.5 w-full rounded-full bg-gray-200 lg:mx-2 lg:h-8 lg:w-0.5",
            difficultyLevelStyle[analyticsData.data.difficulty_level],
          )}
        />
        <p className="m-0 mt-4 lg:mt-0">
          <span
            className={cn(
              "mr-1 rounded-md p-2 ",
              difficultyLevelStyle[analyticsData.data.difficulty_level],
            )}
          >
            {analyticsData.data.correct_answer_percentage}%
          </span>{" "}
          yang jawab benar
        </p>
      </div>
      <div className="mt-8 flex w-full justify-center rounded-md bg-gradient-to-b from-[#F3F4F664] to-[#F3F4F600] py-4">
        <p className="m-0 font-bold text-gray-700">
          Persebaran peserta menjawab soal ini (dalam persen)
        </p>
      </div>
      <div className="flex w-full flex-col gap-x-1 gap-y-2 md:flex-row md:gap-y-0">
        {analyticsData.data.answer_distribution.all.map(
          ({ key, users_percentage }, idx) => {
            const isCorrect = key === analyticsData.data.correct_key;
            return (
              Number(users_percentage) > 0 && (
                <>
                  <div
                    key={idx}
                    className="hidden flex-row items-center gap-x-1 gap-y-1 md:flex md:flex-col md:gap-x-0"
                    style={{
                      width: `${Number(users_percentage)}%`,
                    }}
                  >
                    <p className="m-0 w-4 font-bold text-gray-700 md:w-fit">
                      {key}
                    </p>
                    <div
                      className={cn(
                        "h-2 w-full rounded-full bg-red-400",
                        isCorrect && "bg-emerald-400",
                      )}
                    />
                    <p className="m-0 font-semibold text-gray-500">
                      {users_percentage}
                    </p>
                  </div>
                  <div
                    key={idx}
                    className="flex flex-row items-center gap-x-1 gap-y-1 md:hidden md:flex-col md:gap-x-0"
                  >
                    <p className="m-0 w-4 font-bold text-gray-700 md:w-fit">
                      {key}
                    </p>
                    <div
                      className={cn(
                        "h-2 w-full rounded-full bg-red-400",
                        isCorrect && "bg-emerald-400",
                      )}
                      style={{
                        width: `${Number(users_percentage)}%`,
                      }}
                    />
                    <p className="m-0 font-semibold text-gray-500">
                      {users_percentage}
                    </p>
                  </div>
                </>
              )
            );
          },
        )}
        <div className="flex w-full flex-row items-center gap-x-2 gap-y-1 md:hidden md:flex-col md:gap-x-0">
          <p className="m-0 font-bold text-gray-700">Kosong</p>
          <div
            style={{
              // todo: update this
              width: `${(100 - Number(analyticsData.data.total_user_answered)).toFixed(2)}%`,
            }}
            className="h-2 w-full rounded-full bg-gray-300"
          />
          <p className="m-0 font-semibold text-gray-500">
            {(100 - Number(analyticsData.data.total_user_answered)).toFixed(2)}
          </p>
        </div>
        <div
          className="hidden w-full flex-row items-center gap-x-2 gap-y-1 md:flex md:flex-col md:gap-x-0"
          style={{
            // todo: update this
            width: `${(100 - Number(analyticsData.data.total_user_answered)).toFixed(2)}%`,
          }}
        >
          <p className="m-0 font-bold text-gray-700">Kosong</p>
          <div className="h-2 w-full rounded-full bg-gray-300" />
          <p className="m-0 font-semibold text-gray-500">
            {(100 - Number(analyticsData.data.total_user_answered)).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="mt-8 flex w-full justify-center rounded-md bg-gradient-to-b from-[#F3F4F664] to-[#F3F4F600] py-4">
        <p className="m-0 font-bold text-gray-700">Tentang soal ini</p>
      </div>
    </div>
  ) : (
    <UpgradePremiumContainer />
  );
};

export default AnalyticsContainer;
