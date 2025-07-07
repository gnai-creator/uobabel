import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export interface TokenPayload {
  userId: string;
  email: string;
  timestamp: number;
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const clientToken = process.env.CLIENT_TOKEN;
    if (!clientToken) {
      console.error("❌ CLIENT_TOKEN não configurado");
      return null;
    }

    const decoded = jwt.verify(token, clientToken) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error("❌ Erro ao verificar token:", error);
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  return authHeader?.replace("Bearer ", "") || null;
}

export function getUserFromRequest(req: NextRequest): TokenPayload | null {
  const token = getTokenFromRequest(req);
  if (!token) return null;

  return verifyToken(token);
}

export function generateToken(
  payload: Omit<TokenPayload, "timestamp">
): string {
  const clientToken = process.env.CLIENT_TOKEN;
  if (!clientToken) {
    throw new Error("CLIENT_TOKEN não configurado");
  }

  return jwt.sign(
    {
      ...payload,
      timestamp: Date.now(),
    },
    clientToken,
    { expiresIn: "7d" }
  );
}
