"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!code) return;

    const autenticar = async () => {
      toast.loading("Verificando sua conta do Patreon...");

      try {
        const res = await fetch("/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        const data = await res.json();
        toast.dismiss();
        setCarregando(false);

        if (res.status === 403 && data?.requiresSubscription) {
          toast.error(
            "Você ainda não é assinante. Redirecionando para o Patreon..."
          );
          setTimeout(() => {
            window.location.href = "https://www.patreon.com/uobabel";
          }, 3000);
        } else if (data.success) {
          toast.success("✅ Conta vinculada com sucesso!");
          router.push("/painel");
        } else {
          toast.error("❌ " + (data.error || "Erro inesperado."));
          setErro(data.error || "Erro desconhecido.");
        }
      } catch (err) {
        toast.dismiss();
        setErro("Erro de rede ao autenticar. Tente novamente.");
        console.error("Erro fatal no callback:", err);
      }
    };

    autenticar();
  }, [code, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      {carregando ? (
        <>
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
          <p className="text-lg text-gray-700">
            Verificando sua conta do Patreon...
          </p>
        </>
      ) : erro ? (
        <>
          <p className="text-lg text-red-600 mb-2">❌ {erro}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 flex items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Voltar ao site
          </button>
        </>
      ) : null}
    </div>
  );
}
