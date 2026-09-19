// Importa o framework Express
const express = require('express');

// Cria um Router para organizar as rotas relacionadas aos usuários
const router = express.Router();

// Importa o Controller responsável pelos usuários
const UsuarioController =
    require('../controllers/UsuarioController');

// LISTAR USUÁRIOS
// GET /usuarios
router.get(
    '/',
    UsuarioController.listarUsuarios
);

// LOGIN
// GET /usuarios/login
router.post(
    '/login',
    UsuarioController.login
);

// BUSCAR USUÁRIO POR ID
// GET /usuarios/:id
router.get(
    '/:id',
    UsuarioController.buscarUsuarioPorId
);

// CRIAR USUÁRIO
// POST /usuarios
router.post(
    '/',
    UsuarioController.criarUsuario
);

// Exporta o Router para utilização no servidor
module.exports = router;

