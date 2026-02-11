// components
import Iconify from "@/components/Iconify";

// data

// libs
import { useGetTopicsBySubjectQuery } from "@/redux/api/latihanSoalApi";
import * as Label from "@radix-ui/react-label";
import * as Select from "@radix-ui/react-select";
import { useLatihanSoalContext } from "../context";
import { YearRangeSlider } from "./YearRangeSlider";
import { FiltersI } from "./interface";

export default function Filters({
  subject_id,
  subjectSlug,
  currentTopic,
  setCurrentTopic,
  yearRange,
  setYearRange,
}: FiltersI) {
  const {
    selectedSubject,
    setSelectedTopicId,
    setDefaultValueTabIndex,
    setSoalData,
    defaultValueTabIndex,
    soalData,
  } = useLatihanSoalContext();

  const { data: topicData } = useGetTopicsBySubjectQuery(
    { subject_id },
    {
      skip: subjectSlug !== selectedSubject?.slug,
    },
  );

  return (
    <div className="flex flex-col rounded-lg bg-emerald-900/25 px-3 py-2">
      <div className="flex flex-col gap-1 text-sm">
        <div className="flex items-center gap-2">
          <Label.Root
            className="w-12 shrink-0 text-surface-100"
            htmlFor="topik"
          >
            Topik:
          </Label.Root>
          <Select.Root
            value={currentTopic[subjectSlug]}
            onValueChange={(value) => {
              setCurrentTopic({
                ...currentTopic,
                [subjectSlug]: value,
              });
              setSelectedTopicId(value);
              setDefaultValueTabIndex(0);
              setSoalData([]);
            }}
          >
            <Select.Trigger
              id="topik"
              className="flex grow items-center justify-between rounded py-1 text-left text-emerald-200 outline-none hover:text-white"
              aria-label="Topik"
            >
              <Select.Value />
              <Select.Icon>
                <Iconify icon="ph:caret-down-bold" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="z-20 rounded-lg border border-surface-400/40 bg-surface-100/20 p-2 text-content-100 shadow-lg backdrop-blur-2xl">
                <Select.ScrollUpButton className="flex h-6 cursor-default items-center justify-center text-content-100">
                  <Iconify icon="ph:caret-up-bold" className="animate-bounce" />
                </Select.ScrollUpButton>
                <Select.Viewport>
                  <Select.Item
                    key="default"
                    value="ALL"
                    className="relative cursor-pointer select-none rounded-md px-5 py-1 pl-9 text-sm text-content-100 outline-none data-[state=checked]:bg-content-200 data-[state=unchecked]:data-[highlighted]:bg-surface-700/10 data-[state=checked]:text-white"
                  >
                    <Select.ItemText>Semua</Select.ItemText>
                    <Select.ItemIndicator className="absolute left-2 top-1/2 inline-flex w-6 -translate-y-1/2 items-center justify-center">
                      <Iconify icon="ph:check-bold" />
                    </Select.ItemIndicator>
                  </Select.Item>
                  {topicData?.data.map(({ id, name }) => (
                    <Select.Item
                      key={id}
                      value={id}
                      className="relative cursor-pointer select-none rounded-md px-5 py-1 pl-9 text-sm text-content-100 outline-none data-[state=checked]:bg-content-200 data-[state=unchecked]:data-[highlighted]:bg-surface-700/10 data-[state=checked]:text-white"
                    >
                      <Select.ItemText>{name}</Select.ItemText>
                      <Select.ItemIndicator className="absolute left-2 top-1/2 inline-flex w-6 -translate-y-1/2 items-center justify-center">
                        <Iconify icon="ph:check-bold" />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Viewport>
                <Select.ScrollDownButton className="flex h-6 cursor-default items-center justify-center text-content-100">
                  <Iconify
                    icon="ph:caret-down-bold"
                    className="animate-bounce"
                  />
                </Select.ScrollDownButton>
                <Select.Arrow />
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
        <div>
          {yearRange[subjectSlug] && (
            <YearRangeSlider
              yearRange={yearRange[subjectSlug]}
              setYearRange={(value) => {
                setYearRange({
                  ...yearRange,
                  [subjectSlug]: value,
                });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
