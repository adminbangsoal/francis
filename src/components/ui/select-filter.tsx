"use client";
import * as Select from "@radix-ui/react-select";
import { SelectOption } from "./select-input";
interface SelectFilterI {
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  value?: string;
}
export const SelectFilter = ({
  options,
  onChange,
  placeholder,
  value,
}: SelectFilterI) => {
  return (
    <Select.Root
      value={value}
      onValueChange={(value) => {
        onChange(value);
      }}
    >
      <Select.Trigger
        id={"filter-subject"}
        className="flex h-full w-full items-center justify-between gap-1 rounded-lg px-3 text-left capitalize text-content-200 outline-none hover:bg-surface-200 lg:w-auto"
        aria-label={placeholder}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <i className="i-ph-caret-down-bold" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="z-10 rounded-lg border border-surface-400/40 bg-surface-100/20 p-2 text-content-100 shadow-lg backdrop-blur-2xl">
          <Select.ScrollUpButton className="flex h-6 cursor-default items-center justify-center text-content-100">
            <i className="i-ph-caret-up-bold animate-bounce" />
          </Select.ScrollUpButton>
          <Select.Viewport>
            {options.map(({ name, value }) => (
              <Select.Item
                key={value}
                value={value}
                className="relative cursor-pointer select-none rounded-md px-5 py-1 pl-9 text-sm text-content-100 outline-none data-[state=checked]:bg-content-200 data-[state=unchecked]:data-[highlighted]:bg-surface-700/10 data-[state=checked]:text-white"
              >
                <Select.ItemText>{name}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-2 top-1/2 inline-flex w-6 -translate-y-1/2 items-center justify-center">
                  <i className="i-ph-check-bold" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-6 cursor-default items-center justify-center text-content-100">
            <i className="i-ph-caret-down-bold animate-bounce" />
          </Select.ScrollDownButton>
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
