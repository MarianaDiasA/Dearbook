

function biblioteca(req, res) {
    if (req.session.loggedin) {
        res.render('biblioteca', {
            query: req.query,
            nome: req.session.nome.charAt(0).toUpperCase() + req.session.nome.slice(1),
            atualizado: req.query.atualizado === 'true',
            deletado: req.query.deletado === 'true'
        });
    } else {
        let nao_logado = encodeURIComponent('true');
        res.redirect('/?nao_logado=' + nao_logado);
    }
}

function cadastrar(req, res) {
    if (req.session.loggedin) {
        res.render('cadastrar.html', req.query);
    } else {
        let nao_logado = encodeURIComponent('true');
        res.redirect('/?nao_logado=' + nao_logado);
    }
}

function sobre(req, res) {
    if (req.session.loggedin) {
        res.render('sobre.html');
    } else {
        let nao_logado = encodeURIComponent('true');
        res.redirect('/?nao_logado=' + nao_logado);
    }
}

function atualizar(req, res) {
    if (req.session.loggedin) {
        res.render('atualizar.html', req.query);
    } else {
        let nao_logado = encodeURIComponent('true');
        res.redirect('/?nao_logado=' + nao_logado);
    }
}

function sair(req, res) {
    req.session.loggedin = false;
    res.redirect('/');
}

module.exports = {
    biblioteca, cadastrar, sobre, atualizar, sair
}