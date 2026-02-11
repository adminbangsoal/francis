import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FieldError, UseFormSetValue, UseFormTrigger } from "react-hook-form";

import { ChevronDown } from "lucide-react";
import React from "react";
import { Input, InputProps } from "./input";

interface SearchableDropdownI {
  options: string[];
  setValue?: UseFormSetValue<any>;
  name?: string;
  value?: string;
  defaultValue?: string;
  setStringValue?: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  error?: FieldError;
  triggerValidation?: UseFormTrigger<any>;
  onValueChange?: () => void;
}

const SearchableDropdown = React.forwardRef<
  HTMLInputElement,
  InputProps & SearchableDropdownI
>(
  (
    {
      options,
      setValue,
      name,
      value,
      className,
      placeholder,
      triggerValidation,
      defaultValue,
      onValueChange,
    },

    ref,
  ) => {
    const [searchTerm, setSearchTerm] = useState(defaultValue ?? "");
    const [showOptions, setShowOptions] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);

    useEffect(() => {
      const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredOptions(filteredOptions);
    }, [searchTerm, options]);

    useEffect(() => {
      if (
        value === "" &&
        (filteredOptions.length == 0 || filteredOptions.includes(searchTerm))
      ) {
        setSearchTerm("");
      }
    }, [searchTerm, value, filteredOptions]);

    const setFieldValue = (searchValue: string) => {
      if (
        searchValue == "" ||
        (filteredOptions.length > 0 && !filteredOptions.includes(searchValue))
      ) {
        if (!!setValue && !!name) {
          setValue(name, "");
        }
      }
    };

    return (
      <div className="relative">
        <div className={cn("relative")}>
          <Input
            placeholder={placeholder}
            ref={ref}
            className={className}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setFieldValue(e.target.value);
            }}
            onClick={() => {
              setShowOptions(true);
            }}
            onBlur={() => {
              setTimeout(() => setShowOptions(false), 300);
            }}
            value={searchTerm}
          />
          <ChevronDown
            className={cn(
              "absolute right-2 top-2 w-4 transition-transform",
              showOptions && "rotate-180",
            )}
          />
        </div>

        {showOptions && filteredOptions.length > 0 && (
          <div className="absolute left-0 top-[100%] z-20 w-full">
            <div className="mt-2 max-h-40 divide-y overflow-y-scroll border bg-white">
              {filteredOptions.map((option, index) => (
                <button
                  type="button"
                  key={`${option}-${index}`}
                  style={{ pointerEvents: "auto" }}
                  className={cn(
                    "z-20 flex w-full cursor-pointer items-center text-wrap px-4 py-2 text-sm leading-snug md:text-base",
                  )}
                  onClick={() => {
                    if (!!setValue && !!name && option != value) {
                      setValue(name, option);
                      if (!!onValueChange) {
                        onValueChange();
                      }
                    }
                    if (!!triggerValidation) {
                      triggerValidation(name);
                    }
                    setSearchTerm(option);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);

SearchableDropdown.displayName = "SearchableDropdown";

export default SearchableDropdown;
