const db = require('../config/db');
const path = require('path');
const fs = require('fs');

function cadastro_autor(req, res) {
    const { nomeAutor, nacionalidadeAutor, dataNascimentoAutor } = req.body;

    const sql = 'INSERT INTO Autor(nome, nacionalidade, data_nascimento) VALUES(?, ?, ?)';
    db.run(sql, [nomeAutor, nacionalidadeAutor, dataNascimentoAutor], (err) => {
        if (err) {
            return console.log(err.message);
        }

        console.log(`Autor ${nomeAutor} cadastrado com sucesso!`);
        let cadastrado = encodeURIComponent('true');
        res.redirect('/cadastrar?cadastrado=' + cadastrado)
    })
}

function getAutores(req, res) {
    let sql = 'SELECT nome FROM Autor';
    db.all(sql, (err, rows) => {
        if (err) {
            console.error('Erro ao buscar autores:', err);
            res.status(500).send('Erro ao buscar autores do banco de dados.');
            return;
        }

        let nomesAutores = rows.map(row => row.nome);
        res.send(nomesAutores);
    });
}


function cadastro_livro(req, res) {

    const { autorLivro, nomeLivro, classificacaoLivro, descricaoLivro } = req.body;
    const imagemLivro = req.files['imagemLivro'][0].filename;
    const pdfLivro = req.files['pdfLivro'][0].filename;

    getAutor(autorLivro, (err, autor) => {
        if (err) {
            console.error('Erro ao buscar autor:', err);
            res.status(500).send('Erro ao buscar autor.');
            return;
        }

        if (!autor) {
            console.error('Autor não encontrado:', autorLivro);
            res.status(404).send('Autor não encontrado.');
            return;
        }

        db.run('INSERT INTO Livro (id_autor, nome, classificacao, descricao, imagem, pdf) VALUES (?, ?, ?, ?, ?, ?)',
            [autor.id_autor, nomeLivro, classificacaoLivro, descricaoLivro, imagemLivro, pdfLivro], function (err) {
                if (err) {
                    console.error('Erro ao cadastrar livro:', err.message);
                    res.status(500).send('Erro ao cadastrar livro.');
                    return;
                }
                console.log('Livro cadastrado com sucesso:', this.lastID);

                let cadastrado = encodeURIComponent('true');
                res.redirect('/cadastrar?cadastrado=' + cadastrado);
            });
    });
}

function getAutor(nomeAutor, callback) {
    db.get('SELECT id_autor FROM Autor WHERE nome = ?', [nomeAutor], (err, row) => {
        if (err) {
            console.error('Erro ao buscar autor:', err);
            callback(err, null);
            return;
        }
        callback(null, row);
    });
}

function getLivros(req, res) {
    let sql = `
        SELECT 
            lv.id_livro id,
            lv.nome nomeLivro,
            au.nome nomeAutor,
            lv.classificacao,
            lv.descricao,
            lv.pdf arquivoPDF
        FROM 
            Livro lv 
            INNER JOIN Autor au 
            ON lv.id_autor = au.id_autor `;
    db.all(sql, (err, rows) => {
        if (err) {
            console.error('Erro ao buscar os livros:', err);
            res.status(500).send('Erro ao buscar livros do banco de dados.');
            return;
        }

        res.json(rows);
    });
}

function livroDownload(req, res) {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../../database/uploads', filename);

    if (fs.existsSync(filePath)) {
        res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-Type', 'application/pdf');

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } else {
        res.status(404).send('Arquivo não encontrado');
    }
}

module.exports = {
    cadastro_autor, getAutores, cadastro_livro, getLivros, livroDownload
}