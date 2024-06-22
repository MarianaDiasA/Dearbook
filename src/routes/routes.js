const express = require('express');
const router = express.Router();
const controllerAuth = require('../controller/controllerAuth');
const controllerMenu = require('../controller/controllerMenu');
const controllerCad = require('../controller/controllerCadastro');
const controllerEdit = require('../controller/controllerEdit');
const upload = require('../config/multer');

// Autenticação
router.get("/", controllerAuth.login);
router.post("/auth", controllerAuth.validar);
router.get('/cadastro', controllerAuth.cadastro);
router.post('/cadastrousuario', controllerAuth.cadastro_usuario);

// Menu
router.get('/biblioteca', controllerMenu.biblioteca);
router.get('/cadastrar', controllerMenu.cadastrar);
router.get('/sobre', controllerMenu.sobre);
router.get('/sair', controllerMenu.sair);
router.get('/atualizar', controllerMenu.atualizar);

// Cadastro de autor de livro
router.post('/cadastroautor', controllerCad.cadastro_autor);
router.get('/autores', controllerCad.getAutores);
router.get('/livros', controllerCad.getLivros);
router.get('/download/:filename', controllerCad.livroDownload);

// Edição e exclusão de livro
router.post('/editar/:id', controllerEdit.editar_livro);
router.get('/excluir/:id', controllerEdit.excluir);

// Edição de usuario
router.post('/atualizarusr', controllerEdit.editar_usr);

// Cadastro de Livro
router.post('/cadastrolivro', upload.fields([{ name: 'imagemLivro' }, { name: 'pdfLivro' }]), controllerCad.cadastro_livro);

module.exports = router;