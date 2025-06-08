// app/ironman-ranking/page.tsx

import { db } from "@/lib/firestore";

type IronmanRankingEntry = {
  PlayerName: string;
  Score: number;
  SurvivalTime: string;
  KillPvPKillStreak: number;
  KillPvMKillStreak: number;
  Achievements: string[];
  CauseOfDeath: string;
  StartRegion: string;
  PvPKills: number;
  PvPDeaths: number;
  PvMKills: number;
  PvMDeaths: number;
  IsActive: boolean;
  Timestamp: string;
};

async function getRanking(): Promise<IronmanRankingEntry[]> {
  const snapshot = await db
    .collection("ironmanRanking")
    .orderBy("Score", "desc")
    .limit(100)
    .get();

  return snapshot.docs.map((doc) => doc.data() as IronmanRankingEntry);
}

export default async function IronmanRankingPage() {
  const ranking = await getRanking();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        🏆 Ironman Ranking
      </h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Jogador</th>
              <th className="px-4 py-2 border-b">Score</th>
              <th className="px-4 py-2 border-b">Sobrevivência</th>
              <th className="px-4 py-2 border-b">PvP Kills</th>
              <th className="px-4 py-2 border-b">PvM Kills</th>
              <th className="px-4 py-2 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((p, i) => (
              <tr key={i} className={i === 0 ? "bg-yellow-100 font-bold" : ""}>
                <td className="px-4 py-2 border-b text-center">{i + 1}</td>
                <td className="px-4 py-2 border-b">{p.PlayerName}</td>
                <td className="px-4 py-2 border-b">{p.Score}</td>
                <td className="px-4 py-2 border-b">
                  {p.SurvivalTime.split(".")[0]}
                </td>
                <td className="px-4 py-2 border-b">{p.PvPKills}</td>
                <td className="px-4 py-2 border-b">{p.PvMKills}</td>
                <td className="px-4 py-2 border-b">
                  {p.IsActive ? "🟢 Vivo" : "⚰️ Morto"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
