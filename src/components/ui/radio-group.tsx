import { cn } from "@/lib/utils";
import { useState } from "react";

interface RadioGroupProps {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  onChange,
  className,
  defaultValue,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(
    defaultValue || null,
  );

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className={cn("flex items-center", className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className="flex cursor-pointer items-center space-x-2"
        >
          <input
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleRadioChange(option.value)}
            className="hidden"
          />
          <div
            className={cn(
              "h-6 w-6 shrink-0 rounded-full border hover:border-[5px] hover:border-emerald-100 hover:bg-emerald-300",
              selectedValue === option.value
                ? "border-[5px] border-emerald-100 bg-emerald-300"
                : "border-gray-400 bg-white",
            )}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
