import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Rotas que precisam de autenticação
const protectedRoutes = [
  "/api/ironman-ranking",
  "/api/update-ironman-ranking",
  "/api/uobabel/subscriber-status",
  "/painel",
];

// Rotas que são públicas
const publicRoutes = [
  "/api/auth/login",
  "/api/token",
  "/api/patreon/me",
  "/api/vincular-login",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar se é uma rota protegida
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Verificar se é uma rota pública
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Se não é rota protegida, permitir acesso
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Se é rota pública, permitir acesso
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Para rotas protegidas, verificar o token
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json(
      { success: false, error: "Token não fornecido" },
      { status: 401 }
    );
  }

  try {
    const clientToken = process.env.CLIENT_TOKEN;
    if (!clientToken) {
      console.error("❌ CLIENT_TOKEN não configurado");
      return NextResponse.json(
        { success: false, error: "Erro de configuração do servidor" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, clientToken) as any;

    // Adicionar informações do usuário ao request
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", decoded.userId);
    requestHeaders.set("x-user-email", decoded.email);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("❌ Token inválido:", error);
    return NextResponse.json(
      { success: false, error: "Token inválido ou expirado" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/:path*", "/painel/:path*"],
};
