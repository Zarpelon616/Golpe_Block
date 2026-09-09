require('dotenv').config();

// Importa o framework Express
const express = require('express');

// Importa o módulo responsável por manipular caminhos de arquivos
const path = require('path');

// Cria a aplicação Express
const app = express();

// Importa as configurações da aplicação
const config = require('./config/app');

// Define a porta utilizada pelo servidor
const PORT = config.PORT;

// Importa as rotas da aplicação
const publicacoesRoutes = require('./routes/publicacoes');

const usuariosRoutes =
    require('./routes/usuarios');

const comentariosRoutes =
    require('./routes/comentarios');

// Middleware responsável por interpretar JSON enviado nas requisições
app.use(express.json());

// Permite servir arquivos estáticos da pasta "public"
// (HTML, CSS, JavaScript e imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Registra as rotas relacionadas às publicações
app.use('/publicacoes', publicacoesRoutes);

// Registra as rotas relacionadas aos usuários
app.use('/usuarios', usuariosRoutes);

// Registra as rotas relacionadas aos comentários
app.use('/comentarios', comentariosRoutes);

// Rota inicial utilizada para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor GolpeBlock funcionando!');
});

// Inicia o servidor na porta configurada
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});