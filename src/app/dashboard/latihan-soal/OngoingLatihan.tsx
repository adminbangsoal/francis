import { ProgressBar } from "@/components/ui/progress-bar";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useGetLatihanSoalTimedQuery } from "@/redux/api/latihanSoalApi";
import Link from "next/link";
import { useEffect } from "react";

export const OngoingLatihan = () => {
  const { data, refetch } = useGetLatihanSoalTimedQuery();

  const timedSlug =
    data?.data &&
    (data?.data?.slug
      ? `/latihan-soal-timed/${data.data.mode}/${data.data.id}/${data.data.slug}`
      : `/latihan-soal-timed/${data.data.mode}/${data.data.id}`);

  useEffect(() => {
    refetch();
  }, []);

  return (
    !!data?.data && (
      <div className="flex flex-col gap-4 rounded-xl bg-emerald-teal p-4 font-bold">
        <p className="text-xl">Selesaikan Latihanmu</p>
        <Link href={timedSlug as string}>
          <div className="rounded-xl bg-white p-4 text-black">
            <div className="flex flex-row items-start justify-between pb-2">
              <div className="flex flex-col">
                <p className="text-xl">
                  Latihan {capitalizeFirstLetter(data.data.mode)}
                </p>
                <p className="text-sm font-normal text-gray-400">
                  Latihan soal mode berwaktu
                </p>
              </div>
              <button className="font-bold text-emerald-500">Lanjutkan</button>
            </div>

            <ProgressBar
              progress={
                (data.data.current_number / data.data.max_number) * 100 || 0
              }
            />

            <div className="flex flex-row justify-end font-normal">
              Kamu baru menyelesaikan{" "}
              <span className="px-1 font-bold">
                {data.data.finished_question}
              </span>
              dari{" "}
              <span className="px-1 font-bold">{data.data.max_number}</span>{" "}
              soal
            </div>
          </div>
        </Link>
      </div>
    )
  );
};
