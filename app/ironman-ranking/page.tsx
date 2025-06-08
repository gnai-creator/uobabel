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

function formatSurvivalTime(ts: string) {
  if (!ts) return "-";
  const [days, rest] = ts.split(".");
  let d = 0,
    h = 0,
    m = 0,
    s = 0;
  if (rest) {
    d = parseInt(days, 10);
    const [hms] = rest.split(".");
    const [hh, mm, ss] = hms.split(":").map(Number);
    h = hh || 0;
    m = mm || 0;
    s = ss || 0;
  } else {
    const [hms] = ts.split(".");
    const [hh, mm, ss] = hms.split(":").map(Number);
    h = hh || 0;
    m = mm || 0;
    s = ss || 0;
  }
  let result = "";
  if (d > 0) result += `${d}d `;
  result += `${h.toString().padStart(2, "0")}:`;
  result += `${m.toString().padStart(2, "0")}:`;
  result += `${s.toString().padStart(2, "0")}`;
  return result.trim();
}

async function getBestRuns(): Promise<IronmanRankingEntry[]> {
  const snapshot = await db.collection("ironmanRanking").get();
  const allRuns = snapshot.docs.map(
    (doc: FirebaseFirestore.QueryDocumentSnapshot) =>
      doc.data() as IronmanRankingEntry
  );

  // Agrupa por player, pega a run de maior score
  const bestByPlayer = Object.values(
    allRuns.reduce(
      (acc: Record<string, IronmanRankingEntry>, run: IronmanRankingEntry) => {
        if (!acc[run.PlayerName] || run.Score > acc[run.PlayerName].Score) {
          acc[run.PlayerName] = run;
        }
        return acc;
      },
      {} as Record<string, IronmanRankingEntry>
    )
  ) as IronmanRankingEntry[];

  // Ordena pelo Score decrescente
  return bestByPlayer.sort((a, b) => b.Score - a.Score);
}

export default async function IronmanRankingPage() {
  const ranking = await getBestRuns();

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
                <td className="px-4 py-2">
                  {formatSurvivalTime(p.SurvivalTime)}
                </td>
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
