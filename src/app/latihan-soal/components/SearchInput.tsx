import Iconify from "@/components/Iconify";
import { cn } from "@/lib/utils";

interface SearchInputI {
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  style?: string;
}
const SearchInput = ({ value, setValue, placeholder, style }: SearchInputI) => {
  return (
    <div className={cn("relative w-full", style)}>
      <Iconify
        icon="ph:magnifying-glass-bold"
        className="absolute left-5 top-1/2 -translate-y-1/2"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder={placeholder}
        className="flex h-10 w-full items-center rounded-full border border-surface-300 bg-surface-100 pl-11 font-500"
      />
    </div>
  );
};

export default SearchInput;
