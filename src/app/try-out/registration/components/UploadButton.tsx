import Iconify from "@/components/Iconify";
import { Button } from "@/components/ui/button";
import { useTryoutRegistrationSubmissionMutation } from "@/redux/api/usersApi";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import toast from "react-hot-toast";
import { TaskSubmissionType } from "./ChallengeCard";

interface UploadButtonProps extends React.HTMLAttributes<HTMLInputElement> {
  challenge: React.ReactNode;
  setSubmissionsTask: Dispatch<SetStateAction<TaskSubmissionType>>;
  taskNumber: "first" | "second" | "third";
  submission?: File;
}

const UploadButton = React.forwardRef<HTMLInputElement, UploadButtonProps>(
  (props: UploadButtonProps, ref) => {
    const [uploadFile, { isSuccess, isError }] =
      useTryoutRegistrationSubmissionMutation();

    useEffect(() => {
      if (props.submission) {
        uploadFile({
          file: props.submission as File,
        }).then((d) => {
          if ("data" in d) {
            const { url } = d.data.data;
            props.setSubmissionsTask((prev) => {
              return {
                ...prev,
                [props.taskNumber]: {
                  file: props.submission,
                  url,
                },
              };
            });
          }
        });
      }
    }, [props.submission]);

    useEffect(() => {
      if (isError) {
        props.setSubmissionsTask((prev) => {
          return {
            ...prev,
            [props.taskNumber]: {
              file: undefined,
              url: undefined,
            },
          };
        });
      }

      if (isSuccess) {
        toast.success("Bukti tangkapan layar berhasil diunggah!");
      }
    }, [isError, isSuccess]);

    return (
      <div className="w-full">
        <div className="flex items-center gap-x-2">
          <i className="i-ph-flag size-4" />
          {props.challenge}
        </div>
        <input
          ref={ref}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            if (file) {
              props.setSubmissionsTask((prev) => ({
                ...prev,
                [props.taskNumber]: { file },
              }));
            }
          }}
        />
        {props.submission ? (
          <span className="flex items-center  justify-center">
            <p className="py-2 text-center text-xs">{props.submission.name}</p>
            <Button
              onClick={() => {
                if (ref && "current" in ref) ref?.current?.click();
              }}
              variant="link"
              size={"sm"}
              className="text-white underline"
            >
              Ganti
            </Button>
          </span>
        ) : (
          <Button
            onClick={() => {
              if (ref && "current" in ref) ref?.current?.click();
            }}
            variant="secondary"
            className="mt-2 flex w-full items-center gap-x-1 bg-opacity-20 text-xs text-white"
          >
            <Iconify
              icon="material-symbols:upload"
              className="h-5 w-5 text-white"
            />{" "}
            Upload bukti tangkapan layar misimu
          </Button>
        )}
      </div>
    );
  },
);

UploadButton.displayName = "UploadButton";

export default UploadButton;
