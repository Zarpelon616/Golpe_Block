require('dotenv').config();

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(
    process.env.DATABASE_URL,
    (err) => {

        if (err) {

            console.error(
                'Erro ao conectar ao banco:',
                err.message
            );

        } else {

            console.log(
                'Conectado ao banco SQLite.'
            );

        }

    }
);

module.exports = db;