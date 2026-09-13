// Importa o framework Express
const express = require('express');

// Cria um objeto Router para organizar as rotas relacionadas aos comentários
const router = express.Router();

// ROTA DE TESTE
// Utilizada apenas para verificar se o módulo de comentários está conectado corretamente ao servidor.
router.get('/', (req, res) => {

    res.json({
        mensagem: 'Rotas de comentários'
    });

});

// Exporta o Router para utilização no arquivo principal do servidor
module.exports = router;

/*
O Router do Express permite separar as rotas em arquivos diferentes. 
Em vez de colocar todas as rotas dentro do Server.js, cada módulo da aplicação possui suas próprias rotas.

arquivo criado como esqueleto para receber futuramente as rotas de criação, listagem e exclusão de comentários.
*/