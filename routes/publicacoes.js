// Importa o framework Express
const express = require('express');

// Cria uma instância do Router responsável pelas rotas de publicações
const router = express.Router();

// Importa o Controller responsável pela lógica das publicações
const PublicacaoController =
    require('../controllers/PublicacaoController');

// CRIAR PUBLICAÇÃO

// POST /publicacoes
// Recebe os dados enviados pelo cliente e solicita ao Controller a criação de uma nova publicação.
router.post(
    '/',
    PublicacaoController.criarPublicacao
);

// LISTAR PUBLICAÇÕES

// GET /publicacoes
// Retorna todas as publicações cadastradas no sistema.
router.get(
    '/',
    PublicacaoController.listarPublicacoes
);

// BUSCAR PUBLICAÇÃO POR ID
// GET /publicacoes/:id
// Retorna uma publicação específica a partir do ID informado na URL.
router.get(
    '/:id',//comentario abaixo
    PublicacaoController.buscarPublicacaoPorId
);

// Exporta o Router para utilização
// no arquivo principal do servidor
module.exports = router;

/* 
Esse arquivo concentra as rotas relacionadas às publicações.
Ele recebe as requisições HTTP e encaminha cada uma para o método adequado do Controller.
:id é um parâmetro de rota.
*/