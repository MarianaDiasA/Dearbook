const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/db.sqlite');

const fs = require('fs');
const path = require('path');
const sqlFilePath = path.join(__dirname, '../../database/dump.sql'); 

fs.readFile(sqlFilePath, 'utf8', (err, sql) => {
    if (err) {
        console.error('Erro ao ler o arquivo SQL:', err.message);
        throw err; 
    }
    
    db.exec(sql, function(err) {
        if (err) {
            console.error('Erro ao executar o script SQL:', err.message);
            throw err; 
        } else {
            console.log('Script SQL executado com sucesso.');
        }
    });
});

module.exports = db;
