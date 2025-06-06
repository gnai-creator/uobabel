// app/api/vincular-login/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/firestore";

export async function POST(req: Request) {
  const body = await req.json();
  const { loginUO } = body;

  if (!loginUO) {
    return NextResponse.json({ success: false, error: "Login ausente" }, { status: 400 });
  }

  const patreonId = req.headers.get("cookie")?.match(/patreon_id=([^;]+)/)?.[1];

  if (!patreonId) {
    return NextResponse.json({ success: false, error: "Usuário não autenticado" }, { status: 401 });
  }

  await db.collection("vinculos").doc(patreonId).set({ loginUO }, { merge: true });

  return NextResponse.json({ success: true });
}
