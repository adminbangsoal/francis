import Iconify from "@/components/Iconify";
import { Button } from "@/components/ui/button";
import { useGetTimedLatihanSoalSummaryQuery } from "@/redux/api/latihanSoalApi";
import { useRouter } from "next/navigation";

interface HasilLatianCardI {
  timedQuestionId: string;
}
export const HasilLatianCard = ({ timedQuestionId }: HasilLatianCardI) => {
  const { data } = useGetTimedLatihanSoalSummaryQuery(
    {
      timed_question_id: timedQuestionId,
    },
    {
      skip: !timedQuestionId,
    },
  );

  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
      <p className="text-lg font-bold">Hasil Latian</p>
      <p>Latihan Soal Set 1</p>
      <div className="flex h-12 flex-row gap-1">
        <Iconify
          icon={"ph:star-duotone"}
          className="size-10 text-yellow-300 odd:self-end even:self-start"
        />

        <Iconify
          icon={"ph:star-duotone"}
          className="size-10 text-yellow-300 odd:self-end even:self-start"
        />

        <Iconify
          icon={"ph:star-half"}
          className="size-10 text-yellow-300 odd:self-end even:self-start"
        />
      </div>
      <p className="text-lg font-bold">{data?.data.point} points</p>
      <div className="flex w-full flex-col items-stretch gap-5 lg:flex-row">
        <div className="group relative w-full overflow-hidden rounded-md border border-emerald-500 bg-emerald-100 px-4 py-3">
          <div className="relative z-20 flex flex-col gap-2">
            <p>Tingkat akurasi</p>
            <p className="text-2xl font-bold">
              {Number(data?.data.accuracy ?? 0)}%
            </p>
            <p className="font-thin text-slate-500">
              {data?.data.correct_answer_count}/{data?.data.total_question} soal
              benar
            </p>
          </div>
          <Iconify
            icon={"bi:star-fill"}
            className="absolute right-32 top-0 size-12 text-emerald-200"
          />
          <Iconify
            icon={"bi:triangle-fill"}
            className="absolute bottom-4 right-20 size-16 text-emerald-200"
          />
          <Iconify
            icon={"ph:circle-fill"}
            className="absolute -right-10 -top-4 size-20 text-emerald-200"
          />
          <Iconify
            icon={"ph:circle-fill"}
            className="absolute bottom-8 right-1/3 size-10 text-emerald-200"
          />
          <Iconify
            icon={"ph:check-circle-duotone"}
            className="absolute -bottom-5 -right-10 size-28 text-emerald-500"
          />
        </div>
        <div className="group relative w-full overflow-hidden rounded-md border border-blue-500 bg-blue-100 px-4 py-3">
          <div className="relative z-20 flex flex-col gap-2">
            <p>Rata-rata waktu</p>
            <p className="text-2xl font-bold">
              {data?.data.avg_time} detik{" "}
              <span className="text-lg font-normal">/soal</span>
            </p>
          </div>
          <Iconify
            icon={"bi:star-fill"}
            className="absolute right-32 top-0 size-12 text-blue-200"
          />
          <Iconify
            icon={"bi:triangle-fill"}
            className="absolute bottom-4 right-20 size-16 text-blue-200"
          />
          <Iconify
            icon={"ph:circle-fill"}
            className="absolute -right-10 -top-4 size-20 text-blue-200"
          />
          <Iconify
            icon={"ph:circle-fill"}
            className="absolute bottom-8 right-1/3 size-10 text-blue-200"
          />
          <Iconify
            icon={"ph:timer"}
            className="absolute -bottom-5 -right-10 size-28 text-blue-500"
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-x-2 gap-y-2 lg:flex-row">
        <Button
          className="w-full lg:w-auto lg:flex-grow"
          onClick={() => {
            router.push("/dashboard");
          }}
          variant={"bsSecondary"}
        >
          Kembali ke dashboard
        </Button>
        <Button
          onClick={() => {
            router.replace(`/latihan-soal-timed/riwayat/${timedQuestionId}`);
          }}
          className="w-full lg:w-auto lg:flex-grow"
          variant={"bsPrimary"}
        >
          Lihat pembahasan
        </Button>
      </div>
    </div>
  );
};
