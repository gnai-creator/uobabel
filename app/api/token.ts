import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: "Código ausente." });
  }

  // Troca o código por um access token
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

  if (!tokenData.access_token) {
    return res.status(401).json({ success: false, error: "Token inválido." });
  }

  // Pega dados do usuário
  const userRes = await fetch(
    "https://www.patreon.com/api/oauth2/v2/identity?include=memberships&fields[member]=patron_status&fields[user]=full_name,social_connections",
    {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    }
  );
  const userData = await userRes.json();

  const patreonId = userData.data?.id;
  const isSubscriber = userData.included?.some(
    (m: any) => m.attributes?.patron_status === "active_patron"
  );

  if (!patreonId) {
    return res
      .status(400)
      .json({ success: false, error: "ID do usuário não encontrado." });
  }

  // Define cookie com o ID do usuário Patreon
  res.setHeader(
    "Set-Cookie",
    serialize("patreon_id", patreonId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      httpOnly: false, // se for usado no client
      sameSite: "lax",
    })
  );

  return res.status(200).json({
    success: true,
    isSubscriber,
    patreonId,
    name: userData.data.attributes.full_name,
  });
}
