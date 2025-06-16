// pages/privacy.tsx
import styles from "../../styles/Home.module.css";
import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Política de Privacidade - UO Babel",
  description:
    "Saiba como coletamos, usamos e protegemos seus dados no servidor UO Babel.",
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>

      <main className={styles.verticalPage}>
        <h1 className={styles.title}>Política de Privacidade</h1>
        <p className={styles.description}>
          Esta política descreve como coletamos, usamos e protegemos seus dados
          no site e no jogo UO Babel.
        </p>

        <section className={styles.section}>
          <h2>1. Coleta de Informações</h2>
          <p>
            Coletamos informações básicas como nome, e-mail e identificadores de
            conta de serviços de terceiros (como Patreon) para autenticação e
            liberação de funcionalidades exclusivas.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Uso das Informações</h2>
          <p>
            Utilizamos seus dados para validar sua assinatura, liberar acesso a
            recursos premium e melhorar a experiência no servidor e no site.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Compartilhamento de Dados</h2>
          <p>
            Não compartilhamos suas informações com terceiros, exceto quando
            necessário para verificação de assinatura via API (ex: Patreon).
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Armazenamento e Segurança</h2>
          <p>
            Seus dados são armazenados com segurança e acessados apenas por
            sistemas automatizados ou equipe autorizada.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Seus Direitos</h2>
          <p>
            Você pode solicitar a remoção de seus dados a qualquer momento
            entrando em contato por e-mail ou pelo site.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Alterações nesta Política</h2>
          <p>
            Esta política pode ser atualizada periodicamente. A versão mais
            recente estará sempre disponível nesta página.
          </p>
        </section>
      </main>
    </div>
  );
}
