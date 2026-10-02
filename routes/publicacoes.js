// Importa o framework Express utilizado para criação das rotas.
const express = require('express');

// Cria uma instância do Router responsável pelas rotas de publicações
const router = express.Router();

// Importa o Controller responsável pela lógica das publicações
const PublicacaoController =
    require('../controllers/PublicacaoController');

// CRIAR PUBLICAÇÃO
/*
POST /publicacoes

Recebe os dados enviados pelo cliente
e solicita ao Controller a criação de uma nova publicação.
*/
router.post(
    '/',
    PublicacaoController.criarPublicacao
);

// LISTAR PUBLICAÇÕES
/*
GET /publicacoes

Retorna todas as publicações cadastradas no sistema.
*/
router.get(
    '/',
    PublicacaoController.listarPublicacoes
);

// BUSCAR PUBLICAÇÕES POR TÍTULO
/*
Exemplo:
GET /publicacoes/busca?q=pix

Realiza uma pesquisa de publicações
utilizando um termo informado pelo usuário.
*/
router.get(
    '/busca',
    PublicacaoController.buscarPublicacoesPorTitulo
);

// BUSCAR PUBLICAÇÃO POR ID
/*
GET /publicacoes/:id

Retorna uma publicação específica
a partir do ID informado na URL.
*/
router.get(
    '/:id',//comentario abaixo
    PublicacaoController.buscarPublicacaoPorId
);

// EXCLUIR PUBLICAÇÃO
/*
DELETE /publicacoes/:id

Remove uma publicação existente.
*/
router.delete(

    '/:id',

    PublicacaoController.excluirPublicacao

);

// Exporta o Router para utilização no servidor principal.
module.exports = router;

/*
Arquivo responsável por registrar as rotas relacionadas
à entidade Publicação.

Rotas disponíveis:

POST /publicacoes
- Cria uma nova publicação.

GET /publicacoes
- Lista todas as publicações cadastradas.

GET /publicacoes/busca?q=termo
- Pesquisa publicações pelo título.

GET /publicacoes/:id
- Busca uma publicação específica.

DELETE /publicacoes/:id
- Exclui uma publicação.

As rotas apenas encaminham as requisições para o
PublicacaoController, responsável pelas validações
e regras de negócio.
*/