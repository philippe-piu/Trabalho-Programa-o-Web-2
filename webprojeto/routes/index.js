var express = require('express');
var router = express.Router();
var TaskSchema = require("../validador_Formulario/TaskSValidador");

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

//Validação do Formulario
router.post('/sobre', (req, res) => {
  const { error, value } = TaskSchema.validate(req.body);
  //condicional para verificação de erros
  if (error) {
    //mensagem de erro no console.
    console.log("Erro de validação");
    //mensagem para usuario
    res.send("Erro de validação");
  } else {

    const email = value.email;
    const senha = value.senha;

    //condicional para verificar se o email e senha já definido neste momento é valido ou sendo ou não valido ele imprimi mensagens definidas abaixo.
    if (email === "teste@gmail.com" && senha === "teste123") {
      //res.send("Email e senha válidos");
      res.render('sobre');
    } else {
      res.send("Erro no login. Verifique suas informações");
    }
  }
});

//Exportar rotas
module.exports = router;
