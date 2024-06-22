const express = require('express');
const session = require('express-session');
const mustache = require('mustache-express');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.engine("html", mustache());
app.set("view engine", "html");
app.set("views", __dirname + "/src/views");
app.use(express.static(path.join(__dirname, 'src', 'views', 'assets')));

app.use(express.urlencoded({ extended: true }));

app.use("/", require("./src/routes/routes"));

app.listen(PORT, () => {
    console.log("Aplicativo está rodando na porta", PORT);
    console.log("Caso esteja rodando em localhost: http://127.0.0.1:" + PORT)
});

//TODO Fazer validação de senha para que o usuario digite duas vezes.