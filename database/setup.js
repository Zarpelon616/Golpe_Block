// Importa a biblioteca SQLite e habilita mensagens detalhadas de erro
const sqlite3 = require('sqlite3').verbose();

// Cria ou abre o banco de dados do projeto
const db = new sqlite3.Database('./database/golpeblock.db');

// Executa os comandos SQL em sequência
db.serialize(() => {

    console.log('Criando tabelas...');

    // ==========================
    // TABELA DE USUÁRIOS
    // ==========================
    // Armazena os dados utilizados para autenticação
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            senhaHash TEXT NOT NULL,
            dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // ==========================
    // TABELA DE PUBLICAÇÕES
    // ==========================
    // Armazena os relatos e alertas publicados pelos usuários
    db.run(`
        CREATE TABLE IF NOT EXISTS publicacoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            conteudo TEXT NOT NULL,
            dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
            autorId INTEGER NOT NULL,

            -- Relaciona a publicação ao usuário que a criou
            FOREIGN KEY (autorId) REFERENCES usuarios(id)
        )
    `);

    // ==========================
    // TABELA DE COMENTÁRIOS
    // ==========================
    // Armazena comentários realizados em publicações
    db.run(`
        CREATE TABLE IF NOT EXISTS comentarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            conteudo TEXT NOT NULL,
            dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
            autorId INTEGER NOT NULL,
            publicacaoId INTEGER NOT NULL,

            -- Usuário responsável pelo comentário
            FOREIGN KEY (autorId) REFERENCES usuarios(id),

            -- Publicação na qual o comentário foi realizado
            FOREIGN KEY (publicacaoId) REFERENCES publicacoes(id)
        )
    `);

});

// Encerra a conexão após a criação das tabelas
db.close(() => {
    console.log('Banco configurado com sucesso.');
});