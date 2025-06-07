// app/api/vincular-login/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/firestore";

export async function POST(req: Request) {
  const { loginUO } = await req.json();

  if (!loginUO) {
    return NextResponse.json({ success: false, error: "Login ausente" }, { status: 400 });
  }

  const patreonId = cookies().get("patreon_id")?.value;

  if (!patreonId) {
    return NextResponse.json({ success: false, error: "Usuário não autenticado" }, { status: 401 });
  }

  await db.collection("vinculos").doc(patreonId).set({ loginUO }, { merge: true });

  return NextResponse.json({ success: true });
}
