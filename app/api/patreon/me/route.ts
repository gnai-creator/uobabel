import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/firestore";

export async function GET() {
  const patreonId = (await cookies()).get("patreon_id")?.value;

  if (!patreonId) {
    return NextResponse.json(
      { success: false, error: "Não autenticado" },
      { status: 401 }
    );
  }

  try {
    const snap = await db.collection("vinculos").doc(patreonId).get();

    if (!snap.exists) {
      return NextResponse.json(
        { success: false, error: "Usuário não encontrado no Firestore." },
        { status: 404 }
      );
    }

    const data = snap.data()!;

    return NextResponse.json({
      success: true,
      user: {
        patreonId,
        loginUO: data.loginUO ?? null,
        fullName: data.fullName ?? "Patrono",
        isSubscriber: !!data.isSubscriber,
        updatedAt: data.updatedAt ?? null,
      },
    });
  } catch (error: any) {
    console.error("Erro ao obter dados do Patreon:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno", details: error.message },
      { status: 500 }
    );
  }
}
