"use client";
import React, { useEffect, useState } from "react";

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

function formatSurvivalTime(ts: string | undefined | null): string {
  if (!ts || typeof ts !== "string" || !ts.trim()) return "00:00:00";
  ts = ts.trim();

  let days = 0,
    h = 0,
    m = 0,
    s = 0;
  // ex: "2.12:04:55.6543210" ou "05:17:44.1234567"
  if (ts.includes(".")) {
    const [first, rest] = ts.split(".");
    if (first.includes(":")) {
      // formato "hh:mm:ss.fff"
      [h, m, s] = first.split(":").map((x) => parseInt(x, 10) || 0);
    } else {
      // formato "d.hh:mm:ss.fff"
      days = parseInt(first, 10) || 0;
      [h, m, s] = rest.split(":").map((x) => parseInt(x, 10) || 0);
    }
  } else {
    [h, m, s] = ts.split(":").map((x) => parseInt(x, 10) || 0);
  }

  let res = "";
  if (days > 0) res += `${days}d `;
  res += `${h.toString().padStart(2, "0")}:`;
  res += `${m.toString().padStart(2, "0")}:`;
  res += `${s.toString().padStart(2, "0")}`;
  return res;
}

export default function IronmanRankingPage() {
  const [ranking, setRanking] = useState<IronmanRankingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ironman-ranking")
      .then((res) => res.json())
      .then((data) => setRanking(data))
      .finally(() => setLoading(false));
  }, []);

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
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-6">
                  Carregando ranking...
                </td>
              </tr>
            ) : ranking.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6">
                  Nenhum jogador no ranking ainda!
                </td>
              </tr>
            ) : (
              ranking.map((p, i) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
