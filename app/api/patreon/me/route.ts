import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/firestore";

export async function GET() {
  const cookieStore = await cookies();
  const patreonId = cookieStore.get("patreon_id")?.value;

  if (!patreonId) {
    return NextResponse.json(
      { success: false, error: "Não autenticado" },
      { status: 401 }
    );
  }

  try {
    const userDoc = await db.collection("vinculos").doc(patreonId).get();
    const data = userDoc.exists ? userDoc.data() : null;

    if (!data) {
      return NextResponse.json(
        { success: false, error: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        patreonId,
        loginUO: data?.loginUO || null,
        fullName: data?.fullName || "Patrono",
        isSubscriber: Boolean(data?.isSubscriber),
      },
    });
  } catch (error) {
    console.error("Erro ao buscar dados do Patreon:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno" },
      { status: 500 }
    );
  }
}
