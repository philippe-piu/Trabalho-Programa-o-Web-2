//Importes de pacotes
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Importes de rotas
var indexRouter = require('./routes/index');

//Cria uma instância express
var app = express();

//Configuração de Templates
//Importa e instancia o mustache
const mustacheExpress = require("mustache-express");
app.engine('mustache', mustacheExpress());
//define o diretório dos arquivos e a engine
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'mustache');
//Não armazenar no cache fazer ele caso aja alterações ele rodar as novas alterações
mustacheExpress.cache = null;

//Configuração do express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Definição da rota de acesso
app.use('/', indexRouter);

//Exporta o express para os outros arquivos do projeto
module.exports = app;