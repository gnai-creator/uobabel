"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      fetch("/api/token", {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: { "Content-Type": "application/json" },
      })
        .then(async (res) => {
          if (!res.ok) {
            const text = await res.text();
            console.error("Erro brabo na /api/token:", res.status, text);
            throw new Error("Erro na resposta do servidor");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Token response:", data);
          if (data.success) {
            router.push("/painel");
          } else {
            alert("Erro: " + data.error);
          }
        })
        .catch((err) => {
          console.error("Erro fatal no callback:", err);
          alert("Falha ao verificar sua conta do Patreon.");
        });
    }
  }, [code, router]);

  return <p>Verificando sua conta do Patreon...</p>;
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <CallbackInner />
    </Suspense>
  );
}
