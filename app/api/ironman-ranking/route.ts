import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestore"; // ou "@/lib/firestoreAdmin"

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

export async function GET(req: NextRequest) {
  try {
    const snapshot = await db.collection("ironmanRanking").get();
    const allRuns = snapshot.docs.map(
      (doc) => doc.data() as IronmanRankingEntry
    );

    // Agrupa por player e pega a melhor run (maior Score)
    const bestByPlayer = Object.values(
      allRuns.reduce((acc, run) => {
        if (!acc[run.PlayerName] || run.Score > acc[run.PlayerName].Score) {
          acc[run.PlayerName] = run;
        }
        return acc;
      }, {} as Record<string, IronmanRankingEntry>)
    );

    // Ordena por Score decrescente e pega só os 10 primeiros
    const ranking = bestByPlayer.sort((a, b) => b.Score - a.Score).slice(0, 10);

    return NextResponse.json(ranking, { status: 200 });
  } catch (err) {
    console.error("[API IronmanRanking] Erro:", err);
    return NextResponse.json(
      { success: false, error: "Erro ao buscar ranking" },
      { status: 500 }
    );
  }
}
