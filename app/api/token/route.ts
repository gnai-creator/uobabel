import { NextResponse } from "next/server";
import { serialize } from "cookie";
import admin from "firebase-admin";

// 🔐 Inicialização segura do Firebase
if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!privateKey) throw new Error("FIREBASE_PRIVATE_KEY ausente ou inválido");

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
    const body = await req.json();
    const code = body.code;

    if (!code) {
      return NextResponse.json(
        { success: false, error: "Código de autorização ausente." },
        { status: 400 }
      );
    }

    console.log("🔁 Trocando código por token...");

    const tokenParams = new URLSearchParams({
      code,
      grant_type: "authorization_code",
      client_id: process.env.PATREON_CLIENT_ID!,
      client_secret: process.env.PATREON_CLIENT_SECRET!,
      redirect_uri: "https://www.uobabel.com/patreon/callback",
    });

    const tokenRes = await fetch("https://www.patreon.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenParams.toString(),
    });

    const tokenData = await tokenRes.json();
    console.log("🎫 Token recebido:", tokenData);

    if (!tokenData.access_token) {
      return NextResponse.json(
        { success: false, error: "Token inválido ou expirado." },
        { status: 401 }
      );
    }

    console.log("👤 Buscando dados do usuário...");

    const userRes = await fetch(
      "https://www.patreon.com/api/oauth2/v2/identity?include=memberships.currently_entitled_tiers&fields[member]=patron_status&fields[user]=full_name",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );

    const userData = await userRes.json();
    console.log("🧾 Dados do Patreon:", JSON.stringify(userData, null, 2));

    const patreonId = userData.data?.id;
    const fullName = userData.data?.attributes?.full_name || "Patrono";
    const membership = userData.included?.find((m: any) => m.type === "member");

    const patronStatus = membership?.attributes?.patron_status;
    const isSubscriber =
      patronStatus === "active_patron" &&
      (membership?.relationships?.currently_entitled_tiers?.data?.length ?? 0) >
        0;

    if (!patreonId) {
      return NextResponse.json(
        { success: false, error: "ID do usuário não encontrado no Patreon." },
        { status: 400 }
      );
    }

    // 💾 Armazena vínculo no Firestore
    await db
      .collection("vinculos")
      .doc(patreonId)
      .set(
        {
          fullName,
          isSubscriber,
          loginUO: null,
          patronStatus,
          tier:
            membership?.relationships?.currently_entitled_tiers?.data?.[0]
              ?.id ?? null,
        },
        { merge: true }
      );

    // 🚫 Se não for assinante
    if (!isSubscriber) {
      return NextResponse.json(
        {
          success: false,
          requiresSubscription: true,
          error: "Usuário não é um assinante ativo do Patreon.",
        },
        { status: 403 }
      );
    }

    // ✅ Se for assinante ativo
    const response = NextResponse.json({
      success: true,
      isSubscriber: true,
      patreonId,
      name: fullName,
    });

    response.headers.set(
      "Set-Cookie",
      serialize("patreon_id", patreonId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: false,
        sameSite: "lax",
      })
    );

    return response;
  } catch (err: any) {
    console.error("❌ Erro no endpoint /api/token:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno ao processar autenticação.",
        details: err.message ?? "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
