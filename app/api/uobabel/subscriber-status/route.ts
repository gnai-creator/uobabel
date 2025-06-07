import { db } from "@/lib/firestore";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const loginUO = searchParams.get("loginUO");

  if (!loginUO) {
    return NextResponse.json({ error: "loginUO requerido" }, { status: 400 });
  }

  try {
    const snapshot = await db.collection("vinculos").where("loginUO", "==", loginUO).get();

    if (snapshot.empty) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    const userData = snapshot.docs[0].data();

    return NextResponse.json({
      loginUO: userData.loginUO,
      tier: userData.tier
    });
  } catch (err) {
    console.error("Erro ao buscar no Firestore:", err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
