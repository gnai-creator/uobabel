"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) return;

    const autenticar = async () => {
      try {
        const res = await fetch("/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        const data = await res.json();

        if (res.status === 403 && data?.requiresSubscription) {
          alert(
            "Você vinculou sua conta, mas ainda não é assinante. Por favor, apoie para desbloquear o conteúdo premium."
          );
          window.location.href = "https://www.patreon.com/uobabel";
        } else if (data.success) {
          router.push("/painel");
        } else {
          alert("Erro: " + (data.error || "Erro inesperado."));
        }
      } catch (err) {
        console.error("Erro fatal no callback:", err);
        alert("Falha ao verificar sua conta do Patreon.");
      }
    };

    autenticar();
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
