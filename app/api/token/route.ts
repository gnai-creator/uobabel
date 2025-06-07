import { NextResponse } from "next/server";
import { serialize } from "cookie";
import admin from "firebase-admin";

if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!privateKey) {
    console.error("❌ FIREBASE_PRIVATE_KEY ausente");
    throw new Error("FIREBASE_PRIVATE_KEY ausente ou inválido");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });
}

const db = admin.firestore();

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      console.error("❌ Código de autorização ausente");
      return NextResponse.json(
        { success: false, error: "Código ausente" },
        { status: 400 }
      );
    }

    console.log("✅ Código recebido:", code);
    console.log("🔍 Verificando variáveis de ambiente:");
    console.log("PATREON_CLIENT_ID =", !!process.env.PATREON_CLIENT_ID);
    console.log("PATREON_CLIENT_SECRET =", !!process.env.PATREON_CLIENT_SECRET);

    const tokenParams = new URLSearchParams({
      code,
      grant_type: "authorization_code",
      client_id: process.env.PATREON_CLIENT_ID!,
      client_secret: process.env.PATREON_CLIENT_SECRET!,
      redirect_uri: "https://www.uobabel.com/patreon/callback",
    });

    const tokenRes = await fetch("https://www.patreon.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "uobabel.com - Painel OAuth",
      },
      body: tokenParams.toString(),
    });

    const raw = await tokenRes.text();
    console.log("🎯 Resposta Patreon status:", tokenRes.status);
    console.log("📦 Corpo:", raw);

    if (!tokenRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Erro ao obter token do Patreon",
          details: raw,
        },
        { status: tokenRes.status }
      );
    }

    const tokenData = JSON.parse(raw);

    if (!tokenData.access_token) {
      return NextResponse.json(
        { success: false, error: "Token inválido ou expirado" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, token: tokenData.access_token });
  } catch (err: any) {
    console.error("🔥 Erro inesperado:", err);
    return NextResponse.json(
      { success: false, error: "Erro interno", details: err.message },
      { status: 500 }
    );
  }
}
