import { capitalizeFirstLetter, cn } from "@/lib/utils";
import {
  BangCatatanTheme,
  BangCatatanVariant,
  UploadCatatanRequest,
} from "@/types/catatan";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { BangCatatanThemeStyle } from "../style";
export const ColorPalette = () => {
  const { control, setValue } = useFormContext<UploadCatatanRequest>();
  const themeKeys = useMemo(() => Object.keys(BangCatatanTheme), []);
  const colorPallete = useWatch({
    control,
    name: "color_pallete",
  }) as BangCatatanTheme;
  const handleChangeTheme = (themeVariant: BangCatatanVariant) => {
    setValue("color_pallete", BangCatatanTheme[themeVariant]);
  };

  return (
    <div className="flex flex-col gap-2">
      <p>Tema</p>
      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
        {themeKeys.map((themeKey) => {
          const isSelected = colorPallete == themeKey;
          const themeVariant = themeKey as BangCatatanVariant;
          return (
            <button
              key={themeKey}
              className={cn(
                "flex flex-col items-center justify-center gap-3 rounded-xl px-4 py-3",
                isSelected &&
                  BangCatatanThemeStyle({
                    active: themeVariant,
                    variant: themeVariant,
                  }),
              )}
              onClick={(e) => {
                e.preventDefault();
                handleChangeTheme(BangCatatanTheme[themeVariant]);
              }}
            >
              <div
                className={cn(
                  "size-8 rounded-full",
                  BangCatatanThemeStyle({
                    palette: themeVariant,
                  }),
                )}
              />
              <p>{capitalizeFirstLetter(themeKey)}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
