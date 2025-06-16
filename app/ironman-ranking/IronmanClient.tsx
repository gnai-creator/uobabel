"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

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
    const [dayPart, timePart] = ts.split(".");
    days = parseInt(dayPart, 10);
    [h, m, s] = timePart.split(":").map((n) => parseInt(n, 10));
  } else {
    [h, m, s] = ts.split(":").map((n) => parseInt(n, 10));
  }

  h += days * 24;

  const pad = (num: number) => String(num).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function IronmanClient() {
  const [ranking, setRanking] = useState<IronmanRankingEntry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/ironman-ranking")
      .then((res) => res.json())
      .then((data) => {
        setRanking(data.ranking);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Carregando...</p>;
  }

  if (error || !ranking) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-600">Erro ao carregar ranking.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className="text-2xl font-bold mb-4">Ironman Ranking</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2">Jogador</th>
                <th className="px-4 py-2">Pontuação</th>
                <th className="px-4 py-2">Tempo</th>
                <th className="px-4 py-2">PvP Kills</th>
                <th className="px-4 py-2">PvM Kills</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((p) => (
                <tr key={p.PlayerName} className="border-t border-gray-300">
                  <td className="px-4 py-2">{p.PlayerName}</td>
                  <td className="px-4 py-2 text-center">{p.Score}</td>
                  <td className="px-4 py-2 text-center">
                    {formatSurvivalTime(p.SurvivalTime)}
                  </td>
                  <td className="px-4 py-2 text-center">{p.PvPKills}</td>
                  <td className="px-4 py-2 text-center">{p.PvMKills}</td>
                  <td className="px-4 py-2 text-center">
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
    </div>
  );
}
