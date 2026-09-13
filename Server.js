// CARREGA AS CONFIGURAÇÕES INICIAIS

// Carrega as variáveis de ambiente definidas no arquivo .env
require('dotenv').config();

// IMPORTAÇÃO DAS DEPENDÊNCIAS

// Framework utilizado para criação do servidor e rotas
const express = require('express');

// Módulo nativo do Node.js para manipulação de caminhos
const path = require('path');

// CRIAÇÃO DA APLICAÇÃO

// Cria uma instância da aplicação Express
const app = express();

// Importa as configurações gerais da aplicação
const config = require('./config/app');

// Obtém a porta definida nas configurações
const PORT = config.PORT;

// IMPORTAÇÃO DAS ROTAS

// Rotas responsáveis pelas publicações
const publicacoesRoutes = require('./routes/publicacoes');

// Rotas responsáveis pelos usuários
const usuariosRoutes = require('./routes/usuarios');

// Rotas responsáveis pelos comentários
const comentariosRoutes = require('./routes/comentarios');

// MIDDLEWARES

// Converte automaticamente dados JSON enviados pelo cliente em objetos JavaScript acessíveis através de req.body
app.use(express.json());

// Permite o acesso aos arquivos estáticos da pasta 'public' como HTML, CSS, JavaScript e imagens
app.use(express.static(path.join(__dirname, 'public')));

// REGISTRO DAS ROTAS

// Todas as requisições iniciadas por '/publicacoes' serão encaminhadas para o arquivo de rotas correspondente
app.use('/publicacoes', publicacoesRoutes);

// Todas as requisições iniciadas por "/usuarios" serão encaminhadas para as rotas de usuários
app.use('/usuarios', usuariosRoutes);

// Todas as requisições iniciadas por "/comentarios" serão encaminhadas para as rotas de comentários
app.use('/comentarios', comentariosRoutes);

// ROTA PRINCIPAL

// Utilizada para verificar rapidamente se o servidor está ativo
app.get('/', (req, res) => {
    res.send('Servidor GolpeBlock funcionando!');
});

// INICIALIZAÇÃO DO SERVIDOR

// Inicia o servidor e fica aguardando requisições na porta configurada
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

/* 
Express é um framework para Node.js que facilita a criação de servidores web, rotas e APIs.

Middleware é uma função executada durante o processamento da requisição. Nesse caso, ele converte JSON recebido em objetos JavaScript.

app.use() associa um conjunto de rotas a um caminho específico da aplicação.

app.listen() coloca o servidor em execução e faz com que ele fique aguardando requisições na porta configurada.
*/