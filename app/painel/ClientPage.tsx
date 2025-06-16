"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

export default function ClientPage() {
  const [user, setUser] = useState<any>(null);
  const [loginUO, setLoginUO] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/patreon/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginUO }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: "Login UO salvo com sucesso!" });
      } else {
        setMessage({ type: "error", text: data.error || "Erro ao salvar." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Erro de rede." });
    }

    setSaving(false);
  };

  if (status === "loading") {
    return <p className="text-center mt-10">Carregando...</p>;
  }

  if (status === "error" || !user) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-600">Erro ao carregar informações do Patreon.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className="text-2xl font-bold mb-4">Painel do Usuário</h1>
        <p className="mb-4">Olá, {user.fullName}!</p>
        <div className="mb-4">
          <label htmlFor="login" className="block mb-2">
            Login do Ultima Online
          </label>
          <input
            id="login"
            type="text"
            value={loginUO}
            onChange={(e) => setLoginUO(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-4 py-2 text-white rounded ${saving ? "bg-gray-400" : "bg-gradient-to-r from-red-600 to-pink-600 hover:opacity-90"}`}
        >
          {saving ? "Salvando..." : "Salvar login do UO"}
        </button>

        {message && (
          <p className={`mt-4 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>{message.text}</p>
        )}
      </main>
    </div>
  );
}
