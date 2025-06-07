"use client";

import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import logo from "../../public/logo.png";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
export default function LoginPage() {
  const clientId = process.env.PATREON_CLIENT_ID;
  const rawRedirectUri = "https://www.uobabel.com/patreon/callback";
  const encodedRedirectUri = encodeURIComponent(rawRedirectUri);
  const scope = encodeURIComponent("identity identity.memberships");
  const router = useRouter();

  useEffect(() => {
    async function verificarStatus() {
      try {
        const res = await fetch("/api/patreon/me");
        const data = await res.json();

        if (data.success && data.user?.isSubscriber) {
          // Redireciona automaticamente se já for assinante
          router.push("/painel");
        }
      } catch (err) {
        console.warn("Falha ao verificar status do Patreon:", err);
      }
    }

    verificarStatus();
  }, [router]);
  // ⛔ Aviso se clientId não estiver definido
  if (!clientId) {
    return (
      <div className={styles.container}>
        <p style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>
          ⚠️ Erro: PATREON_CLIENT_ID não definido. Verifique seu .env.local ou
          variáveis no Vercel.
        </p>
      </div>
    );
  }

  // 🔗 URL segura de login com OAuth
  const loginUrl = `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodedRedirectUri}&scope=${scope}&prompt=consent`;

  return (
    <div className={styles.container}>
      <Head>
        <title>Login com Patreon - UO Babel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className={styles.header}>
        <Image
          src={logo}
          alt="UO Babel Logo"
          className={styles.logo}
          width={180}
          height={180}
        />
        <h1>UO Babel</h1>
        <p className={styles.subtitle}>Servidor Survival Hardcore</p>
      </header>

      <main className={styles.main}>
        <section className={styles.intro}>
          <h2>🔐 Acesso Premium</h2>
          <p>
            Para acessar recursos exclusivos no jogo, entre com sua conta do
            Patreon.
          </p>
          <a href={loginUrl} className={styles.btn}>
            Entrar com Patreon
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 UO Babel. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
