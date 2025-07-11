import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestore";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";

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

    const doc = await db.collection("users").doc(Email).get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    const userData = doc.data();

    const valid = await bcrypt.compare(Password, userData?.Password as string);

    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    const { Password: _password, ...publicData } = userData as any;

    // Gerar token JWT
    try {
      const token = generateToken({
        userId: doc.id,
        email: userData?.Email,
      });

      return NextResponse.json({
        success: true,
        user: {
          id: userData?.Email,
          Email: userData?.Email,
          Usernames: userData?.Usernames,
        },
        token: token,
      });
    } catch (tokenError: any) {
      console.error("❌ Erro ao gerar token:", tokenError);
      return NextResponse.json(
        { success: false, error: "Erro ao gerar token de autenticação" },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error("Erro ao fazer login:", err);
    return NextResponse.json(
      { success: false, error: "Erro interno", details: err.message },
      { status: 500 }
    );
  }
}
