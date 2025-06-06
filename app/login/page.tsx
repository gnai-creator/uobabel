// app/login/page.tsx
"use client";
import { useEffect } from "react";

export default function LoginPage() {
  const loginUrl = `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_PATREON_CLIENT_ID}&redirect_uri=https://www.uobabel.com/patreon/callback&scope=identity%20identity.memberships`;

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Login com Patreon</h1>
      <p>
        Para acessar funcionalidades premium do UO Babel, entre com sua conta do
        Patreon.
      </p>
      <a href={loginUrl}>
        <button
          style={{ marginTop: "1rem", padding: "10px 20px", fontSize: "16px" }}
        >
          Entrar com Patreon
        </button>
      </a>
    </main>
  );
}
