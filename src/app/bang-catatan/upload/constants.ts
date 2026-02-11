import { SelectOption } from "@/components/ui/select-input";
import { capitalizeFirstLetter } from "@/lib/utils";
import { CatatanParamsI, NoteType, NoteTypeVariant } from "@/types/catatan";

export const IMAGE_FILETYPE = {
  "image/jpeg": [".jpeg"],
  "image/png": [".png"],
  "image/jpg": [".jpg"],
};
export const CATATAN_FILETYPE = {
  ...IMAGE_FILETYPE,
  "application/pdf": [".pdf"],
};

export const NOTE_TYPE_OPTIONS: SelectOption[] = Object.keys(NoteType).map(
  (type) => {
    return {
      name: capitalizeFirstLetter(type),
      value: NoteType[type as NoteTypeVariant],
    };
  },
);
export const FILTERS_TO_CHECK: Array<keyof CatatanParamsI> = [
  "subject_id",
  "topic_id",
  "note_type",
  "query",
];
