// Importa o framework Express
const express = require('express');

// Cria um objeto Router para organizar as rotas relacionadas aos comentários
const router = express.Router();

// Importa o Controller de comentários
const ComentarioController =
    require('../controllers/ComentarioController');

// LISTAR COMENTÁRIOS DE UMA PUBLICAÇÃO
// Exemplo:
// GET /comentarios/publicacao/1
router.get(
    '/publicacao/:publicacaoId',
    ComentarioController.listarComentariosPorPublicacao
);

// CRIAR COMENTÁRIO
// Exemplo:
// POST /comentarios
router.post(
    '/',
    ComentarioController.criarComentario
);

// EXCLUIR COMENTÁRIO
// Exemplo:
// DELETE /comentarios/1
router.delete(
    '/:id',
    ComentarioController.excluirComentario
);

// Exporta o Router para utilização no arquivo principal do servidor
module.exports = router;

/*
Rotas responsáveis pelas operações da entidade Comentário.

GET /comentarios/publicacao/:publicacaoId
- Lista os comentários de uma publicação.

POST /comentarios
- Cria um novo comentário.
*/