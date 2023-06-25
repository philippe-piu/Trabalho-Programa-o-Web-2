const express = require('express')
const router = express.Router()
const path = require('path')
const {chamadaForm} = require('../../front-end/javascripts/contactForm')
const TaskSchema = require('../../front-end/javascripts/TaskSValidador');

app.post('/login', (req, res) => {
  const { error, value } = TaskSchema.validate(req.body)
  //condicional para verificação de erros
  if (error) {
    //mensagem de erro no console.
    console.log('Erro de validação')
    //mensagem para usuario
    res.send('Erro de validação do Login')
  } 
});

module.exports = router