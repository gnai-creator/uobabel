// pages/api/patreon/token.ts (ou /app/api/... se App Router for usado)
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.body;

  const params = new URLSearchParams({
    code,
    grant_type: "authorization_code",
    client_id: process.env.PATREON_CLIENT_ID!,
    client_secret: process.env.PATREON_CLIENT_SECRET!,
    redirect_uri: "https://www.uobabel.com/patreon/callback",
  });

  const result = await fetch("https://www.patreon.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const json = await result.json();

  if (!json.access_token) {
    return res.status(401).json({ success: false, error: json });
  }

  // Agora você pode chamar a API do Patreon para pegar info do usuário
  const userData = await fetch(
    "https://www.patreon.com/api/oauth2/v2/identity?include=memberships&fields[member]=patron_status",
    {
      headers: { Authorization: `Bearer ${json.access_token}` },
    }
  ).then((res) => res.json());

  // Aqui você verifica se ele é um patrono ativo
  const active = userData.included?.some(
    (m: any) => m.attributes?.patron_status === "active_patron"
  );

  return res.status(200).json({ success: true, isSubscriber: active });
}
