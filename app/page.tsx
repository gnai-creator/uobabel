// pages/index.tsx
import Image from "next/image";
import type { FC } from "react";
import Link from "next/link";
import { defaultMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import styles from "../styles/Home.module.css";
import logo from "../public/logo.png";

export const metadata: Metadata = {
  ...defaultMetadata,
};

const Home: FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <Image
            src={logo}
            alt="UO Babel Logo"
            className={styles.logo}
            width={180}
            height={180}
          />
          <h1 className={styles.title}>UO Babel</h1>
          <p className={styles.subtitle}>Servidor Survival Hardcore</p>
        </div>
      </header>

      <nav className={styles.nav}>
        <Link href="/painel">Painel</Link>
        <Link href="/historia">História</Link>
        <Link href="/sobre-babel">Sobre Babel</Link>
        <Link href="/ironman-ranking">Ironman Ranking</Link>
        <Link href="/terms">Termos</Link>
        <Link href="/privacy">Privacidade</Link>
      </nav>

      <main className={styles.main}>
        <section className={styles.intro}>
          <h2>🔥 O caos começou</h2>
          <p>
            Um dragão atacou a Torre de Babel. Um novo mundo nasce das cinzas.
          </p>
          <p>Baixe agora o client do servidor e comece a jogar.</p>
          <a href="./UOBabelLauncher.zip" className={styles.btn}>
            Download Client Launcher
          </a>
          <br />
          <a href="./UOBabelLinuxLauncher.7z" className={styles.btn}>
            Download Linux Launcher
          </a>
          {/* <br />
          <a
            href="https://firebasestorage.googleapis.com/v0/b/uobabelclient.firebasestorage.app/o/UOBabe-Zipl.zip?alt=media&token=6c1ba865-da81-4c90-94e4-0af9105e0be5"
            className={styles.btn}
          >
            Download Client Zip
          </a> */}
        </section>

        <section className={styles.intro}>
          <h2>🌐 Junte-se a nossa comunidade</h2>
          <p>Entre em contato para saber mais sobre o servidor.</p>
          <a href="https://discord.gg/Hj2ZfzHWu5" className={styles.btn}>
            Entrar no Discord
          </a>
        </section>

        <section className={styles.intro}>
          <h2>Quer acesso Ilimitado no servidor?</h2>
          <p>Assine o Patreon para ter acesso a funcionalidades exclusivas.</p>
          <p>
            Se estiver problemas para acessar o painel, Assine o Patreon e
            clique novamente neste botão.
          </p>
          <a href="/login" className={styles.btn}>
            Entrar Painel/Patreon
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 UO Babel. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
