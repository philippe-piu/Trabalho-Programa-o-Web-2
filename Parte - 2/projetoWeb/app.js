//Importes
const express = require('express');
const app = express();
const path = require('path');
const router = require('../projetoWeb/src/back-end/routers/index');
const PORT = 3000;
const mustacheExpress = require("mustache-express");
const dotenv = require('dotenv');
var mongoose = require('mongoose');

//Configuração do dotev do arquivo .env
dotenv.config();

//Conexão com o Banco de dados MongoDB
// URL de conexão do MongoDB
mongoose.connect(process.env.URL_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o banco de dados:'));
db.once('open', () => {
  console.log('Conexão com o banco de dados estabelecida.');
});

//Configuração de Templates
//Importa e instancia o mustache
app.engine('mustache', mustacheExpress());
//define o diretório dos arquivos e a engine
app.set('views', path.join(__dirname, 'src', 'front-end', 'views'));
app.set('view engine', 'mustache');
//Não armazenar no cache fazer ele caso aja alterações ele rodar as novas alterações
mustacheExpress.cache = null;

// Configuração do Express
app.use(express.json());
app.use(express.urlencoded({ extended: false }))



// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'src', 'front-end')));


//Definição da rota de acesso 
app.use('/',router);

//Inicia o Servidor Express na porta definida no localhost:3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
