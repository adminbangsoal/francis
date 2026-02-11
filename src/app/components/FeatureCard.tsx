"use client";

// components
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// libs
import Image from "next/image";
import { useState } from "react";

// utils
import { cn, join } from "@/lib/utils";

export type Feature = {
  title: string;
  choices: string[];
  answer: string;
  illustration: string;
  description: string;
  theme: string;
};

export default function FeatureCard({
  title,
  choices,
  answer,
  illustration,
  description,
  theme,
}: Readonly<Feature>) {
  const [answered, setAnswered] = useState(false);
  const [value, setValue] = useState<string[]>([]);

  const colorMapping: { [key: string]: string } = {
    emerald:
      "border-emerald-200 bg-emerald-600 text-emerald-50 after:shadow-emerald-400/80 *:after:shadow-emerald-600",
    cyan: "border-cyan-200 bg-cyan-600 text-cyan-50 after:shadow-cyan-400/80 *:after:shadow-cyan-600",
    indigo:
      "border-indigo-600 bg-indigo-900 text-indigo-50 after:shadow-indigo-700/80 *:after:shadow-indigo-900",
    fuchsia:
      "border-fuchsia-300 bg-fuchsia-700 text-fuchsia-50 after:shadow-fuchsia-500/80 *:after:shadow-fuchsia-700",
    orange:
      "border-orange-200 bg-orange-500 text-orange-50 after:shadow-orange-300/80 *:after:shadow-orange-500",
    rose: "border-rose-300 bg-rose-500 text-rose-50 after:shadow-rose-300/80 *:after:shadow-rose-500",
  };

  function handleChange(value: string[]) {
    if (!answered) {
      setAnswered(true);
      !value.includes("answer") && value.push("answer");
      setValue(value);
    }
  }

  return (
    <div className="group flex flex-col-reverse gap-2 rounded-3xl border border-surface-300 bg-surface-100 p-3 shadow @container sm:flex-row">
      <div className="flex flex-col gap-5 px-4 py-2 sm:basis-1/2 sm:justify-evenly">
        <p className="text-lg font-700 text-content-200 @xl:text-3xl">
          {title}
        </p>
        <ToggleGroup
          type="multiple"
          value={value}
          onValueChange={(value) => {
            handleChange(value);
          }}
          disabled={answered}
          className="flex flex-col gap-0.5"
        >
          <div className=" flex items-center gap-1 self-start pb-2 text-surface-400 transition-colors group-hover:text-surface-600">
            <i className="i-ph-hand-tap-duotone size-4" />
            <p className="text-left text-sm font-500">
              Pilih jawaban yang tepat:
            </p>
          </div>
          {choices.map((choice) => (
            <ToggleGroupItem
              key={choice}
              value={choice === answer ? "answer" : choice}
              data-answer={choice === answer ? "true" : "false"}
              className="flex w-full justify-start gap-2 truncate rounded-md bg-surface-200/50 px-3 py-1 text-left font-600 text-content-200 data-[state=on]:data-[answer=false]:bg-rose-200 data-[state=on]:data-[answer=true]:bg-emerald-200 data-[state=on]:data-[answer=false]:text-rose-900 data-[state=on]:data-[answer=true]:text-emerald-900"
            >
              {choice}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div
        className={join(
          "relative flex aspect-square flex-col justify-end overflow-hidden rounded-xl border-4 after:absolute after:inset-0 after:shadow-[inset_0_40px_40px_0_rgba(0_0_0_/_0.05)] sm:basis-1/2",
          colorMapping[theme],
        )}
      >
        <div
          className={cn(
            "relative -mb-5 -mt-8 grow translate-y-8 transition-[transform,margin-top] duration-700 ease-out-expo after:absolute after:inset-0 after:shadow-[inset_0_-32px_40px_0_rgba(0_0_0_/_0.05)]",
            answered && "mt-0 translate-y-0",
          )}
        >
          <Image
            src={illustration}
            alt={title}
            fill
            className="pointer-events-none select-none object-cover"
          />
        </div>
        <p
          className={cn(
            "z-10 translate-y-full px-5 pb-5 text-center font-500 transition-transform duration-700 ease-out-expo",
            answered && "translate-y-0",
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
