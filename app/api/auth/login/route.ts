import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestore";

interface LoginRequest {
  Email: string;
  Password: string;
}

export async function POST(req: NextRequest) {
  try {
    const { Email, Password } = (await req.json()) as Partial<LoginRequest>;

    if (!Email || !Password) {
      return NextResponse.json(
        { success: false, error: "Dados incompletos." },
        { status: 400 }
      );
    }

    const snapshot = await db
      .collection("users")
      .where("Email", "==", Email)
      .where("Password", "==", Password)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { success: false, error: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    const doc = snapshot.docs[0];
    const userData = doc.data();

    return NextResponse.json({ success: true, user: { id: doc.id, ...userData } });
  } catch (err: any) {
    console.error("Erro ao fazer login:", err);
    return NextResponse.json(
      { success: false, error: "Erro interno", details: err.message },
      { status: 500 }
    );
  }
}
