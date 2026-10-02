// Importa o framework Express utilizado para criação das rotas.
const express = require('express');

// Cria um Router para organizar as rotas relacionadas aos usuários.
const router = express.Router();

// Importa o Controller responsável pelas operações de usuários.
const UsuarioController =
    require('../controllers/UsuarioController');

// LISTAR USUÁRIOS
/*
GET /usuarios

Retorna todos os usuários cadastrados.
*/
router.get(
    '/',
    UsuarioController.listarUsuarios
);

// LOGIN
/*
POST /usuarios/login

Realiza a autenticação do usuário
utilizando e-mail e senha.
*/
router.post(
    '/login',
    UsuarioController.login
);

// BUSCAR USUÁRIO POR ID
/*
GET /usuarios/:id

Retorna um usuário específico
a partir do ID informado.
*/
router.get(
    '/:id',
    UsuarioController.buscarUsuarioPorId
);

// CRIAR USUÁRIO
/*
POST /usuarios

Cria um novo usuário.
*/

router.post(
    '/',
    UsuarioController.criarUsuario
);

// Exporta o Router para utilização no servidor principal.
module.exports = router;

/*
Arquivo responsável por registrar as rotas relacionadas
à entidade Usuário.

Rotas disponíveis:

GET /usuarios
- Lista todos os usuários cadastrados.

POST /usuarios/login
- Realiza a autenticação de um usuário.

GET /usuarios/:id
- Busca um usuário específico pelo ID.

POST /usuarios
- Cria um novo usuário.

As rotas apenas encaminham as requisições para o
UsuarioController, responsável pelas validações
e regras de negócio.
*/