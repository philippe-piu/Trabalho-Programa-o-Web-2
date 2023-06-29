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
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send('Não autorizado');
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).send('Proibido');
    }
    req.user = user;
    next();
  });
};

//Rotas Dinâmicas
//Rota Principal

//Rota Principal
router.get('/login', (req, res) => {
  res.render(path.join(__dirname, '../../front-end/views/dynamic/login'))
})

router.get('/register', (req, res) => {
  res.render(path.join(__dirname, '../../front-end/views/dynamic/register'))
})

//Rota Contatic
router.get('/contact', function (req, res, next) {
  res.render(path.join(__dirname, '../../front-end/views/dynamic/contact'))
})

//Home
router.get('/home', authenticateToken, function (req, res, next) {
  res.render(path.join(__dirname, '../../front-end/views/static/home'))
})

//perfil
router.get('/perfil', authenticateToken, function (req, res, next) {
  res.render(path.join(__dirname, '../../front-end/views/dynamic/perfil'))
})

//game
router.get('/game', authenticateToken, function (req, res, next) {
  res.render(path.join(__dirname, '../../front-end/views/dynamic/game'))
})

//Rotas Estáticas
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
router.get('/register', (req, res) => {
  res.render(path.join(__dirname, '../../front-end/views/dynamic/register'))
})
router.post('/register', usersController.createUser);

//Login
router.get('/', (req, res) => {
  res.render(path.join(__dirname, '../../front-end/views/dynamic/login'))
})
router.post('/login',loginController.loginUser);


module.exports = router
