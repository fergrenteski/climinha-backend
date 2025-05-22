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

## 📌 Observações

* Este projeto usa SQLite para facilitar o desenvolvimento local.
* Para uso em produção, é recomendável trocar para PostgreSQL ou outro SGBD.

## 📄 Licença

MIT