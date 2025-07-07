import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestore";
import bcrypt from "bcryptjs";

interface RegisterRequest {
  Email: string;
  Username: string;
  Password: string;
}

export async function POST(req: NextRequest) {
  try {
    const { Email, Username, Password } = (await req.json()) as Partial<RegisterRequest>;

    if (!Email || !Username || !Password) {
      return NextResponse.json(
        { success: false, error: "Dados incompletos." },
        { status: 400 }
      );
    }

    const existing = await db
      .collection("users")
      .where("Email", "==", Email)
      .get();

    if (!existing.empty) {
      return NextResponse.json(
        { success: false, error: "Email já registrado." },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(Password, 10);

    await db.collection("users").add({
      Email,
      Username,
      Password: hashed,
      createdAt: Date.now(),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Erro ao registrar usuário:", err);
    return NextResponse.json(
      { success: false, error: "Erro interno", details: err.message },
      { status: 500 }
    );
  }
}
