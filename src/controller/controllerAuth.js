const fun_auth = require('./autenticacao');

function login(req, res) {
    res.render("login.html", req.query);
}

function validar(req, res) {
    const { email, senha } = req.body;
    console.log('Login solicitado.');

    fun_auth.auth(email, senha, (err, user) => {
        if (err) {
            console.error('Erro ao tentar realizar login:', err.message);
            res.status(500).send('Erro interno ao tentar fazer login');
            return;
        }

        if (!user) {
            let invalido = true;
            res.render('login.html', { invalido });
            return;
        }
        req.session.loggedin = true;
        req.session.nome = user.nome;
        req.session.id_usuario = user.id_usuario;

        console.log('Login realizado.')
        res.redirect('/biblioteca');
    });
}

function cadastro(req, res) {
    res.render('cadastro.html', req.query);
}

function cadastro_usuario(req, res) {
    fun_auth.existe_usuario(req.body.email, (err, user) => {
        if (user) {
            let existe_usr = encodeURIComponent('true');
            res.redirect('/cadastro?existe=' + existe_usr)
        }
        else {
            fun_auth.cadastro(req.body.nome, req.body.email, req.body.senha, (err) => {
                if (err) {
                    let erro_banco = encodeURIComponent('true');
                    res.redirect('/cadastro?erro_banco=' + erro_banco)
                }
            });

            let cadastrado = encodeURIComponent('true');
            res.redirect('/?cadastrado=' + cadastrado)
        }
    })
}


module.exports = {
    login, validar, cadastro, cadastro_usuario
}