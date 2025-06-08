import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestore";

const SECRET_KEY = process.env.IRONMAN_SECRET_KEY;

export async function POST(req: NextRequest) {
  // 1. Checa o header customizado
  const serverKey = req.headers.get("X-Server-Key");
  if (!serverKey || serverKey !== SECRET_KEY) {
    return NextResponse.json(
      { success: false, error: "Acesso negado." },
      { status: 401 }
    );
  }

  // ... resto do seu código ...
  const data = await req.json();

  if (!data?.PlayerName || !data?.Score) {
    return NextResponse.json(
      { success: false, error: "Dados incompletos." },
      { status: 400 }
    );
  }

  // Salva no Firestore como antes
  const docId = `${data.PlayerName}_${data.Timestamp || Date.now()}`;
  await db.collection("ironmanRanking").doc(docId).set(data);

  return NextResponse.json({ success: true });
}
