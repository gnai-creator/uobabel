// app/patreon/callback/page.tsx

"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

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
        setCarregando(false);

        if (res.status === 403 && data?.requiresSubscription) {
          alert("Você precisa assinar o Patreon para continuar.");
          window.location.href = "https://www.patreon.com/uobabel/membership?redirect_uri=https://www.uobabel.com/patreon/callback";
        }
         else if (data.success) {
          router.push("/painel");
        } else {
          setErro(data.error || "Erro inesperado");
        }
      } catch (err) {
        setErro("Erro de rede ao autenticar.");
        console.error("Erro fatal:", err);
      }
    };

    autenticar();
  }, [code, router]);

  if (carregando) {
    return <p>Verificando sua conta do Patreon...</p>;
  }

  if (erro) {
    return (
      <div className="text-center text-red-600 p-4">
        <h2 className="text-xl font-bold mb-2">Erro</h2>
        <p>{erro}</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Voltar ao site
        </button>
      </div>
    );
  }

  return null;
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Carregando...</p>}>
      <CallbackInner />
    </Suspense>
  );
}
