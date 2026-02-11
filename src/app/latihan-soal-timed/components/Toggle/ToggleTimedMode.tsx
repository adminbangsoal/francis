import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SetStateAction } from "react";

interface ToggleTimedModeProps {
  setSelectedMode: React.Dispatch<SetStateAction<"classic" | "sequential">>;
  selectedMode: "classic" | "sequential";
}

const ToggleTimedMode = ({
  setSelectedMode,
  selectedMode,
}: ToggleTimedModeProps): JSX.Element => {
  return (
    <ToggleGroup
      onValueChange={(value) => {
        setSelectedMode(value as "classic" | "sequential");
      }}
      value={selectedMode}
      type="single"
      className="w-full rounded-full bg-gray-200 p-1 text-gray-500 shadow-inner"
    >
      <ToggleGroupItem
        value="classic"
        className="w-full rounded-full data-[state=on]:border data-[state=on]:border-emerald-500 data-[state=on]:bg-emerald-400 data-[state=on]:text-white"
      >
        <i className="i-ph-rows-fill mr-1 size-5" />
        <p className="font-700">Klasik</p>
      </ToggleGroupItem>
      <ToggleGroupItem
        value="sequential"
        className="w-full rounded-full data-[state=on]:border data-[state=on]:border-emerald-500 data-[state=on]:bg-emerald-400 data-[state=on]:text-white"
      >
        <i className="i-ph-timer-bold mr-1 size-5" />
        <p className="font-700">Sekuensial</p>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ToggleTimedMode;
