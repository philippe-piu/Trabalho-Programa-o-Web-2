//Importes
const express = require('express');
const app = express();
const path = require('path');
const router = require('../projetoWeb/src/back-end/routers/index');
const PORT = 3000;
const mustacheExpress = require("mustache-express");
const dotenv = require('dotenv');

//Configuração do dotev do arquivo .env
dotenv.config();

//Configuração de Templates
//Importa e instancia o mustache
app.engine('mustache', mustacheExpress());
//define o diretório dos arquivos e a engine
app.set('views', path.join(__dirname, 'src', 'front-end', 'views'));
app.set('view engine', 'mustache');
//Não armazenar no cache fazer ele caso aja alterações ele rodar as novas alterações
mustacheExpress.cache = null;


// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'src', 'front-end')));


//Definição da rota de acesso 
app.use('/',router);

//Inicia o Servidor Express na porta definida no localhost:3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
