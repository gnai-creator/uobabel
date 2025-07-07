# Configuração de Variáveis de Ambiente

## Variáveis Necessárias

### Firebase Configuration
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="your-private-key"
```

### Patreon Configuration
```env
PATREON_CLIENT_ID=your-patreon-client-id
PATREON_CLIENT_SECRET=your-patreon-client-secret
PATREON_OWNER_ID=your-patreon-owner-id
```

### Client Token for JWT Authentication
```env
CLIENT_TOKEN=your-secure-jwt-secret-key-here
```

## Como Configurar

1. Crie um arquivo `.env.local` na raiz do projeto
2. Adicione as variáveis acima com seus valores reais
3. Para o `CLIENT_TOKEN`, gere uma chave segura (pode usar um gerador de senhas)
4. Reinicie o servidor de desenvolvimento

## Segurança

- **NUNCA** commite o arquivo `.env.local` no repositório
- Use chaves seguras e únicas para cada ambiente
- O `CLIENT_TOKEN` deve ser uma string longa e aleatória
- Em produção, configure as variáveis no seu provedor de hospedagem

## Exemplo de Geração de CLIENT_TOKEN

```bash
# No terminal, gere uma chave segura
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
``` 