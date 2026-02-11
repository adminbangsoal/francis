import Iconify from "@/components/Iconify";
import { cn } from "@/lib/utils";

interface InfoBoxI {
  message: string;
}
export const InfoBox = ({ message }: InfoBoxI) => {
  return (
    <div
      id="info-box"
      className={cn(
        "flex animate-slide-down-and-fade flex-row items-center gap-3 rounded-lg bg-gray-800 px-4 py-3 text-white transition-transform duration-300 ease-in-out",
      )}
    >
      <Iconify icon="ph:info" />
      <p className="grow">{message}</p>
    </div>
  );
};
