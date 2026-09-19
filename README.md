# Golpe Block

## Descrição

O Golpe Block é uma plataforma web colaborativa voltada ao compartilhamento de informações sobre golpes e fraudes digitais.

A proposta é permitir que usuários publiquem relatos, alertas e experiências relacionadas a golpes, enquanto outros usuários possam consultar essas informações e contribuir para a conscientização e prevenção de fraudes.

O projeto está sendo desenvolvido como um MVP (Minimum Viable Product), priorizando simplicidade, anonimato dos usuários e validação das funcionalidades principais.

---

## Objetivo

Criar um ambiente simples onde pessoas possam compartilhar informações sobre golpes e consultar experiências de outros usuários, contribuindo para a conscientização e prevenção de fraudes digitais.

---

## Tecnologias Utilizadas

### Front-end

* HTML
* CSS
* JavaScript

### Back-end

* Node.js
* Express

### Banco de Dados

* SQLite
* Prisma ORM

### Dependências

* Express → Framework responsável pelo servidor web e gerenciamento de rotas.
* Prisma ORM → Camada de acesso ao banco de dados.
* @prisma/client → Cliente utilizado pela aplicação para comunicação com o banco.
* SQLite3 → Banco de dados utilizado pelo projeto.
* Dotenv → Carregamento de variáveis de ambiente através do arquivo `.env`.

### Dependências de Desenvolvimento

* Nodemon → Reinicia automaticamente o servidor durante o desenvolvimento.
* Prisma CLI → Gerenciamento de migrations e geração do cliente Prisma.

---

## Arquitetura

O projeto segue o padrão arquitetural MVC (Model-View-Controller).

### Model

Responsável pelo acesso e manipulação dos dados armazenados no banco.

### View

Responsável pela interface apresentada ao usuário.

### Controller

Responsável pela lógica da aplicação, validações e comunicação entre Views e Models.

---

## Estrutura Atual do Projeto

```text
GolpeBlock/

├── .agents/
├── .claude/
├── .windsurf/
│
├── config/
│
├── controllers/
│   ├── ComentarioController.js
│   ├── PublicacaoController.js
│   └── UsuarioController.js
│
├── database/
│   ├── golpeblock.db
│   ├── prisma.js
│   └── testePrisma.js
│
├── models/
│   ├── comentario.js
│   ├── publicacao.js
│   └── usuario.js
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── public/
│
├── routes/
│   ├── comentarios.js
│   ├── publicacoes.js
│   └── usuarios.js
│
├── .env
├── .env.example
├── .gitignore
├── CONVENCOES.md
├── package.json
├── package-lock.json
├── README.md
├── Server.js
└── skills-lock.json
```

---

## Funcionalidades Implementadas

Atualmente o projeto possui:

* Estrutura inicial do servidor Node.js
* Integração com Express
* Arquitetura MVC
* Banco de dados SQLite
* Prisma ORM configurado
* Sistema de migrations
* Sistema de rotas

### Usuários

* Cadastro de usuários via API
* Listagem de usuários via API

### Publicações

* Criação de publicações via API
* Listagem de publicações via API
* Consulta de publicação por ID
* Pesquisa de publicações por título via API
* Exclusão de publicações via API

### Comentários

* Criação de comentários via API
* Listagem de comentários por publicação via API
* Exclusão de comentários via API

### Relacionamentos

* Relacionamento entre usuários, publicações e comentários
* Exclusão em cascata (Cascade Delete) de comentários ao excluir uma publicação

---

## Banco de Dados

O banco de dados é gerenciado pelo Prisma ORM através do arquivo:

```text
prisma/schema.prisma
```

As alterações de estrutura são controladas por migrations armazenadas em:

```text
prisma/migrations/
```

### Tabela: usuarios

* id
* email
* senhaHash
* dataCadastro

### Tabela: publicacoes

* id
* titulo
* conteudo
* dataCriacao
* autorId

### Tabela: comentarios

* id
* conteudo
* dataCriacao
* autorId
* publicacaoId

### Relacionamentos

* Um usuário pode criar várias publicações.
* Um usuário pode criar vários comentários.
* Uma publicação pode possuir vários comentários.
* Ao excluir uma publicação, seus comentários são removidos automaticamente (Cascade Delete).

---

## Variáveis de Ambiente

Criar um arquivo `.env` na raiz do projeto seguindo o modelo do arquivo `.env.example`.

Exemplo:

```env
PORT=3000
DATABASE_URL="file:../database/golpeblock.db"
```

---

## Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Zarpelon616/Golpe_Block.git
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Aplicar as migrations do banco

```bash
npx prisma migrate dev
```

### 4. Gerar o cliente Prisma

```bash
npx prisma generate
```

### 5. Executar o servidor

```bash
npm run dev
```

### 6. Acessar a aplicação

```text
http://localhost:3000
```

---

## Endpoints Atualmente Disponíveis

### Usuários

#### Listar usuários

```http
GET /usuarios
```

#### Criar usuário

```http
POST /usuarios
```

Exemplo:

```json
{
  "email": "teste@teste.com",
  "senhaHash": "123456"
}
```

---

### Publicações

#### Listar publicações

```http
GET /publicacoes
```

#### Pesquisar publicações por título

```http
GET /publicacoes/busca?q=termo
```

Exemplo:

```http
GET /publicacoes/busca?q=pix
```

#### Buscar publicação por ID

```http
GET /publicacoes/:id
```

#### Criar publicação

```http
POST /publicacoes
```

Exemplo:

```json
{
  "titulo": "Título de teste",
  "conteudo": "Conteúdo da publicação",
  "autorId": 1
}
```

#### Excluir publicação

```http
DELETE /publicacoes/:id
```

---

### Comentários

#### Criar comentário

```http
POST /comentarios
```

Exemplo:

```json
{
  "conteudo": "Comentário de teste",
  "autorId": 1,
  "publicacaoId": 1
}
```

#### Listar comentários de uma publicação

```http
GET /comentarios/publicacao/:publicacaoId
```

#### Excluir comentário

```http
DELETE /comentarios/:id
```

---

## Próximas Funcionalidades

* Login e autenticação
* Controle de sessão
* Perfil de usuário
* Interface web completa

---

## Status do Projeto

Em desenvolvimento.

### Versão Atual

**0.8 – Sistema de pesquisa de publicações implementado**

### Concluído

* Estrutura MVC
* SQLite integrado
* Prisma ORM configurado
* Sistema de migrations

#### Usuários

* Cadastro
* Listagem

#### Publicações

* Criação
* Listagem
* Busca por ID
* Pesquisa por título
* Exclusão

#### Comentários

* Criação
* Listagem por publicação
* Exclusão

#### Banco de Dados

* Relacionamentos implementados
* Cascade Delete configurado

### Em desenvolvimento

* Login e Autenticação
* Controle de sessão
* Perfil de usuário
* Interface web
