# 🎮 Poogame - Documentação da Arquitetura MVC (Fullstack TypeScript)

Este projeto é uma aplicação **Fullstack Monorepo** baseada no padrão de arquitetura **MVC (Model-View-Controller)**, utilizando **TypeScript** de ponta a ponta. O backend é construído com Node.js + Express, e o frontend com React + Vite, ambos servidos pelo mesmo servidor em ambiente de produção.

---

## 🏗️ Estrutura Geral do Projeto

O projeto está dividido entre a raiz (Backend/Servidor) e a subpasta `client/` (Frontend/Interface).

```text
poogame/
├── src/                        # 🧠 BACKEND (Model e Controller)
│   ├── models/                 # [M] MODEL - Entidades, tipos e dados
│   ├── controllers/            # [C] CONTROLLER - Regras de negócio e rotas
│   └── routes/                 # Mapeamento das rotas da API
├── client/                     # 👁️ FRONTEND (View)
│   └── src/                    # [V] VIEW - Componentes e interface React
├── server.ts                   # Ponto de entrada do servidor Express
├── tsconfig.json               # Configuração TypeScript do Backend
└── package.json                # Scripts e dependências do Backend
```

---

## 🎯 Onde desenvolver cada funcionalidade (MVC)

Para manter o código limpo, testável e escalável, siga rigorosamente as diretrizes abaixo para a divisão de responsabilidades.

---

### 1. 🗄️ MODEL (`src/models/`) — *Backend*
**O que fica aqui:**
* Interfaces, Types e Schemas de dados da aplicação.
* Comunicação direta com o banco de dados (MongoDB, PostgreSQL, Prisma, Mongoose, etc.).
* Funções de busca, criação, atualização e exclusão direta no banco de dados.

**Regras:**
* O Model **NUNCA** lida com requisições HTTP (`req`, `res`).
* O Model **NUNCA** importa Controllers ou componentes React.

**Exemplo de criação de arquivo (`src/models/gameModel.ts`):**
```typescript
export interface Player {
  id: string;
  name: string;
  score: number;
}

export const PlayerModel = {
  async getAll(): Promise<Player[]> {
    // Exemplo: Comunicação com o Banco de Dados
    return [
      { id: '1', name: 'Player One', score: 100 }
    ];
  }
};
```

---

### 2. ⚙️ CONTROLLER (`src/controllers/` e `src/routes/`) — *Backend*
**O que fica aqui:**
* A lógica de negócio, validações de regras de jogo/aplicação e autenticação.
* Recebimento das requisições HTTP (`req`), processamento dos dados e retorno da resposta (`res`).
* Chamada aos métodos da camada **Model**.

**Regras:**
* O Controller recebe os dados do frontend, pede a informação ao Model e responde para a View (React).
* O Controller não deve ter lógica direta de SQL/consultas brutas ao banco (isso deve ser isolado no Model).

**Exemplo de Controller (`src/controllers/gameController.ts`):**
```typescript
import type { Request, Response } from 'express';
import { PlayerModel } from '../models/gameModel';

export const GameController = {
  async getLeaderboard(req: Request, res: Response): Promise<void> {
    try {
      const players = await PlayerModel.getAll();
      res.status(200).json({ success: true, data: players });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao buscar dados.' });
    }
  }
};
```

**Exemplo de Rota (`src/routes/gameRoutes.ts`):**
```typescript
import { Router } from 'express';
import { GameController } from '../controllers/gameController';

const router = Router();

router.get('/leaderboard', GameController.getLeaderboard);

export default router;
```

---

### 3. 👁️ VIEW (`client/src/`) — *Frontend React*
**O que fica aqui:**
* Interface visual (UI), páginas, telas do jogo, formulários e componentes React.
* Gerenciamento de estado visual (React `useState`, `useContext`, etc.).
* Consumo das rotas criadas no Backend (`/api/...`).

**Regras:**
* A View não possui acesso direto ao banco de dados ou regras de servidor.
* Toda a comunicação com o backend deve usar o prefixo `/api` (que é redirecionado via proxy no ambiente de desenvolvimento).

**Exemplo de View (`client/src/components/Leaderboard.tsx`):**
```tsx
import { useEffect, useState } from 'react';

interface Player {
  id: string;
  name: string;
  score: number;
}

export function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // Chamada enviada diretamente para o Controller via API
    fetch('/api/game/leaderboard')
      .then((res) => res.json())
      .then((response) => setPlayers(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Placar de Liderança</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.name} - {player.score} pts</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🚀 Como Executar o Projeto

### 1. Instalar Dependências
Na raiz do projeto (`poogame/`):
```bash
npm install
cd client && npm install && cd ..
```

### 2. Rodar em Ambiente de Desenvolvimento
Executa o backend (Express) e o servidor dev do frontend (Vite) com proxy configurado:

**Terminal 1 (Backend Node.js):**
```bash
npm run dev
```

**Terminal 2 (Frontend React):**
```bash
cd client
npm run dev
```

---

## 📦 Build e Produção

Para testar ou rodar a aplicação como um único servidor integrado:

```bash
# Compila o frontend React e o backend TypeScript
npm run build

# Inicia o servidor em produção
npm start
```