// Importa o Express
const express = require('express');

// Cria uma instância do roteador
const router = express.Router();

// Importa o Controller responsável pelas publicações
const PublicacaoController =
    require('../controllers/PublicacaoController');

// Rota responsável por criar uma nova publicação
// POST /publicacoes
router.post(
    '/',
    PublicacaoController.criarPublicacao
);

// Rota responsável por listar todas as publicações
// GET /publicacoes
router.get(
    '/',
    PublicacaoController.listarPublicacoes
);

router.get(
    '/:id',
    PublicacaoController.buscarPublicacaoPorId
);

// Disponibiliza as rotas para utilização no servidor
module.exports = router;