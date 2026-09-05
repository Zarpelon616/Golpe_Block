const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        mensagem: 'Rotas de comentários'
    });
});

module.exports = router;