// libs
import { Metadata } from "next";
import { LeaderboardModule } from "./LeaderboardModule";

export const metadata: Metadata = {
  title: "Leaderboard | BangSoal",
  description: "Ranking Terbaik",
};

export default function LeaderboardPage() {
  return (
    <main>
      <LeaderboardModule />
    </main>
  );
}
