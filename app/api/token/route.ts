import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { db } from "@/lib/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const code = body.code;

    if (!code) {
      return NextResponse.json(
        { success: false, error: "Código ausente." },
        { status: 400 }
      );
    }

    const clientId = process.env.PATREON_CLIENT_ID ?? "MISSING_CLIENT_ID";
    const clientSecret = process.env.PATREON_CLIENT_SECRET ?? "MISSING_SECRET";

    if (clientId === "MISSING_CLIENT_ID" || clientSecret === "MISSING_SECRET") {
      console.error("❌ Variáveis de ambiente ausentes.");
      return NextResponse.json(
        { success: false, error: "Configuração do servidor inválida." },
        { status: 500 }
      );
    }

    const tokenParams = new URLSearchParams({
      code,
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: "https://www.uobabel.com/patreon/callback",
    });

    const tokenRes = await fetch("https://www.patreon.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenParams.toString(),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      console.error("❌ Erro ao obter access_token:", tokenData);
      return NextResponse.json(
        { success: false, error: "Token inválido." },
        { status: 401 }
      );
    }

    const userRes = await fetch(
      "https://www.patreon.com/api/oauth2/v2/identity?include=memberships&fields[member]=patron_status&fields[user]=full_name",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const userData = await userRes.json();
    const patreonId = userData.data?.id;
    const fullName = userData.data?.attributes?.full_name;
    const isSubscriber = userData.included?.some(
      (m: any) => m.attributes?.patron_status === "active_patron"
    );

    if (!patreonId || !fullName) {
      return NextResponse.json(
        { success: false, error: "Dados incompletos do usuário." },
        { status: 400 }
      );
    }

    // Salvar no Firestore
    await db.collection("vinculos").doc(patreonId).set(
      {
        fullName,
        isSubscriber,
        loginUO: null,
      },
      { merge: true }
    );

    // Criar cookie
    const response = NextResponse.json({
      success: true,
      isSubscriber,
      patreonId,
      name: fullName,
    });

    response.headers.set(
      "Set-Cookie",
      serialize("patreon_id", patreonId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        httpOnly: false,
        sameSite: "lax",
      })
    );

    return response;
  } catch (err) {
    console.error("❌ Erro interno:", err);
    return NextResponse.json(
      { success: false, error: "Erro interno ao processar autenticação." },
      { status: 500 }
    );
  }
}
