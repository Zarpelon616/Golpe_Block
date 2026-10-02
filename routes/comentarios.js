// Importa o framework Express utilizado para criação das rotas.
const express = require('express');

// Cria um objeto Router para organizar as rotas relacionadas aos comentários
const router = express.Router();

// Importa o Controller responsável pelas operações de comentários.
const ComentarioController =
    require('../controllers/ComentarioController');

// LISTAR COMENTÁRIOS DE UMA PUBLICAÇÃO
/*
Exemplo:
GET /comentarios/publicacao/1

Retorna todos os comentários associados
à publicação informada.
*/
router.get(
    '/publicacao/:publicacaoId',
    ComentarioController.listarComentariosPorPublicacao
);

// CRIAR COMENTÁRIO
/*
Exemplo:
POST /comentarios

Cria um novo comentário.
*/
router.post(
    '/',
    ComentarioController.criarComentario
);

// EXCLUIR COMENTÁRIO
/*
Exemplo:
DELETE /comentarios/1

Remove o comentário correspondente ao ID informado.
*/
router.delete(
    '/:id',
    ComentarioController.excluirComentario
);

// Exporta o Router para utilização no servidor principal.
module.exports = router;

/*
Arquivo responsável por registrar as rotas relacionadas
à entidade Comentário.

Rotas disponíveis:

GET /comentarios/publicacao/:publicacaoId
- Lista os comentários de uma publicação.

POST /comentarios
- Cria um novo comentário.

DELETE /comentarios/:id
- Exclui um comentário existente.

As rotas apenas encaminham as requisições para o
ComentarioController, responsável pelas validações
e regras de negócio.
*/