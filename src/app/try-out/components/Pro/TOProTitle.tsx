import { Skeleton } from "@/components/ui/skeleton";
import { formatDateToIndonesian } from "@/lib/utils";
import { TryoutDetailResponse } from "@/types/tryout";

interface TOProTitleProps {
  data: TryoutDetailResponse | undefined;
}

const TOProTitle = ({ data }: TOProTitleProps) => {
  return data ? (
    <div className="flex grow flex-col gap-2">
      <p className="text-2xl font-bold text-white lg:text-3xl lg:text-gray-950">
        {data.data.name}
      </p>
      <div className="flex flex-row items-center gap-3">
        <p className="w-fit rounded-full bg-[#FFFFFF1E] px-2 py-1 text-sm font-semibold text-white lg:px-0 lg:text-base lg:text-gray-400">
          Batas Pengerjaan: {formatDateToIndonesian(data.data.expiry_date)}
        </p>
        <div className="hidden h-0.5 grow bg-gray-100 lg:block" />
      </div>
      <p className="text-sm text-emerald-100 lg:text-base lg:text-gray-950">
        {data.data.description}
      </p>
      <div className="mt-10 flex items-center justify-center">
        <p className="hidden items-center gap-x-2 font-bold lg:flex lg:text-gray-700">
          Struktur Try Out <i className="i-ph-info-bold size-5" />
        </p>
      </div>
    </div>
  ) : (
    <div className="flex grow flex-col gap-3">
      <Skeleton className="h-10 w-44 rounded-lg bg-gray-200" />
      <div className="flex flex-row items-center gap-3">
        <Skeleton className="h-7 w-20 rounded-lg bg-gray-200" />
        <div className="hidden h-0.5 grow bg-gray-100 lg:block" />
      </div>
    </div>
  );
};

export default TOProTitle;
