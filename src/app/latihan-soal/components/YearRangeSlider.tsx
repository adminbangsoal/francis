import * as Label from "@radix-ui/react-label";
import * as Slider from "@radix-ui/react-slider";

interface YearRangeSliderProps {
  minYear?: number;
  maxYear?: number;
  yearRange: [number, number];
  setYearRange: (value: [number, number]) => void;
}

export const YearRangeSlider = ({
  yearRange,
  setYearRange,
  minYear = 2009,
  maxYear = 2024,
}: YearRangeSliderProps) => {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <div className="flex items-center gap-2">
        <Label.Root
          className="w-12 shrink-0 text-surface-100"
          htmlFor="yearRange"
        >
          Tahun:
        </Label.Root>
        <div className="flex grow items-center gap-1">
          <div className="text-surface-100">{yearRange[0]}</div>
          <Slider.Root
            id="yearRange"
            className="relative flex grow items-center rounded px-2 py-1 text-emerald-200"
            min={minYear}
            max={maxYear}
            value={yearRange}
            step={1}
            onValueChange={setYearRange}
            aria-label="Year range"
          >
            <Slider.Track className="relative h-2 flex-grow rounded-full bg-surface-400">
              <Slider.Range className="absolute h-full rounded-full bg-gradient-to-r from-emerald-200 to-emerald-400" />
            </Slider.Track>
            <Slider.Thumb className="block h-4 w-4 rounded-full bg-emerald-200" />
            <Slider.Thumb className="block h-4 w-4 rounded-full bg-emerald-200" />
          </Slider.Root>

          <div className="text-surface-100">{yearRange[1]}</div>
        </div>
      </div>
    </div>
  );
};
