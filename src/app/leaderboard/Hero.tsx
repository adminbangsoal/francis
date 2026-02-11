import heroBgMesh from "@public/hero-bg-mesh.webp";
import Image from "next/image";
import { MyRankCard } from "./MyRankCard";
import { PointsInfo } from "./PointsInfo";
import { LeaderboardComponentsI } from "./constants";

export const LeaderboardHero = ({ myRank }: LeaderboardComponentsI) => {
  return (
    <div className=" overflow-y-hidden pt-20 lg:pt-32">
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <Image src={heroBgMesh} alt={""} className="h-full w-full" />
      </div>

      <div className="mx-auto grid w-full grid-cols-1 gap-8 px-5 py-10 text-center text-white md:px-10 lg:w-2/3">
        <p className="text-4xl font-bold">Leaderboard</p>
        <p>
          Berdiri di puncak leaderboard dengan mengumpulkan poin melalui
          pengerjaan soal latihan, penyelesaian Try Out, berbagi catatan di
          BangSoal, dan lainnya. Rasakan perbandingan prestasimu dengan siswa
          SMA se-Indonesia, dan tentukan posisimu di peringkat PTN yang dituju.
          Ayo, raih prestasi terbaikmu bersama BangSoal!
        </p>
      </div>

      <div className="relative z-10 mx-5 flex flex-col items-center justify-center gap-5 md:mx-10 lg:mx-20 lg:flex-row">
        <div className="w-full lg:w-2/3">
          <MyRankCard myRank={myRank} />
        </div>
        <div className="w-full lg:w-1/3">
          <PointsInfo />
        </div>
      </div>
    </div>
  );
};
