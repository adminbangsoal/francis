import { cn } from "@/lib/utils";
import React, { ChangeEvent, useEffect, useState } from "react";

interface CheckboxGroupProps {
  options: { label: string; value: string }[];
  onChange: (selectedValues: string[]) => void;
  className?: string;
  toggleSelectAll?: boolean;
  selectedValues?: string[];
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  onChange,
  className,
  toggleSelectAll = false,
  selectedValues = [],
}) => {
  const [selectedVal, setSelectedVal] = useState<string[]>(selectedValues);

  const handleCheckboxChange = (value: string) => {
    // Mixpanel.track("Checkbox Group Change", { value });
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedVal(updatedValues);
    onChange(updatedValues);
  };

  const handleSelectAll = () => {
    if (selectedValues.length === options.length) {
      setSelectedVal([]);
      onChange([]);
    } else {
      const updatedValues = options.map((option) => option.value);
      setSelectedVal(updatedValues);
      onChange(updatedValues);
    }
  };

  useEffect(() => {
    setSelectedVal(selectedValues);
  }, [selectedValues]);

  return (
    <>
      {toggleSelectAll && (
        <div className="mb-4 rounded-lg bg-emerald-900/20 p-2 lg:bg-transparent">
          <label className="group flex items-start space-x-2">
            <div className="relative">
              <input
                type="checkbox"
                checked={selectedVal.length === options.length}
                onChange={() => {
                  handleSelectAll();
                }}
                className={cn(
                  "peer h-5 w-5 shrink-0 appearance-none rounded bg-emerald-900/20 text-white checked:bg-emerald-300 focus:outline-none focus:ring-0",
                )}
              />
              <i className="i-ph-check-bold absolute inset-0 hidden size-5 fill-white text-white peer-checked:block" />
            </div>
            <span>Pilih Semua Topik</span>
          </label>
        </div>
      )}
      <div className={cn(className)}>
        {options.map((option) => (
          <label
            key={option.value}
            className="group flex items-start space-x-2"
          >
            <div className="relative">
              <input
                type="checkbox"
                value={option.value}
                checked={selectedVal.includes(option.value)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleCheckboxChange(e.target.value)
                }
                className={cn(
                  "peer h-5 w-5 shrink-0 appearance-none rounded bg-emerald-900/20 text-white checked:bg-emerald-300 focus:outline-none focus:ring-0",
                )}
              />
              <i className="i-ph-check-bold absolute inset-0 hidden size-5 fill-white text-white peer-checked:block" />
            </div>
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </>
  );
};

export default CheckboxGroup;
