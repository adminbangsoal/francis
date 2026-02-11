import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SetStateAction } from "react";

interface ToggleTOTypeProps {
  setSelectedMode:
    | React.Dispatch<SetStateAction<"kilat" | "pro">>
    | ((type: string) => void);
  selectedMode: "kilat" | "pro";
}

const ToggleTOType = ({
  setSelectedMode,
  selectedMode,
}: ToggleTOTypeProps): JSX.Element => {
  return (
    <ToggleGroup
      // onValueChange={(value) => {
      //   setSelectedMode(value as "kilat" | "pro");
      // }}
      value={"pro"}
      type="single"
      className="w-full rounded-full bg-gray-200 p-1 text-gray-500 shadow-inner"
    >
      {/* <ToggleGroupItem
        value="kilat"
        className="w-full rounded-full data-[state=on]:border data-[state=on]:border-emerald-500 data-[state=on]:bg-emerald-400 data-[state=on]:text-white"
      >
        <i className="i-ph-lightning-fill mr-1 size-5" />
        <p className="font-700">Kilat</p>
      </ToggleGroupItem> */}
      <ToggleGroupItem
        value="pro"
        className="w-full rounded-full data-[state=on]:border data-[state=on]:border-emerald-500 data-[state=on]:bg-emerald-400 data-[state=on]:text-white"
      >
        <i className="i-ph-graduation-cap-fill mr-1 size-5" />
        <p className="m-0 font-700">Pro</p>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ToggleTOType;
