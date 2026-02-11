import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import { useGetTOHistoryDetailQuery } from "@/redux/api/tryoutHistoryApi";
import { TryoutDetailResponse } from "@/types/tryout";
import { PieChart } from "@mui/x-charts/PieChart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { scoreStyle } from "./RiwayatAside";

interface HasilTryoutModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  tryoutDetailData: TryoutDetailResponse;
  selectedTO: string;
}

const HasilTryoutModal = ({
  open,
  setOpen,
  tryoutDetailData,
  selectedTO,
}: HasilTryoutModalProps) => {
  const router = useRouter();
  const { data } = useGetTOHistoryDetailQuery({
    tryout_id: tryoutDetailData.data.id,
  });
  const [pieData, setPieData] = useState<any>([]);

  useEffect(() => {
    const pieData = [];
    if (data) {
      data.data.total_correct_answers &&
        pieData.push({
          value: data.data.total_correct_answers,
          color: "#4CAF50",
        });
      data.data.total_wrong_answers &&
        pieData.push({
          value: data.data.total_wrong_answers,
          color: "#F44336",
        });
      data.data.total_unanswered_questions &&
        pieData.push({
          value: data.data.total_unanswered_questions,
          color: "#9E9E9E",
        });
      setPieData(pieData);
    }
  }, [data]);

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex max-h-[32rem] flex-col items-center gap-y-3 overflow-y-scroll">
        <div className="text-center">
          <h1 className="pb-3 text-xl font-semibold text-gray-950">
            Hasil Tryout
          </h1>
          <h2 className="text-lg font-bold text-gray-500">
            {tryoutDetailData.data.name}
          </h2>
        </div>
        {data && (
          <div
            className={cn(
              scoreStyle(data?.data.score),
              "rounded-lg border px-4 py-2 text-2xl font-bold text-white",
            )}
          >
            {data?.data.score.toFixed(0)}
          </div>
        )}
        <p className="font-bold text-slate-700">Rangkuman Hasil</p>
        <div className="flex items-center gap-x-3">
          {data && (
            <PieChart
              width={180}
              height={180}
              series={[
                {
                  data: pieData,
                  innerRadius: 35,
                  outerRadius: 70,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -180,
                  endAngle: 180,
                  cx: 90,
                  cy: 85,
                },
              ]}
            />
          )}
          <div className="flex flex-col gap-y-2 text-sm">
            <div className="flex items-center justify-center gap-x-1 rounded-2xl border border-emerald-400 bg-emerald-200 px-2 py-1 font-semibold text-emerald-600">
              <span className="flex w-8 items-center">
                <i className="i-ph-check-circle-duotone size-5"></i>
              </span>
              {data?.data.total_correct_answers} Benar
            </div>
            <div className="flex items-center justify-center gap-x-1 rounded-2xl border border-rose-400 bg-rose-100 px-2 py-1 font-semibold text-rose-600">
              <span className="flex w-8 items-center">
                <i className="i-ph-x-circle-duotone size-5"></i>
              </span>
              {data?.data.total_wrong_answers} Salah
            </div>
            <div className="flex items-center justify-center gap-x-1 rounded-2xl border border-slate-400 bg-slate-200 px-2 py-1 font-semibold text-slate-600">
              <span className="flex w-8 items-center">
                <i className="i-ph-minus-circle-duotone size-5"></i>
              </span>
              {data?.data.total_unanswered_questions} Kosong
            </div>
          </div>
        </div>
        {data && (
          <div>
            {data.data.set_results.map((set, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-x-3 px-4 py-2"
                >
                  <span className="w-3/4 font-semibold text-gray-500">
                    {set.subject_name}
                  </span>
                  <span
                    className={cn(
                      scoreStyle(set.score),
                      "w-14 rounded-lg border py-1 text-center font-bold text-white",
                    )}
                  >
                    {set.score.toFixed(0)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
        <Button
          onClick={() => router.push(`/try-out/riwayat/${selectedTO}`)}
          variant="bsPrimary"
          className="w-full"
        >
          Lihat Pembahasan <i className="i-ph-arrow-right-light ml-2 size-5" />
        </Button>
      </div>
    </Modal>
  );
};

export default HasilTryoutModal;
