import { NextResponse } from "next/server";
import { serialize } from "cookie";
import admin from "firebase-admin";

// 🔐 Inicialização do Firebase Admin
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

    if (!tokenRes.ok) {
      const errorText = await tokenRes.text();
      console.error(
        "❌ Falha ao obter token Patreon:",
        tokenRes.status,
        errorText
      );
      return NextResponse.json(
        {
          success: false,
          error: "Erro ao obter token do Patreon",
          details: errorText,
        },
        { status: tokenRes.status }
      );
    }

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.json(
        { success: false, error: "Token inválido ou expirado." },
        { status: 401 }
      );
    }

    const userRes = await fetch(
      "https://www.patreon.com/api/oauth2/v2/identity" +
        "?include=memberships.currently_entitled_tiers" +
        "&fields[member]=patron_status" +
        "&fields[user]=full_name",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "User-Agent": "uobabel.com - Painel OAuth",
        },
      }
    );

    const userData = await userRes.json();
    const patreonId = userData.data.id;
    const fullName = userData.data.attributes.full_name ?? "Patrono";

    const hasSubscription =
      userData.included?.some(
        (item: any) =>
          item.type === "member" &&
          item.attributes?.patron_status === "active_patron"
      ) ?? false;

    await db.collection("vinculos").doc(patreonId).set(
      {
        fullName,
        isSubscriber: hasSubscription,
        updatedAt: Date.now(),
      },
      { merge: true }
    );

    // ✅ Definir cookie
    const cookie = serialize("patreon_id", patreonId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    console.error("🔥 Erro inesperado:", err);
    return NextResponse.json(
      { success: false, error: "Erro interno", details: err.message },
      { status: 500 }
    );
  }
}
