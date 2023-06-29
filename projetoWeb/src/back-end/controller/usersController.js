const User = require('../model/users');
const { check, validationResult } = require('express-validator');

// Função de criação de usuário
const createUser = async (req, res) => {
  try {
    // Pega as informações do formulário
    const { name, cpf, email, password } = req.body;

    // Validação das informações do cadastro pelo Validator
    //Promise.all guarda informações 
    await Promise.all([
      check('name').notEmpty().withMessage('Erro: verifique seu Nome').run(req),
      check('cpf')
        .isLength({ min: 8, max: 15 })
        .withMessage('Erro: verifique seu CPF está com o tamanho correto')
        .run(req),
      check('email')
        .isEmail()
        .withMessage('Erro: verifique seu email')
        .run(req),
      check('password')
        .isLength({ min: 4, max: 20 })
        .withMessage('Erro: verifique sua senha')
        .run(req)
    ]);

    // Chamada de função
    const errors = validationResult(req);
    // Verificação de erro
    if (!errors.isEmpty()) {
      // Pego as mensagens de erro passados acima await Promise
      const errorMessages = errors.array().map(error => error.msg);
      const errorMessage = errorMessages.join(', ');
      return res.json({ error: errorMessage });
    }

    // Caso eu tenha um usuário cadastrado no banco com CPF e email, faço um retorno
    const existingUser = await User.findOne({ cpf, email });
    if (existingUser) {
      return res.status(400).json({ error: 'Já existe um usuário com as mesmas informações.' });
    }

    // Armazenando as informações do formulário
    const user = new User({ name, cpf, email, password });
    await user.save();

    // Em caso de sucesso
    console.log('Cadastro realizado com sucesso!');
    res.json({ message: 'Cadastro realizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.json({ error: 'Erro no registro de usuário' });
  }
};

module.exports = { createUser };
