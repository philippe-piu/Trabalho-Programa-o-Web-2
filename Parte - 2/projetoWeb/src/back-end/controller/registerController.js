const Users = require('../model/users')
const Joi = require('@hapi/joi')

exports.register = async (req, res) => {
  const schema = Joi.object({
    //name é um tipo string com no minimo 8 e maximo de 10 e o required obrigatorio campo não pode ser em branco
    name: Joi.string().min(4).max(50).required(),
    //Cpf é um tipo string com no minimo 8 e maximo de 10 e o required obrigatorio campo não pode ser em branco
    cpf: Joi.string().min(8).max(10).required(),
    //email é uma string do tipo email assim ele pega o tipo padrão de construção de email e o required lembra que é obrigatorio não pode ficar em branco.
    email: Joi.string().email().required(),
    //senha é do tipo string para validar precisa de no minimo 8 caracteres e maximo de 10 pode ser misturado com numeros e o required lembra que é obrigatorio não pode ficar em branco.
    password: Joi.string().min(4).max(16).required()
  })

  try {
    await schema.validateAsync(req.body)

    const { name, cpf, email, password } = req.body
    const existingUser = await Users.findOne({ cpf, email })

    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'Já existe um usuário com as mesmas informações.' })
    }

    const user = new Users({ name, cpf, email, password })
    await user.save()
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso.' })
  } catch (error) {
    return res.status(400).json({ error: 'Erro de validação do Cadastro' })
  }
}
