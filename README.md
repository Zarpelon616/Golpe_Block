# Golpe Block

## Descrição

O Golpe Block é uma plataforma web colaborativa voltada ao compartilhamento de informações sobre golpes e fraudes digitais.

A proposta é permitir que usuários publiquem relatos, alertas e experiências relacionadas a golpes, enquanto outros usuários podem complementar as informações por meio de comentários.

O projeto está sendo desenvolvido como um MVP (Minimum Viable Product), priorizando simplicidade, anonimato dos usuários e validação das funcionalidades principais.

---

## Objetivo

Criar um ambiente simples onde pessoas possam compartilhar informações sobre golpes e consultar experiências de outros usuários, contribuindo para a conscientização e prevenção de fraudes.

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
│
├── config/
├── controllers/
├── database/
├── models/
├── public/
├── routes/
│
├── Server.js
├── package.json
├── package-lock.json
└── .gitignore
```

---

## Funcionalidades Implementadas

Atualmente o projeto possui:

* Estrutura inicial do servidor Node.js
* Integração com Express
* Banco de dados SQLite
* Criação automática das tabelas
* Sistema de rotas
* Estrutura MVC inicial
* Listagem de publicações
* Criação de publicações
* Consulta de publicação por ID

---

## Banco de Dados

O sistema utiliza SQLite.

Tabelas atualmente implementadas:

### usuarios

* id
* email
* senhaHash
* dataCadastro

### publicacoes

* id
* titulo
* conteudo
* dataCriacao
* autorId

### comentarios

* id
* conteudo
* dataCriacao
* autorId
* publicacaoId

---

## Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Zarpelon616/Golpe_Block.git
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Criar o banco de dados

```bash
node database/setup.js
```

### 4. Executar o servidor

```bash
npm run dev
```

### 5. Acessar a aplicação

```text
http://localhost:3000
```

---

## Próximas Funcionalidades

* Exclusão de publicações
* Sistema de comentários
* Cadastro de usuários
* Login e autenticação
* Interface web completa
* Pesquisa de publicações
* Perfil do usuário

---

## Status do Projeto

Em desenvolvimento.
Versão atual: 0.1 – Fundação do Projeto.
