// components
import Iconify from "@/components/Iconify";

// data

// libs
import { useGetTopicsBySubjectQuery } from "@/redux/api/latihanSoalApi";
import * as Label from "@radix-ui/react-label";
import * as Select from "@radix-ui/react-select";
import { IFilters } from "./types";

export default function Filters({
  currentTopic,
  setCurrentTopic,
  subject_id,
  selectedSubject,
}: IFilters) {
  const { data: topicData, isLoading } = useGetTopicsBySubjectQuery(
    { subject_id },
    // {
    //   skip: SELECTED_SUBJECT_MAPPING[category] !== selectedSubject,
    // },
  );

  return (
    <div className="flex flex-col rounded-lg bg-gray-400 px-3 py-2">
      <div className="flex flex-col gap-1 text-sm">
        <div className="flex items-center gap-2">
          <Label.Root
            className="w-12 shrink-0 text-surface-100"
            htmlFor="topik"
          >
            Topik:
          </Label.Root>
          {isLoading ? (
            <div className="skeleton relative h-6 flex-1 rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
          ) : selectedSubject ? (
            <Select.Root
              value={currentTopic[selectedSubject.slug]}
              onValueChange={(value) => {
                setCurrentTopic({
                  ...currentTopic,
                  [selectedSubject.slug]: value,
                });
              }}
            >
              <Select.Trigger
                id="topik"
                className="flex grow items-center justify-between rounded py-1 text-left text-gray-200 outline-none hover:text-white"
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
                    <Iconify
                      icon="ph:caret-up-bold"
                      className="animate-bounce"
                    />
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
          ) : null}
        </div>
      </div>
    </div>
  );
}
