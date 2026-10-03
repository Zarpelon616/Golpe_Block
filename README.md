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
│   └── app.js
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
│   ├── css/
│     ├── cadastro.css
│     ├── login.css
│     ├── publicacao.css
│     └── style.css
│   ├── js/
│     ├── cadastro.js
│     ├── login.js
│     ├── main.js
│     └──publicacao.js
│   ├── cadastro.html
│   ├── index.html
│   ├── login.html
│   └── publicacao.html
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

* Estrutura completa em arquitetura MVC
* Front-end desenvolvido em HTML, CSS e JavaScript
* Back-end em Node.js e Express
* Banco de dados SQLite integrado ao Prisma ORM
* Sistema de migrations
* Sistema de rotas
* Integração completa entre Front-end e Back-end
* Controle de acesso por autenticação
* Interface funcional para usuários

### Usuários

* Cadastro de usuários
* Login de usuários
* Armazenamento de sessão local via LocalStorage
* Proteção de páginas para usuários não autenticados
* Logout

### Publicações

* Criação de publicações 
* Listagem de publicações 
* Consulta de publicação por ID
* Pesquisa de publicações por palavras-chave
* Exclusão de publicações 
* Visualização individual de publicações

### Comentários

* Criação de comentários 
* Listagem de comentários por publicação 
* Exclusão de comentários 

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

#### Busca por ID
```
GET /usuarios/:id
```

#### Login
```
POST /usuarios/login
```

Exemplo:

```json
{
  "email": "teste@teste.com",
  "senhaHash": "123456"
}
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

* Edição de publicações
* Edição de comentários
* Sistema de categorias
* Sistema de reputação
* Recuperação de senha
* Melhorias de usabilidade e interface

---

## Status do Projeto

Em desenvolvimento.

### Versão Atual

1.1 – MVP Funcional Concluído implantado disponivel para acesso publico

### Concluído

* Estrutura MVC
* SQLite integrado
* Prisma ORM configurado
* Sistema de migrations

#### Usuários

* Cadastro
* Login
* Logout
* Proteção de paginas

#### Publicações

* Criação
* Listagem
* Busca por ID
* Pesquisa
* Visualização individual
* Exclusão

#### Comentários

* Criação
* Listagem por publicação
* Exclusão

#### Interface

* Tela de Login
* Tela de Cadastro
* Página Inicial
* Página de Publicação
* Menu lateral do usuário
* Modal para criação de publicações

#### Banco de Dados

* Relacionamentos implementados
* Cascade Delete configurado

### Em desenvolvimento

* Possiveis Funcionalidades e Melhorias futuras

## Deploy

O projeto encontra-se hospedado e disponível publicamente através da plataforma Render.

### Aplicação Online

https://golpe-block.onrender.com

### Tecnologias utilizadas no deploy

* Render (Hospedagem)
* Node.js
* Express
* Prisma ORM
* SQLite

O deploy é realizado automaticamente a partir do repositório GitHub através da integração contínua disponibilizada pela plataforma Render.


### Link do Video apresentando o projeto

https://youtu.be/XavBVHlfn7M

O video está como não listado no youtube acessivel apenas pelo link