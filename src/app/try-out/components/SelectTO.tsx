"use client";
import Iconify from "@/components/Iconify";
import { formatDateToIndonesian } from "@/lib/utils";
import { TryoutBase } from "@/types/tryout";
import { TOHistory } from "@/types/tryout-history";
import * as Select from "@radix-ui/react-select";

interface SelectTOProps {
  currentTopic: string;
  setCurrentTopic: React.Dispatch<React.SetStateAction<string>>;
  listData: TryoutBase[] | TOHistory[];
  isHistory?: boolean;
}
export const SelectTO = ({
  currentTopic,
  setCurrentTopic,
  listData,
  isHistory = false,
}: SelectTOProps) => {
  return (
    <div className="flex w-full">
      <Select.Root
        value={currentTopic}
        onValueChange={(value) => {
          setCurrentTopic(value);
        }}
      >
        <Select.Trigger
          id="topik"
          className="flex grow items-center justify-between rounded bg-gray-100 px-2 py-1 text-left text-gray-500 shadow-inner-lg outline-none"
          aria-label="Topik"
        >
          <Select.Value />
          <Select.Icon>
            <Iconify icon="ph:caret-down-bold" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="z-20 ml-6 mr-4 rounded-lg border border-surface-400/40 bg-surface-100/20 p-2 text-content-100 shadow-lg backdrop-blur-2xl">
            <Select.ScrollUpButton className="flex h-6 cursor-default items-center justify-center text-content-100">
              <Iconify icon="ph:caret-up-bold" className="animate-bounce" />
            </Select.ScrollUpButton>
            <Select.Viewport>
              {listData.map((item) => {
                const { id, name } = item; // Assuming 'id' and 'name' are common properties
                let endDate;

                if ("end_date" in item) {
                  endDate = item.end_date;
                } else if ("submitted_at" in item) {
                  endDate = item.submitted_at;
                }

                return (
                  <Select.Item
                    key={id}
                    value={id}
                    className="relative cursor-pointer select-none rounded-md px-5 py-1 pl-9 text-sm text-content-100 outline-none data-[state=checked]:bg-content-200 data-[state=unchecked]:data-[highlighted]:bg-surface-700/10 data-[state=checked]:text-white"
                  >
                    <Select.ItemText asChild>
                      <div className="flex w-[75vw] grow flex-row items-center justify-between font-semibold md:w-[85vw]">
                        <span className="grow">{name}</span>
                        {endDate && (
                          <span>
                            {!isHistory && "s.d "}
                            {formatDateToIndonesian(endDate)}
                          </span>
                        )}
                      </div>
                    </Select.ItemText>
                    <Select.ItemIndicator className="absolute left-2 top-1/2 inline-flex w-6 -translate-y-1/2 items-center justify-center">
                      <Iconify icon="ph:check-bold" />
                    </Select.ItemIndicator>
                  </Select.Item>
                );
              })}
            </Select.Viewport>
            <Select.ScrollDownButton className="flex h-6 cursor-default items-center justify-center text-content-100">
              <Iconify icon="ph:caret-down-bold" className="animate-bounce" />
            </Select.ScrollDownButton>
            <Select.Arrow />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};
