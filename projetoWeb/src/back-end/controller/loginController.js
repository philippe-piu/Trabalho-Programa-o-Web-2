const User = require('../model/users');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const secretKey = 'teste';
const escapeHtml = require('escape-html');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Verificação pelo validador
    await Promise.all([
      check('email').isEmail().withMessage('Erro: verifique seu email').run(req),
      check('password').isLength({ min: 4, max: 20 }).withMessage('Erro: verifique sua senha').run(req)
    ]);

    //Caso de erro so validador
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      const errorMessage = escapeHtml(errorMessages.join(', '));
      return res.send(`<script>alert("${errorMessage}"); window.location.href = "/login";</script>`);
    }
    
    //verificação do email para login
    const user = await User.findOne({ email });
    if (!user) {
      console.log(email, password);
      return res.send('<script>alert("Email ou senha inválidos."); window.location.href = "/login";</script>');
    }

    //verificação da senha para login
    if (password !== user.password) {
      return res.send('<script>alert("Senha inválida."); window.location.href = "/login";</script>');
    }


    
    //Geração de Token
    const token = jwt.sign({ userId: user._id }, secretKey);
    //definição do cookie no cabeçalho
    res.cookie('token', token, { httpOnly: true })
    console.log("Token Gerado: " + token);
    return res.redirect('/home');
  } catch (error) {
    console.error('Erro ao efetuar login:', error);
    return res.send('<script>alert("Erro ao efetuar login"); window.location.href = "/login";</script>');
  }
};

module.exports = { loginUser };
