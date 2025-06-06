// pages/terms.tsx
import Head from "next/head";
import styles from "../../styles/Home.module.css";

export default function TermsOfService() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Termos de Uso - UO Babel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Termos de Uso</h1>
        <p className={styles.description}>
          Estes termos regem o uso do servidor e site UO Babel. Ao jogar ou acessar o site, você concorda com estas condições.
        </p>

        <section className={styles.section}>
          <h2>1. Uso do Servidor</h2>
          <p>
            O acesso ao servidor UO Babel é permitido para fins de entretenimento. Abusos, trapaças ou comportamentos inadequados podem levar a suspensão ou banimento.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Conta de Usuário</h2>
          <p>
            Ao criar uma conta ou conectar via Patreon, você é responsável por manter suas credenciais seguras e por todas as ações associadas à sua conta.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Acesso Premium</h2>
          <p>
            Recursos premium são disponibilizados apenas a usuários com assinatura ativa via Patreon. Benefícios podem mudar sem aviso prévio.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo exclusivo de UO Babel, incluindo NPCs com IA, textos e scripts, é protegido por direitos autorais. É proibido copiar ou redistribuir sem permissão.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Modificações</h2>
          <p>
            Reservamo-nos o direito de alterar estes termos a qualquer momento. As mudanças entrarão em vigor ao serem publicadas nesta página.
          </p>
        </section>
      </main>
    </div>
  );
}
