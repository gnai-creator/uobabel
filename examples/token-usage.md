# Como Usar o Token JWT no Cliente

## Exemplo de Login e Armazenamento do Token

```typescript
// Exemplo de função de login
async function fazerLogin(email: string, password: string) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Email: email, Password: password }),
    });

    const data = await response.json();

    if (data.success) {
      // Armazenar o token
      localStorage.setItem('authToken', data.token);
      
      // Armazenar dados do usuário
      localStorage.setItem('userData', JSON.stringify(data.user));
      
      return { success: true, user: data.user };
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error('Erro no login:', error);
    return { success: false, error: 'Erro de conexão' };
  }
}
```

## Exemplo de Requisições Autenticadas

```typescript
// Função para fazer requisições autenticadas
async function fetchAutenticado(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    throw new Error('Token não encontrado');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401) {
    // Token expirado ou inválido
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.location.href = '/login';
    return;
  }

  return response;
}

// Exemplo de uso
async function buscarDadosProtegidos() {
  try {
    const response = await fetchAutenticado('/api/ironman-ranking');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}
```

## Exemplo de Hook React

```typescript
// Hook para gerenciar autenticação
import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('userData');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const result = await fazerLogin(email, password);
    
    if (result.success) {
      setUser(result.user);
      setToken(localStorage.getItem('authToken'));
    }
    
    return result;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setToken(null);
  };

  return { user, token, loading, login, logout };
}
```

## Exemplo de Componente Protegido

```typescript
// Componente que só renderiza se autenticado
import { useAuth } from './useAuth';

export function ComponenteProtegido() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <div>Faça login para acessar este conteúdo</div>;
  }

  return (
    <div>
      <h1>Bem-vindo, {user.Nome}!</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

## Verificação de Token no Cliente

```typescript
// Função para verificar se o token ainda é válido
function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    return payload.exp > currentTime;
  } catch (error) {
    return false;
  }
}

// Uso
const token = localStorage.getItem('authToken');
if (token && !isTokenValid(token)) {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  // Redirecionar para login
}
``` 