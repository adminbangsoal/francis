import Iconify from "@/components/Iconify";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetRiwayatLatihanSoalListQuery } from "@/redux/api/latihanSoalApi";
import dayjs from "dayjs";
import "dayjs/locale/id";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MediaQuery from "react-responsive";

dayjs.locale("id");

const RiwayatSection: React.FC = () => {
  const { data, isLoading } = useGetRiwayatLatihanSoalListQuery();
  const router = useRouter();
  return (
    <div>
      <Button
        className="mt-5 flex items-center gap-x-2"
        onClick={() => {
          // Mixpanel.track("Clicked Kerjakan Soal Berwaktu Button");
          router.push("/latihan-soal-timed");
        }}
      >
        Kerjakan Soal Berwaktu!{" "}
        <div className="i-ph-arrow-right-bold h-[16px] w-[16px] text-white group-hover:text-white"></div>
      </Button>
      {isLoading && <div>Loading...</div>}
      {!!data && (
        <div className="my-5 flex flex-col gap-y-4">
          {data.data.map((riwayat) => {
            const renderDate =
              dayjs().get("date") == dayjs(riwayat.created_at).get("date")
                ? `Hari ini, ${dayjs(riwayat.created_at).format("HH:mm")}`
                : dayjs(riwayat.created_at).format("DD MMMM YYYY");

            return (
              <div
                key={riwayat.id}
                className="flex flex-col items-center justify-between rounded-lg border-[1px] border-gray-200 bg-gray-50 p-4 pr-10 lg:flex-row"
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="flex items-center lg:block">
                    <Image
                      src="/latsol-berwaktu.svg"
                      alt="latsol-berwaktu"
                      width={70}
                      height={70}
                    />
                    <MediaQuery maxWidth={1023}>
                      <h3 className="pl-2 text-lg font-700 text-gray-950 lg:ml-0">
                        {riwayat.label}
                      </h3>
                      {/* <h4 className="font-quicksand font-500 text-gray-500 ">
                        Latihan Soal Mode Berwaktu
                      </h4> */}
                    </MediaQuery>
                  </div>
                  <div className="ml-2 flex flex-col gap-y-0.5">
                    <MediaQuery minWidth={1024}>
                      <h5 className="text-sm text-gray-500">{renderDate}</h5>
                      <h3 className="text-lg font-700 text-gray-950">
                        {riwayat.label}
                      </h3>
                      <h4 className="font-quicksand font-500 text-gray-500 ">
                        Latihan Soal Mode Berwaktu
                      </h4>
                    </MediaQuery>
                    <div className="mt-3 flex flex-row flex-wrap items-center gap-y-2 font-500  text-gray-800 lg:mt-0">
                      <span className="flex items-center lg:w-40">
                        <Iconify
                          icon="ph:check-circle-duotone"
                          className="h-[20px] w-[20px] text-emerald-500"
                        />
                        <h5 className="pl-1">{riwayat.accuracy}% akurasi</h5>
                      </span>
                      <span className="flex items-center lg:w-44">
                        <Iconify
                          icon="ph:timer-duotone"
                          className="h-[20px] w-[20px] text-blue-500"
                        />
                        <h5 className="w-36 pl-1">
                          {riwayat.avg_time} detik/soal
                        </h5>
                      </span>
                      <span className="flex items-center ">
                        <Iconify
                          icon="ph:star-duotone"
                          className="h-[20px] w-[20px] text-yellow-400"
                        />
                        <h5 className="pl-1">{riwayat.point} points</h5>
                      </span>
                    </div>
                    <h5 className="pt-4 text-sm text-gray-500 lg:hidden">
                      {renderDate}
                    </h5>
                  </div>
                </div>
                <Link
                  // onClick={() => {
                  //   Mixpanel.track(
                  //     "Clicked Lihat Pembahasan Latihan Soal Berwaktu",
                  //     {
                  //       riwayat_id: riwayat.id,
                  //     },
                  //   );
                  // }}
                  href={`/latihan-soal-timed/riwayat/${riwayat.id}`}
                  className={cn(
                    buttonVariants({
                      variant: "bsPrimary",
                    }),
                    "mt-5 w-full lg:mt-0 lg:w-auto",
                  )}
                >
                  Lihat Pembahasan
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RiwayatSection;
