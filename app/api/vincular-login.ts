import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { loginUO } = req.body;

  if (!loginUO)
    return res.status(400).json({ success: false, error: "Login ausente" });

  const patreonId = req.cookies["patreon_id"]; // você deve setar esse cookie após o login no callback

  if (!patreonId)
    return res
      .status(401)
      .json({ success: false, error: "Usuário não autenticado" });

  await db.collection("vinculos").doc(patreonId).set({ loginUO });

  return res.status(200).json({ success: true });
}
