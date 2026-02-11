import { buttonVariants } from "@/components/ui/button";
import { useGetProfileDashboardQuery } from "@/redux/api/dashboardApi";
import dayjs from "dayjs";

import Link from "next/link";

const BerlanggananCard = () => {
  const { data } = useGetProfileDashboardQuery();
  const isAlreadySubscribed = dayjs().isBefore(
    dayjs(data?.data.validity.timestamp),
  );

  return (
    <div className="gradient-mask-0 flex w-full flex-col gap-5 rounded-2xl border-2 border-white border-opacity-30 bg-[url('/bg-mesh-horizontal.webp')] bg-cover bg-center px-3 py-5 sm:px-5">
      <h3 className="text-center font-700 text-white">Berlangganan</h3>
      <div className="flex shrink-0 flex-col gap-4">
        <ul className="flex flex-col gap-2 text-sm text-emerald-200 sm:text-base">
          <li className="flex items-center gap-2 text-white">
            <i className="i-ph-seal-check-duotone size-5" />
            <p>Try out UTBK berwaktu dengan penilaian</p>
          </li>
          <li className="flex items-center gap-2">
            <i className="i-ph-minus-circle-duotone size-5" />
            <p>Leaderboard Peringkat Siswa</p>
          </li>
          <li className="flex items-center gap-2 ">
            <i className="i-ph-minus-circle-duotone size-5" />
            <p>Ribuan soal asli UTBK dan ujian mandiri</p>
          </li>
          <li className="flex items-center gap-2">
            <i className="i-ph-minus-circle-duotone size-5" />
            <p>Penjelasan soal yang lengkap dan mudah dipahami</p>
          </li>

          <li className="flex items-center gap-2">
            <i className="i-ph-minus-circle-duotone size-5" />
            <p>Try out UTBK berwaktu dengan penilaian</p>
          </li>
        </ul>
      </div>
      {!isAlreadySubscribed ? (
        <Link
          href="/langganan"
          className={buttonVariants({
            variant: "ghost",
            className:
              "!rounded-full bg-white bg-opacity-50 text-sm !font-bold text-emerald-700",
          })}
        >
          Berlangganan
        </Link>
      ) : (
        <h2 className="text-center text-white">Anda sudah berlangganan</h2>
      )}
    </div>
  );
};

export default BerlanggananCard;
