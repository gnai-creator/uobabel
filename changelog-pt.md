# UO Babel Changelog - Português

## [7.0.20.0] - 2024-12-28

### Adicionado
- **Sistema de Autenticação JWT**: Implementado sistema seguro de autenticação baseado em tokens
- **Novo sistema de Ranking Ironman** com placares em tempo real
- **Integração com Patreon** para benefícios de assinantes
- **Sistema de login aprimorado** com autenticação Vincular
- **Novo endpoint de API para status de assinante**
- **Launcher melhorado** para plataformas Windows e Linux
- **Middleware para proteção de rotas** com validação automática de tokens
- **Utilitários de autenticação** para geração e verificação de tokens

### Alterado
- Atualizada versão do cliente para 7.0.20.0
- Atualizada versão do BabelUO para 1.0.5
- Layout e navegação do site aprimorados
- Performance melhorada com Next.js 15.3.3
- React atualizado para versão 19.0.0
- **API de login agora retorna token JWT** para autenticação do cliente

### Corrigido
- Resolvidos problemas de manipulação de tokens de autenticação
- Corrigidos links de download do launcher para usuários Linux
- Melhorado tratamento de erros nos endpoints da API
- Segurança aprimorada para dados do usuário
- **Corrigida validação e expiração de tokens**

### Melhorias Técnicas
- Migração para Next.js App Router
- TypeScript implementado em toda a aplicação
- Adicionado Tailwind CSS v4 para estilização melhorada
- SEO otimizado
- Processo de build melhorado com Turbopack
- **Adicionado gerenciamento abrangente de tokens JWT**
- **Implementado middleware seguro de proteção de rotas**

### Melhorias de Segurança
- **Tokens JWT com expiração de 7 dias**
- **Validação automática de tokens em rotas protegidas**
- **Recomendações de armazenamento seguro de tokens**
- **Configuração de variáveis de ambiente para tokens do cliente**

## [7.0.19.0] - 2024-12-27

### Versão Anterior
- Lançamento inicial do novo cliente UO Babel
- Sistema básico de autenticação
- Funcionalidades principais do jogo
- Suporte ao launcher Windows

---

*Para informações detalhadas sobre cada atualização, consulte as notas de lançamento individuais.* 