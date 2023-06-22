const express = require('express')
const router = express.Router()
const path = require('path')
const {chamadaForm} = require('../../front-end/javascripts/contactForm')

//Rotas Dinâmicas
//Rota Principal
router.get('/', (req, res) => {
  res.render(path.join(__dirname, '../../front-end/views/dynamic/login'))
})

//Rota Contatic
router.get('/contact', function (req, res, next) {
  res.render(path.join(__dirname, '../../front-end/views/dynamic/contact'))
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

module.exports = router
