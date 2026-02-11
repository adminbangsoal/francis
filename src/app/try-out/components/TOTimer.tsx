"use client";
import { calculateTimeLeftV2 } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { useTryoutContextV2 } from "../context/TryoutContextV2";

interface TimerProps {
  endTime: Date;
  setId: string;
  onTimeUp?: () => void;
}

const defaultValue = {
  seconds: -1,
  minutes: -1,
  hours: -1,
  text: "",
};

export const TOTimer: React.FC<TimerProps> = ({ endTime, setId, onTimeUp }) => {
  const { tryoutState, isTryoutSubmitted } = useTryoutContextV2();

  const [timeLeft, setTimeLeft] = useState(defaultValue);
  const [submissionInitiated, setSubmissionInitiated] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const tick = () => {
      const result = calculateTimeLeftV2(endTime, "mins");

      if (result.timeIsUp) {
        onTimeUp && onTimeUp();
        clearInterval(intervalRef.current!);
      } else {
        setTimeLeft(result);
      }
    };

    tick(); // Initial tick
    intervalRef.current = setInterval(tick, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    endTime,
    setId,
    submissionInitiated,
    isTryoutSubmitted,
    tryoutState?.data?.next_set_id,
  ]);

  return timeLeft.seconds !== -1 && !isTryoutSubmitted ? (
    <div className="flex flex-row items-center gap-2">
      <div
        className={`w-24 rounded-full border-2 px-5 py-1 text-center shadow-inner-lg ${
          timeLeft.minutes === 0 && timeLeft.seconds < 60
            ? "border-red-500 bg-red-100 text-red-600"
            : "bg-gray-200 text-gray-500"
        }`}
      >
        <div className="z-0 flex items-center justify-center font-semibold">
          <i className="i-ph-timer-bold z-10 mr-1 size-4" /> {timeLeft.text}
        </div>
      </div>
      <div className="hidden h-0.5 w-full grow rounded-full bg-gray-200 lg:block" />
    </div>
  ) : (
    <div className="flex flex-row items-center gap-2">
      <div className="skeleton h-4 w-full shrink-0 rounded-full bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
      <div className="skeleton h-0.5 w-full shrink-0 rounded-full bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
      <div className="skeleton h-4 w-full shrink-0 rounded-full bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
    </div>
  );
};
