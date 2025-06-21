import styles from "../../styles/Home.module.css";
import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "A História do mundo de Babel - UO Babel",
  description:
    "Conhe\u00e7a a história do mundo de Babel, desde o início até os dias atuais.",
};

export default function Historia() {
  return (
    <div className={styles.container}>
      <main className={styles.verticalPage}>
        <h1 className={styles.title}>A História do mundo de Babel</h1>
        <h2>Introdução</h2>
        <p className={styles.description}>
          Babel é um universo paralelo de Britannia. Um mundo ao mesmo tempo
          distante e conectado por laços invisíveis de magia e tragédia.
          Enquanto os habitantes de Britannia lutam por poder e glória em
          Felucca, existe um canto esquecido da realidade onde o tempo, a razão
          e a sanidade foram consumidos: o mundo de Babel.
        </p>
        <p className={styles.description}>
          Reza a lenda que, em eras antigas, Babel era um centro de
          conhecimento, comércio e convivência entre povos de línguas e culturas
          diversas. No coração deste mundo, erguia-se uma torre colossal. Ali,
          por meio de uma aura mágica, todos conseguiam se entender, mesmo sem
          partilharem o mesmo idioma. Mas a harmonia teve um fim. Um evento
          desconhecido mergulhou Babel na loucura e na destruição. Seus
          habitantes enlouqueceram, consumidos por um desejo insaciável de
          violência e poder. No final, todos morreram. As ruínas da grande torre
          foram soterradas, enterradas sob as camadas de um mundo agora hostil e
          imprevisível.
        </p>
        <p className={styles.description}>
          Hoje, os jogadores que desejam enfrentar o desafio máximo são
          convidados por Hermes, o Guia. Uma figura enigmática, que se apresenta
          como um mero condutor entre os mundos, mas cuja história é cercada de
          boatos sombrios. Muitos dizem que Hermes foi o último sobrevivente de
          Babel original. Que, para alcançar a vida eterna, ele sacrificou os
          últimos habitantes, realizando um ritual macabro e silencioso. Alguns
          afirmam que Hermes é, na verdade, um Lich disfarçado, um ser sádico
          que conduz novos aventureiros para o abismo, apenas para observar sua
          queda.
        </p>
        <p className={styles.description}>
          Ao iniciar sua jornada com Hermes, o jogador escolhe seu destino:
          permanecer em Felucca, enfrentando o PvM tradicional; entrar na versão
          PvPvM de Felucca, onde a traição pode vir de qualquer lado; ou se
          lançar no verdadeiro abismo: o modo Babel.
        </p>
        <p>
          Babel é um ambiente isolado. Não há cidades, não há segurança. Apenas
          terras desoladas, ruínas esquecidas e monstros enlouquecidos. Os NPCs
          inteligentes, dotados de inteligência artificial, existem apenas em
          Felucca. Em Babel, o único som que ecoa são os gritos das criaturas
          deformadas e o silêncio pesado de uma terra que já foi lar de
          civilizações.
        </p>
        <p>
          O ciclo de Babel é implacável. A cada trimestre ou semestre, um novo
          evento Ironman é iniciado. Jogadores começam sua luta apenas contra
          monstros, em áreas inicialmente seguras. Mas conforme os dias passam,
          a loucura da terra se intensifica. Áreas seguras se tornam zonas de
          combate. Jogadores começam a se atacar. A paranoia se instala. A
          história de Babel se repete.
        </p>
        <p className={styles.description}>
          No final, só resta um objetivo: sobreviver. Ser o último. Vencer a
          própria natureza humana, ou sucumbir como os antigos habitantes de
          Babel fizeram. Hermes observa. Sempre observando. Em silêncio. À
          espera dos próximos tolos corajosos.
        </p>
      </main>
    </div>
  );
}
