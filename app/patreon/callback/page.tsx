// app/patreon/callback/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PatreonCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      fetch("/api/patreon/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // salvar token localmente, ou redirecionar pro jogo
            router.push("/painel");
          } else {
            alert("Erro ao autenticar com Patreon.");
          }
        });
    }
  }, [code, router]);

  return <p>Verificando sua conta do Patreon...</p>;
}
