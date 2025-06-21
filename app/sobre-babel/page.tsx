import styles from "../../styles/Home.module.css";
import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Sobre Babel - UO Babel",
  description:
    "Conhe\u00e7a os recursos exclusivos e o sistema de IA do servidor UO Babel.",
};

export default function SobreBabel() {
  return (
    <div className={styles.container}>
      <main className={styles.verticalPage}>
        <h1 className={styles.title}>Sobre Babel</h1>
        
        <p className={styles.description}>
          🎮 Sistema de IA Avançada e Recursos Exclusivos – Bem-vindo ao UOBabel
          Server! 🌌 Prepare-se para uma experiência de Ultima Online como você
          nunca viu antes! Nosso servidor vai muito além do tradicional,
          trazendo inteligência artificial, imersão emocional e recursos
          inéditos que transformam cada login em uma nova aventura.
        </p>
        <p>✨ Destaques do Núcleo Customizado do UOBabel Server:</p>
        <section className={styles.section}>
          <h2>🧠 NPCs com Memória e Inteligência Real</h2>
          <p>
            NPCs não apenas falam... eles lembram de você! Graças ao sistema
            MemoryFeature, cada criatura pode registrar eventos importantes e
            reagir com base nas interações anteriores. E com o
            NpcIntelligenceFeature, esses dados vão direto para um serviço de IA
            que transforma cada conversa com um NPC em um diálogo dinâmico,
            único e imprevisível.
          </p>
        </section>
        <section className={styles.section}>
          <h2>🤖 Companheiros Inteligentes</h2>
          <p>
            Com o CompanionFeature, você pode ter um aliado que obedece
            comandos, interage com o ambiente e guarda memórias das suas
            aventuras, criando um vínculo verdadeiro durante suas jornadas.
          </p>
        </section>
        <section className={styles.section}>
          <h2>🔥 Modo Fúria: RageFeature</h2>
          <p>
            Monstros e criaturas agora podem entrar em estado de fúria, mudando
            aparência e ficando ainda mais perigosos! Prepare-se para sobreviver
            ao inesperado!
          </p>
        </section>
        <section className={styles.section}>
          <h2>💎 Sistema de Loot Personalizado – DropBoostFeature</h2>
          <p>
            Eventos especiais? Modos desafiadores? Agora o loot escala com seu
            esforço! Recompensas diferenciadas para quem encara os maiores
            perigos.
          </p>
        </section>
        <section className={styles.section}>
          <h2>🏅 Ironman Mode – Hardcore de Verdade!</h2>
          <p>
            Sem banco, sem recall, vida única! Participe dos desafios Ironman,
            com ranking em tempo real, estatísticas de sobrevida e o verdadeiro
            teste de sobrevivência.
          </p>
        </section>
        <section className={styles.section}>
          <h2>🌍 Exploração Sem Limites com o BabelMapGrid</h2>
          <p>
            Viaje entre múltiplos mapas interconectados, com spawns dinâmicos,
            bosses épicos e um mundo que se expande conforme a sua coragem.
          </p>
        </section>
        <section className={styles.section}>
          <h2>🌐 Diálogos Multilíngues com IA Tradutora</h2>
          <p>
            Interaja com NPCs que entendem e respondem em múltiplos idiomas,
            criando uma experiência inclusiva e global graças ao AITranslator.
          </p>
        </section>
        <section className={styles.section}>
          <h2>👑 Benefícios para Apoiadores – Integração com Patreon</h2>
          <p>
            Seja um apoiador e desbloqueie privilégios exclusivos, desde itens
            especiais até comandos únicos no jogo. Atualização de status direto
            via comando!
          </p>
        </section>
        <section className={styles.section}>
          <h2>🎨 Itens Customizados Incríveis</h2>
          <p>Color Changing Robe: Troque de visual quando quiser!</p>
          <p>GMSkillBook: Inicie sua jornada com 5 skills GM!</p>
          <p>
            GoldCrafting Kit: Novas formas de criação com recursos no modo
            Ironman.
          </p>
          <p>
            Buriable Container: Sua única forma de guardar itens em Babel no
            modo Ironman. Mas cuidado, se alguém souber onde vc enterrou…
          </p>
        </section>
        <section className={styles.section}>
          <h2>✅ UniqueCharacterNames</h2>
          <p>
            No UOBabel, cada nome é único. Sua identidade no mundo do jogo é só
            sua!
          </p>
        </section>
        <section className={styles.section}>
          <h2>
            🚀 O UOBabel não é só um servidor... é uma evolução de Ultima
            Online!
          </h2>
          <p>
            Seja você um aventureiro casual ou um desafiante Ironman, aqui a
            história é dinâmica, inteligente e moldada pelas suas escolhas.
          </p>
        </section>
        <p>
          👉 Junte-se agora e viva o Ultima como ele deveria ser! O Servidor
          está online para testes.
        </p>
      </main>
    </div>
  );
}
