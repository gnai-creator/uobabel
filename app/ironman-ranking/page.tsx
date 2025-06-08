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
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        🏆 Ironman Ranking
      </h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full border border-gray-700 bg-zinc-900 text-zinc-100">
          <thead>
            <tr className="bg-zinc-800 border-b border-gray-700">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Jogador</th>
              <th className="px-4 py-2">Score</th>
              <th className="px-4 py-2">Sobrevivência</th>
              <th className="px-4 py-2">PvP Kills</th>
              <th className="px-4 py-2">PvM Kills</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((p, i) => (
              <tr
                key={i}
                className={
                  i === 0
                    ? "bg-yellow-900/80 text-yellow-200 font-bold"
                    : i % 2 === 0
                    ? "bg-zinc-800"
                    : "bg-zinc-900"
                }
              >
                <td className="px-4 py-2 text-center">{i + 1}</td>
                <td className="px-4 py-2">{p.PlayerName}</td>
                <td className="px-4 py-2">{p.Score}</td>
                <td className="px-4 py-2">{p.SurvivalTime.split(".")[0]}</td>
                <td className="px-4 py-2">{p.PvPKills}</td>
                <td className="px-4 py-2">{p.PvMKills}</td>
                <td className="px-4 py-2">
                  {p.IsActive ? (
                    <span className="text-green-400">🟢 Vivo</span>
                  ) : (
                    <span className="text-gray-400">⚰️ Morto</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
