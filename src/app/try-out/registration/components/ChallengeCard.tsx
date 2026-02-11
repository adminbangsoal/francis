import { Button } from "@/components/ui/button";
import { useRegisterTryoutMutation } from "@/redux/api/usersApi";
import Link from "next/link";
import React, { useState } from "react";
import UploadButton from "./UploadButton";

export type TaskSubmissionType = {
  first: { file: File | undefined; url: string | undefined };
  second: { file: File | undefined; url: string | undefined };
  third: { file: File | undefined; url: string | undefined };
};

const ChallengeCard = ({ tryoutId }: { tryoutId: string }) => {
  const [mutate, { isLoading }] = useRegisterTryoutMutation();

  const firstTaskRef = React.useRef(null);
  const secondTaskRef = React.useRef(null);
  const thirdTaskRef = React.useRef(null);

  const [taskSubmissions, setTaskSubmissions] = useState<TaskSubmissionType>({
    first: {
      file: undefined,
      url: undefined,
    },
    second: {
      file: undefined,
      url: undefined,
    },
    third: {
      file: undefined,
      url: undefined,
    },
  });

  const submitTask = () => {
    mutate({
      tryoutId: tryoutId,
      first_task_submission: taskSubmissions.first.url as string,
      second_task_submission: taskSubmissions.second.url as string,
      third_task_submission: taskSubmissions.third.url as string,
    });
  };

  return (
    <div className="lg:flex-grow">
      <div className="relative mt-1 flex w-full flex-col items-center rounded-2xl bg-[#064E3B33] bg-opacity-20 px-4 pb-5 pt-7 text-white">
        <div className="absolute -top-4 rounded-full bg-[#064E3B4D] bg-opacity-50 px-5 py-1 text-sm font-bold text-white">
          atau
        </div>

        <h2 className="pb-4 text-center font-bold">
          Selesaikan misi, TO gratis!
        </h2>
        <div className="flex flex-col gap-y-4">
          <UploadButton
            submission={taskSubmissions.first.file}
            taskNumber="first"
            setSubmissionsTask={setTaskSubmissions}
            ref={firstTaskRef}
            challenge={
              <p className="text-xs font-bold">
                Follow{" "}
                <Link
                  target="_blank"
                  href="https://www.instagram.com/bangsoal.co.id"
                  className="underline"
                >
                  Instagram
                </Link>{" "}
                BangSoal
              </p>
            }
          />
          <UploadButton
            submission={taskSubmissions.second.file}
            taskNumber="second"
            setSubmissionsTask={setTaskSubmissions}
            ref={secondTaskRef}
            challenge={
              <p className="text-xs font-bold">
                Share{" "}
                <Link
                  href="https://drive.google.com/file/d/1uWuq6DQtCv1rMfguTTqmdC_0WCweMSLZ/view?usp=drivesdk"
                  className="underline"
                >
                  poster ini
                </Link>{" "}
                di story Instagram dan tag @bangsoal.co.id
              </p>
            }
          />
          <UploadButton
            submission={taskSubmissions.third.file}
            taskNumber="third"
            setSubmissionsTask={setTaskSubmissions}
            ref={thirdTaskRef}
            challenge={
              <p className="text-xs font-bold">
                Komen dan tag 3 temanmu di{" "}
                <Link
                  target="_blank"
                  href="https://x.com/bangsoalcoid/status/1767552318189543715?s=20"
                  className="underline"
                >
                  Twitter
                </Link>{" "}
                dan{" "}
                <Link
                  target="_blank"
                  href="https://www.instagram.com/p/C4arMzsxCSU/?igsh=N3B2Z3JhdzR1eDVw"
                  className="underline"
                >
                  Instagram
                </Link>
              </p>
            }
          />

          <Button
            onClick={() => {
              submitTask();
            }}
            disabled={
              taskSubmissions.first.url === undefined ||
              taskSubmissions.second.url === undefined ||
              taskSubmissions.third.url === undefined ||
              isLoading
            }
            variant="ghost"
            className="rounded-full bg-white bg-opacity-50 text-sm font-bold text-emerald-700"
          >
            Daftar TO Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
