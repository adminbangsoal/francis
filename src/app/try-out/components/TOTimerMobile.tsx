"use client";
import { calculateTimeLeft, cn } from "@/lib/utils";
import { useSubmitTryoutSetMutation } from "@/redux/api/tryoutApi";
import React, { useEffect, useState } from "react";

interface TimerProps {
  endTime: Date;
  setId: string;
}

export const TOTimerMobile: React.FC<TimerProps> = ({ endTime, setId }) => {
  const [timeLeft, setTimeLeft] = useState({
    seconds: -1,
    minutes: -1,
    hours: -1,
    text: "",
  });

  const [submitTO] = useSubmitTryoutSetMutation();

  const handleSubmitTO = async () => {
    submitTO({ set_id: setId });
  };

  useEffect(() => {
    calculateTimeLeft(endTime, handleSubmitTO, setTimeLeft, "mins");

    const intervalId = setInterval(
      () => calculateTimeLeft(endTime, handleSubmitTO, setTimeLeft, "mins"),
      1000,
    );

    return () => clearInterval(intervalId);
  }, [endTime, handleSubmitTO]);

  return timeLeft.seconds !== -1 ? (
    <div
      className={cn(
        "flex items-center gap-x-1 rounded-full px-2 py-1 font-semibold",
        timeLeft.minutes === 0 && timeLeft.seconds < 60
          ? "border-red-500 bg-red-100 text-red-600"
          : "border-[1px] border-[#ffffff14] bg-gradient-to-b from-[#ffffff32] to-[#ffffff14]",
      )}
    >
      <i className="i-ph-timer-bold z-10 m-0 mr-1 size-4 p-0" />
      <p className="m-0">{timeLeft.text}</p>
    </div>
  ) : (
    <div className="flex flex-row items-center gap-2">
      <div className="skeleton h-4 w-full shrink-0 rounded-full bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
      <div className="skeleton h-0.5 w-full shrink-0 rounded-full bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
      <div className="skeleton h-4 w-full shrink-0 rounded-full bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
    </div>
  );
};
