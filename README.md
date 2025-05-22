# 🌤️ Climinha Backend

API backend simples para coleta e armazenamento de dados climáticos, utilizando [Prisma](https://www.prisma.io/) e SQLite. Ideal para projetos com dispositivos IoT como ESP32 que enviam dados periódicos de temperatura, umidade, entre outros.

## 🚀 Tecnologias Utilizadas

* Node.js
* TypeScript
* Express.js
* Prisma ORM
* SQLite

## 📦 Requisitos

* Node.js v18+
* npm ou yarn

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL="file:./database/dev.db"
PORT=3000
```

## 📥 Instalação

```bash
git clone https://github.com/fergrenteski/climinha-backend.git
cd climinha-backend
npm install
```

## 🛠️ Setup do Banco de Dados

```bash
npx prisma migrate dev --name init
```

> Isso irá criar o banco de dados `dev.db` e aplicar as migrações iniciais.

## ▶️ Rodando o Servidor

```bash
npm run dev
```

A API estará disponível em: [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura (exemplo)

```
climinha-backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── database.ts
│   ├── routes.ts
│   └── server.ts
├── .env
├── package.json
└── README.md
```

## 📡 Rotas da API

### `GET /leituras`

Retorna todas as leituras registradas.

#### Exemplo:

```http request
GET /leituras HTTP/1.1
Host: localhost:3000
```

#### Resposta:

```json
[
  {
    "timestamp": "2025-05-24T14:32:05.000Z",
    "temp": 21.1
  },
  "..."
]
```

---

### `POST /leituras`

Recebe um array de leituras de temperatura.

#### Exemplo:

```http request
POST /leituras HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```
#### Body:
```json
{
  "leituras": [
    { "timestamp": "2025-05-24T14:32:05Z", "temp": 21.1 },
    { "timestamp": "2025-05-24T14:32:10Z", "temp": 20.1 },
    { "timestamp": "2025-05-24T14:32:15Z", "temp": 22.1 },
    { "timestamp": "2025-05-24T14:32:20Z", "temp": 23.1 },
    { "timestamp": "2025-05-24T14:32:25Z", "temp": 25.1 },
    { "timestamp": "2025-05-24T14:32:30Z", "temp": 18.1 }
  ]
}
```

#### Resposta:

```json
{
  "message": "Leituras salvas com sucesso!",
  "validCount": 6
}
```

## 📌 Observações

* Este projeto usa SQLite para facilitar o desenvolvimento local.
* Para uso em produção, é recomendável trocar para PostgreSQL ou outro SGBD.

## 📄 Licença

MIT