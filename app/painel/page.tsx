"use client";

import { useEffect, useState } from "react";

export default function PainelPage() {
  const [user, setUser] = useState<any>(null);
  const [loginUO, setLoginUO] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/patreon/me")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar usuário");
        return res.json();
      })

      .then((data) => {
        if (data.success && data.user) {
          setUser(data.user);
          setLoginUO(data.user.loginUO || "");
          setStatus("ready");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  const salvarLogin = async () => {
    setSaving(true);
    setMessage(null);

    const res = await fetch("/api/vincular-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loginUO }),
    });

    const json = await res.json();
    setSaving(false);

    if (json.success) {
      setMessage({ type: "success", text: "✅ Login vinculado com sucesso!" });
    } else {
      setMessage({
        type: "error",
        text: "❌ Erro ao salvar o login. Tente novamente.",
      });
    }
  };

  if (status === "loading")
    return <p className="text-center mt-10">Carregando painel...</p>;
  if (status === "error")
    return (
      <p className="text-center text-red-600 mt-10">
        Erro ao carregar suas informações. Faça login novamente.
      </p>
    );

  return (
    <main className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-2">
        🎉 Bem-vindo, {user.fullName || "Patrono"}!
      </h1>
      <p className="text-gray-600">
        Obrigado por apoiar o servidor <strong>UO Babel</strong> no Patreon.
      </p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">
          🧙 Vincular conta do Ultima Online
        </h2>
        <p className="mb-4 text-gray-500">
          Informe o nome de login que você usa no jogo:
        </p>

        <input
          type="text"
          value={loginUO}
          onChange={(e) => setLoginUO(e.target.value)}
          placeholder="Ex: arthur_dragon"
          className="w-full px-4 py-2 border rounded text-lg mb-4"
        />

        <button
          onClick={salvarLogin}
          disabled={saving || !loginUO.trim()}
          className={`px-6 py-2 rounded text-white ${
            saving || !loginUO.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-red-700"
          }`}
        >
          {saving ? "Salvando..." : "Salvar login do UO"}
        </button>

        {message && (
          <p
            className={`mt-4 ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </main>
  );
}
