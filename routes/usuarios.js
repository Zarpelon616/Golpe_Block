// Importa o framework Express
const express = require('express');

// Cria um Router para organizar as rotas relacionadas aos usuários
const router = express.Router();

// ROTA DE TESTE

// Utilizada para verificar se o módulo de usuários está conectado corretamente ao servidor.
router.get('/', (req, res) => {

    res.json({
        mensagem: 'Rotas de usuários'
    });

});

// Exporta o Router para utilização no arquivo principal do servidor
module.exports = router;