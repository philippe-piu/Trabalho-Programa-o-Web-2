const express = require('express')
const router = express.Router()
const path = require('path')
const jwt = require('jsonwebtoken');
const secretKey = 'teste';
const { check, validationResult } = require('express-validator');
const {chamadaForm} = require('../../front-end/javascripts/contactForm')
const usersController = require('../controller/usersController');
const loginController = require('../controller/loginController');




const authenticateToken = (req, res, next) => {
  //pego o cookie criado
  const token = req.cookies.token;

  //se eu não tiver o tokkeen volto para login
  if (!token) {
    return res.redirect('/login');
  }

  //verifico a validade do tokken
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return res.redirect('/login');
    }

    // Adicionando o ID do usuário ao objeto de requisição
    req.userId = decoded.userId;

    next();
  });
};

//Rotas
router.get('/', (req, res) => {
  res.render(path.join(__dirname, '../../front-end/views/dynamic/login'))
})

router.get('/login', (req, res) => {
  res.render(path.join(__dirname, '../../front-end/views/dynamic/login'))
})

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

//Rota Contatic
router.get('/contact', function (req, res, next) {
  res.render(path.join(__dirname, '../../front-end/views/dynamic/contact'))
})

//Rota Description Author
router.get('/description', function (req, res, next) {
  res.render(path.join(__dirname, '../../front-end/views/static/description'))
})

//Rota About
router.get('/about', function (req, res, next) {
  res.render(path.join(__dirname, '../../front-end/views/static/about'))
})

//Rota About
router.get('/technologies', function (req, res, next) {
  res.render(path.join(__dirname, '../../front-end/views/static/technologies'))
})

//Endereço envio de mensagem
router.post('/contact/teste', chamadaForm);

//API do Register
//Home
router.get('/home', authenticateToken, function (req, res, next) {
  res.render(path.join(__dirname, '../../front-end/views/static/home'))
})

//game
router.get('/game', authenticateToken, function (req, res, next) {
  res.render(path.join(__dirname, '../../front-end/views/dynamic/game'))
})

//Register
router.get('/register', (req, res) => {
  res.render(path.join(__dirname, '../../front-end/views/dynamic/register'))
})
router.post('/register', usersController.createUser);

//Login
router.post('/login',loginController.loginUser);

//perfil
router.get('/perfil', authenticateToken, function (req, res, next) {
  res.render(path.join(__dirname, '../../front-end/views/dynamic/perfil'));
});




module.exports = router
