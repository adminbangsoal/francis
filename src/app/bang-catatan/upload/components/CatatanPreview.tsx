import { ThumbnailPreview } from "./ThumbnailPreview";
import { TipsCatatan } from "./TipsCatatan";

export const CatatanPreview = () => {
  return (
    <div className="flex flex-col justify-center gap-8 rounded-l-sm">
      <TipsCatatan />
      <ThumbnailPreview />
    </div>
  );
};
