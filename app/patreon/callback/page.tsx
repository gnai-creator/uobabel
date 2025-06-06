"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, X, ArrowLeft } from "lucide-react";

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
          setErro(data.error || "Erro inesperado ao autenticar.");
        }
      } catch (err) {
        toast.dismiss();
        setErro("Erro de rede ao autenticar. Tente novamente.");
        console.error("Erro fatal:", err);
      }
    };

    autenticar();
  }, [code, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-white text-center px-4">
      {carregando && (
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
          <p className="text-lg text-gray-700">
            Verificando sua conta do Patreon...
          </p>
        </div>
      )}

      {erro && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 text-center relative">
            <button
              onClick={() => router.push("/")}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-red-600 mb-2">Erro</h2>
            <p className="text-gray-700 mb-4">{erro}</p>

            <button
              onClick={() => router.push("/")}
              className="mt-2 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Voltar ao site
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
