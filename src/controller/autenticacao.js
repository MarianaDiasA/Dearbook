const db = require('../config/db');

function auth(email, senha, callback) {
    const sql = 'SELECT * FROM Usuario WHERE email = ? AND senha = ?';
    db.get(sql, [email, senha], (err, row) => {
        if (err) {
            console.error('Erro ao executar consulta:', err);
            return callback(err, null);
        }
        
        callback(null, row); 
    });
}

function existe_usuario(email, callback) {
    const sql = 'SELECT * FROM Usuario WHERE email = ?';
    db.get(sql, [email], (err, row) => {
        if (err) {
            console.error('Erro ao executar consulta:', err);
            return callback(err, null);
        }

        callback(null, row);
    });
}

function cadastro(nome, email, senha, callback) {
    const sql = 'INSERT INTO Usuario(nome, email, senha) VALUES(?, ?, ?)';
    db.run(sql, [nome, email, senha], (err) => {
        if(err) {
            return console.log(err.message); 
        }
        console.log(`Usuario ${nome} cadastrado com sucesso!`);
    })
}

module.exports = {
    auth, existe_usuario, cadastro
};