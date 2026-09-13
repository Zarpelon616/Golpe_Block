// CONFIGURAÇÃO INICIAL DO BANCO DE DADOS

// Importa a biblioteca SQLite com mensagens detalhadas de erro
const sqlite3 = require('sqlite3').verbose();

// Cria ou abre o arquivo do banco de dados.
// Caso o arquivo não exista, ele será criado automaticamente.
const db = new sqlite3.Database('./database/golpeblock.db');

// CRIAÇÃO DAS TABELAS

// O método serialize() garante que os comandos SQL sejam executados em sequência.
db.serialize(() => {

    console.log('Criando tabelas...');

    // TABELA: usuarios
    // Armazena os dados dos usuários cadastrados no sistema.
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            email TEXT NOT NULL UNIQUE,

            senhaHash TEXT NOT NULL,

            dataCadastro DATETIME
            DEFAULT CURRENT_TIMESTAMP

        )
    `);

    // TABELA: publicacoes
    // Armazena relatos, alertas e informações compartilhadas pelos usuários.
    db.run(`
        CREATE TABLE IF NOT EXISTS publicacoes (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            titulo TEXT NOT NULL,

            conteudo TEXT NOT NULL,

            dataCriacao DATETIME
            DEFAULT CURRENT_TIMESTAMP,

            autorId INTEGER NOT NULL,

            -- Relaciona a publicação ao usuário autor
            FOREIGN KEY (autorId)
            REFERENCES usuarios(id)

        )
    `);

    // TABELA: comentarios
    // Armazena comentários realizados em publicações.
    db.run(`
        CREATE TABLE IF NOT EXISTS comentarios (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            conteudo TEXT NOT NULL,

            dataCriacao DATETIME
            DEFAULT CURRENT_TIMESTAMP,

            autorId INTEGER NOT NULL,

            publicacaoId INTEGER NOT NULL,

            -- Usuário responsável pelo comentário
            FOREIGN KEY (autorId)
            REFERENCES usuarios(id),

            -- Publicação associada ao comentário
            FOREIGN KEY (publicacaoId)
            REFERENCES publicacoes(id)

        )
    `);

});

// ENCERRAMENTO DA CONEXÃO
// Após criar as tabelas, a conexão é encerrada.
db.close(() => {
    console.log('Banco configurado com sucesso.');
});

/*
db.serialize(), garante que os comandos SQL sejam executados na ordem em que foram escritos, 
evitando que uma tabela tente ser criada antes de outra necessária.

CREATE TABLE IF NOT EXISTS cria a tabela apenas se ela ainda não existir. Se ela já existir, 
o comando é ignorado e nenhum erro ocorre.

PRIMARY KEY AUTOINCREMENT, define o identificador único da tabela. O SQLite gera automaticamente os valores 1, 2, 3, 4...

NOT NULL, campo é obrigatório e não pode ficar vazio.

UNIQUE, impede que dois usuários possuam o mesmo e-mail.

CURRENT_TIMESTAMP, registra automaticamente a data e hora atuais quando o registro é criado.

Foreign Key, cria um relacionamento entre tabelas. Nesse caso, a publicação passa a estar associada a um usuário existente
*/