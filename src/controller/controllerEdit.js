const db = require('../config/db');

function editar_livro(req, res) {
    const { nomeLivro, nomeAutor, classificacao, descricao } = req.body;

    const sql = 'UPDATE Livro SET nome = ?, classificacao = ?, descricao = ? WHERE id_livro = ?';
    db.run(sql, [nomeLivro, classificacao, descricao, req.params.id], (err) => {
        if (err) {
            return console.log(err.message);
        }

        console.log(`Livro Atualizado com sucesso!`);

        let atualizado = encodeURIComponent('true');
        res.redirect('/biblioteca?atualizado=' + atualizado)
    })
}

function excluir(req, res) {
    const sql = 'DELETE FROM Livro WHERE id_livro = ?';
    db.run(sql, [req.params.id], (err) => {
        if (err) {
            return console.log(err.message);
        }

        console.log(`Livro excluído com sucesso!`);
        
        let deletado = encodeURIComponent('true');
        res.redirect('/biblioteca?deletado=' + deletado)
    })
}

function editar_usr(req, res) {
    const { nome, senha } = req.body;

    const sql = 'UPDATE Usuario SET nome = ?, senha = ? WHERE id_usuario = ?';
    db.run(sql, [nome, senha, req.session.id_usuario], (err) => {
        if (err) {
            return console.log(err.message);
        }

        console.log(`Usuario atualizado com sucesso!`);

        let atualizado = encodeURIComponent('true');

        req.session.nome = nome;
        res.redirect('/atualizar?atualizado=' + atualizado)
    })
}

module.exports = {
    editar_livro, excluir, editar_usr
}