import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FieldError, UseFormSetValue, UseFormTrigger } from "react-hook-form";

import { ChevronDown } from "lucide-react";
import React from "react";
import { AutoSizer, List } from "react-virtualized";
import { Input, InputProps } from "./input";

export interface SelectOption {
  name: string;
  value: string;
}

interface SelectInputI {
  options: SelectOption[];
  setValue?: UseFormSetValue<any>;
  name?: string;
  setStringValue?: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  error?: FieldError;
  triggerValidation?: UseFormTrigger<any>;
}

const SelectInput = React.forwardRef<
  HTMLInputElement,
  InputProps & SelectInputI
>(
  (
    {
      options,
      setValue,
      name,
      className,
      placeholder,
      triggerValidation,
      value,
    },
    ref,
  ) => {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SelectOption | null>(null);

    useEffect(() => {
      setSelectedItem(options.find((option) => option.value === value) || null);
    }, [value, options]);

    const sortedOptions = options
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));

    const rowRenderer = ({ key, index, style }: any) => {
      const item = sortedOptions[index];
      let borderStyle = "border";

      if (index === 0) {
        borderStyle = "border-b";
      } else if (index === options.length - 1) {
        borderStyle = "border-t";
      }

      return (
        <div
          key={key}
          style={{ ...style, pointerEvents: "auto" }}
          className={cn(
            "relative flex cursor-pointer items-center text-wrap px-4 py-2 text-sm leading-snug md:text-base",
            borderStyle,
            selectedItem?.value === item.value
              ? "flex-row justify-between bg-emerald-300"
              : "hover:bg-emerald-100/60",
          )}
          onClick={() => {
            if (!!setValue && !!name) {
              setValue(name, item.value);
            }
            if (!!triggerValidation) {
              triggerValidation(name);
            }
            setSelectedItem(item);
          }}
        >
          <p>{item.name}</p>
          {selectedItem?.value === item.value && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (!!setValue && !!name) {
                  setValue(name, "");
                }
                setSelectedItem(null);
              }}
              className="z-10 flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-neutral-50 text-xs text-red-600"
            >
              <i className="i-ph-x-bold w-3" />
            </div>
          )}
        </div>
      );
    };

    const dropdownHeight = Math.min(160, sortedOptions.length * 40);

    return (
      <div className="relative">
        <div className={cn("relative")}>
          <Input
            placeholder={placeholder}
            ref={ref}
            className={className}
            readOnly
            onClick={() => {
              setShowOptions(true);
            }}
            onBlur={() => {
              setTimeout(() => setShowOptions(false), 100);
            }}
            value={selectedItem ? selectedItem.name : ""}
          />

          <ChevronDown
            className={cn(
              "absolute right-2 top-2 w-4 transition-transform",
              showOptions && "rotate-180",
            )}
          />
        </div>

        {showOptions && sortedOptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-[100%] z-10 w-full"
          >
            <div className="mt-2">
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    className="items-center rounded-lg border-2 border-gray-900 bg-white py-1"
                    height={dropdownHeight}
                    overscanRowCount={5}
                    rowCount={sortedOptions.length}
                    rowHeight={({ index }) =>
                      40 +
                      Math.floor(
                        (sortedOptions[index].name.length * 10) / width,
                      ) *
                        25
                    }
                    rowRenderer={rowRenderer}
                    width={width}
                  />
                )}
              </AutoSizer>
            </div>
          </motion.div>
        )}
      </div>
    );
  },
);

SelectInput.displayName = "SelectInput";

export default SelectInput;
