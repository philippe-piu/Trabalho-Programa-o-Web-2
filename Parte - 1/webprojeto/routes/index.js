var express = require('express')
var router = express.Router()
var TaskSchema = require('../public/javascripts/TaskSValidador')
const {chamadaForm} = require('../public/javascripts/contactForm')
require('dotenv').config();

/*Rota Inicial */
router.get('/', function (req, res, next) {
  res.render('login')
})

//Rota Register
router.get('/register', function (req, res, next) {
  res.render('register')
})

//Rota Home
router.get('/home', function (req, res, next) {
  res.render('home')
})

//Rota About
router.get('/about', function (req, res, next) {
  res.render('about')
})

//Rota Technologies
router.get('/technologies', function (req, res, next) {
  res.render('technologies')
})

//Rota Description Author
router.get('/description', function (req, res, next) {
  res.render('description')
})

//Rota Contact
router.get('/contact', function (req, res, next) {
  res.render('contact')
})

//Rota Comunity
router.get('/comunity', function (req, res, next) {
  res.render('comunity')
})

//Rota Store
router.get('/store', function (req, res, next) {
  res.render('store')
})

//Endereço envio de mensagem
router.post('/contact/teste', chamadaForm);

//Validação do Formulario
router.post('/home', (req, res) => {
  const { error, value } = TaskSchema.validate(req.body)
  //condicional para verificação de erros
  if (error) {
    //mensagem de erro no console.
    console.log('Erro de validação')
    //mensagem para usuario
    res.send('Erro de validação')
  } else {
    const email = value.email
    const senha = value.senha

    //condicional para verificar se o email e senha já definido neste momento é valido ou sendo ou não valido ele imprimi mensagens definidas abaixo.
    if (email === 'teste@gmail.com' && senha === 'teste123') {
      //res.send("Email e senha válidos");
      res.render('home')
    } else {
      res.send('Erro no login. Verifique suas informações')
    }
  }
})

module.exports = router
