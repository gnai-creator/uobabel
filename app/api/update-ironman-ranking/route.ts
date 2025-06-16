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

  if (!data?.PlayerName || data?.Score === undefined || data?.Score === null) {
    return NextResponse.json(
      { success: false, error: "Dados incompletos." },
      { status: 400 }
    );
  }

  // Salva a nova entrada
  const timestamp = data.Timestamp || Date.now();
  const docId = `${data.PlayerName}_${timestamp}`;
  await db.collection("ironmanRanking").doc(docId).set({ ...data, Timestamp: timestamp });

  try {
    const snapshot = await db
      .collection("ironmanRanking")
      .where("PlayerName", "==", data.PlayerName)
      .get();

    const sortedDocs = snapshot.docs.sort((a, b) => {
      const scoreDiff = (b.data().Score ?? 0) - (a.data().Score ?? 0);
      if (scoreDiff !== 0) return scoreDiff;
      return (b.data().Timestamp ?? 0) - (a.data().Timestamp ?? 0);
    });

    const docsToDelete = sortedDocs.slice(5);
    await Promise.all(docsToDelete.map((d) => d.ref.delete()));
  } catch (cleanupErr) {
    console.error("Erro ao limpar runs antigas:", cleanupErr);
  }

  return NextResponse.json({ success: true });
}
