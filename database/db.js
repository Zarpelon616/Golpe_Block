// CONFIGURAÇÃO DA CONEXÃO COM O BANCO DE DADOS

// Carrega as variáveis de ambiente definidas no arquivo .env
require('dotenv').config();

// Importa a biblioteca SQLite com mensagens detalhadas de erro
const sqlite3 = require('sqlite3').verbose();

// CRIAÇÃO DA CONEXÃO

// Abre a conexão com o banco de dados utilizando o caminho definido na variável DATABASE_URL
const db = new sqlite3.Database(

    process.env.DATABASE_URL,

    (err) => {

        // Executado caso ocorra erro ao abrir o banco
        if (err) {

            console.error(
                'Erro ao conectar ao banco:',
                err.message
            );

        } else {

            // Executado quando a conexão é realizada com sucesso
            console.log(
                'Conectado ao banco SQLite.'
            );

        }

    }

);

// EXPORTAÇÃO DA CONEXÃO

// Disponibiliza a conexão para ser utilizada pelos Models e demais arquivos da aplicação
module.exports = db;

//require('dotenv').config(), carrega as variáveis definidas no arquivo .env para dentro de process.env.
//process.env, objeto do Node.js que armazena variáveis de ambiente da aplicação.
//sqlite3.Database(), abre uma conexão com o banco SQLite. Caso o arquivo não exista, o SQLite pode criá-lo automaticamente.
//.verbose(), faz o SQLite exibir mensagens de erro mais detalhadas, facilitando a depuração durante o desenvolvimento.