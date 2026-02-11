import { calculateTimeLeftV2 } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { useLatihanContext } from "../../context/LatihanContext";

interface TimerProps {
  endTime: Date;
}

const Timer: React.FC<TimerProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    seconds: -1,
    minutes: -1,
    hours: -1,
    text: "",
  });

  const [submissionInitiated, setSubmissionInitiated] = useState(false);

  const { handleSubmitLatihan } = useLatihanContext();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const tick = () => {
      const result = calculateTimeLeftV2(endTime, "hours");

      if (result.timeIsUp) {
        if (!submissionInitiated) {
          setSubmissionInitiated(true); // Prevent further submissions
          handleSubmitLatihan();
        }
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
  }, [endTime, handleSubmitLatihan]);

  return timeLeft.seconds !== -1 ? (
    <div
      className={`rounded-full border-2 px-3 py-2 text-center ${
        timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds < 60
          ? "border-red-500 bg-red-100 text-red-600"
          : "border-emerald-300 bg-emerald-100 text-emerald-800"
      }`}
    >
      <div className="z-0 flex items-center justify-center font-semibold lg:text-4xl">
        {" "}
        <i className="i-ph-timer-bold z-10 mr-1 size-5 lg:hidden lg:size-10" />{" "}
        {timeLeft.text}
      </div>
    </div>
  ) : (
    <div className="skeleton h-[3.5rem] w-full shrink-0 rounded-full bg-surface-300 from-surface-300 via-surface-100 to-surface-300" />
  );
};

export default Timer;
