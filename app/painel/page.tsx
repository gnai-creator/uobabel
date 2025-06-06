"use client";

import { useEffect, useState } from "react";

export default function PainelPage() {
  const [user, setUser] = useState<any>(null);
  const [loginUO, setLoginUO] = useState("");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("/api/patreon/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setLoginUO(data.user.loginUO || "");
        setStatus("ready");
      });
  }, []);

  const salvarLogin = async () => {
    const res = await fetch("/api/vincular-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loginUO }),
    });
    const json = await res.json();
    if (json.success) alert("Login vinculado com sucesso!");
  };

  if (status === "loading") return <p>Carregando...</p>;

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🎉 Bem-vindo, {user.fullName || "Patrono"}!</h1>
      <p>Obrigado por apoiar o servidor UO Babel no Patreon.</p>

      <div style={{ marginTop: "2rem" }}>
        <h2>🧙 Vincular conta do Ultima Online</h2>
        <p>Informe o nome de usuário que você usa no jogo:</p>
        <input
          type="text"
          value={loginUO}
          onChange={(e) => setLoginUO(e.target.value)}
          placeholder="Ex: arthur_dragon"
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        <br />
        <button
          onClick={salvarLogin}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          Salvar login do UO
        </button>
      </div>
    </main>
  );
}
