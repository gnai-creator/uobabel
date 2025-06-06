import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { db } from "@/lib/firestore";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        { success: false, error: "Código ausente." },
        { status: 400 }
      );
    }

    const tokenParams = new URLSearchParams({
      code,
      grant_type: "authorization_code",
      client_id: process.env.PATREON_CLIENT_ID ?? "",
      client_secret: process.env.PATREON_CLIENT_SECRET ?? "",
      redirect_uri: "https://www.uobabel.com/patreon/callback",
    });

    const tokenRes = await fetch("https://www.patreon.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenParams.toString(),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.access_token) {
      console.error("Erro ao obter token do Patreon:", tokenData);
      return NextResponse.json(
        { success: false, error: "Token inválido ou expirado." },
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

    const patreonId = userData?.data?.id;
    const fullName = userData?.data?.attributes?.full_name;
    const isSubscriber = userData?.included?.some(
      (m: any) => m.attributes?.patron_status === "active_patron"
    );

    if (!patreonId || !fullName) {
      return NextResponse.json(
        { success: false, error: "Dados incompletos do Patreon." },
        { status: 400 }
      );
    }

    // Salvar no Firestore
    await db.collection("vinculos").doc(patreonId).set(
      {
        fullName,
        isSubscriber,
        loginUO: null,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    // Retorna resposta com cookie
    const response = NextResponse.json({
      success: true,
      patreonId,
      isSubscriber,
      name: fullName,
    });

    response.headers.set(
      "Set-Cookie",
      serialize("patreon_id", patreonId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: false, // pode mudar para true se não precisar acessar via JS
        sameSite: "lax",
      })
    );

    return response;
  } catch (err: any) {
    console.error("Erro fatal no endpoint /api/token:", err);
    return NextResponse.json(
      { success: false, error: "Erro interno ao processar autenticação." },
      { status: 500 }
    );
  }
}
