var express = require('express');
var router = express.Router();

//P. Inicial
router.get('/', (req, res) => {
  res.render('home');
});

//Sobre
router.get('/sobre', (req, res) => {
  res.render('sobre');
});

//Login
router.get('/login', (req, res) => {
  res.render('login');
});

//Home
router.get('/home', (req, res) => {
  res.render('home');
});

//Exportar rotas
module.exports = router;
