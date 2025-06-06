// pages/index.tsx
import React from "react";
import Image from "next/image";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import logo from "../public/logo.png";

export default function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <Head>
        <title>UO Babel - Survival Hardcore</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className={styles.header}>
        <Image
          src={logo}
          alt="UO Babel Logo"
          className={styles.logo}
          width={300}
          height={300}
        />
        <h1>UO Babel</h1>
        <p className={styles.subtitle}>Servidor Survival Hardcore</p>
      </header>

      <main className={styles.main}>
        <section className={styles.intro}>
          <h2>🔥 O caos começou</h2>
          <p>
            Um dragão atacou a Torre de Babel. Um novo mundo nasce das cinzas.
          </p>
          <a href="#" className={styles.btn}>
            Entrar no Discord
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 UO Babel. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
