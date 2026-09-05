const db = require('./db');

db.run(
    `
    INSERT INTO usuarios (email, senhaHash)
    VALUES (?, ?)
    `,
    [
        'teste@golpeblock.com',
        'senha_teste'
    ],
    function(err) {

        if (err) {
            return console.error(err.message);
        }

        console.log('Usuário criado.');
        console.log('ID:', this.lastID);

        db.close();
    }
);