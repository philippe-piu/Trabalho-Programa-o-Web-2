const User = require('../model/users');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const secretKey = 'teste';
const escapeHtml = require('escape-html');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    await Promise.all([
      check('email').isEmail().withMessage('Erro: verifique seu email').run(req),
      check('password').isLength({ min: 4, max: 20 }).withMessage('Erro: verifique sua senha').run(req)
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      const errorMessage = escapeHtml(errorMessages.join(', '));
      return res.send(`<script>alert("${errorMessage}"); window.location.href = "/login";</script>`);
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log(email, password);
      return res.send('<script>alert("Email ou senha inválidos."); window.location.href = "/login";</script>');
    }

    if (password !== user.password) {
      return res.send('<script>alert("Senha inválida."); window.location.href = "/login";</script>');
    }


    //Geração de Token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    res.header('Authorization', `Bearer ${token}`);
    console.log("Token Gerado:", "Bearer " + token);
    console.log("Login efetuado");
    return res.redirect('/home');
  } catch (error) {
    console.error('Erro ao efetuar login:', error);
    return res.send('<script>alert("Erro ao efetuar login"); window.location.href = "/login";</script>');
  }
};

module.exports = { loginUser };
