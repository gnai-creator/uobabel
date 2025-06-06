"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CallbackInner() {
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
            router.push("/painel");
          } else {
            alert("Erro ao autenticar com o Patreon.");
          }
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
