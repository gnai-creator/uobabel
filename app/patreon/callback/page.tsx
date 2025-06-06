"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

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

        if (res.status === 403 && data?.requiresSubscription) {
          toast.error(
            "Você não é assinante ainda. Redirecionando para o Patreon..."
          );
          setTimeout(() => {
            window.location.href = "https://www.patreon.com/uobabel";
          }, 3000);
        } else if (data.success) {
          toast.success("✅ Conta vinculada com sucesso!");
          router.push("/painel");
        } else {
          toast.error("❌ " + (data.error || "Erro inesperado."));
        }
      } catch (err) {
        toast.dismiss();
        toast.error("Erro de rede ao autenticar. Tente novamente.");
        console.error("Erro fatal no callback:", err);
      }
    };

    autenticar();
  }, [code, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
      <p className="text-lg text-gray-700">
        Verificando sua conta do Patreon...
      </p>
    </div>
  );
}
