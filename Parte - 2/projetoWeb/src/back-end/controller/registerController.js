//Importes
const Users = require('../model/users')
const Joi = require('@hapi/joi')

exports.register = async (req, res) => {
  //Para fazer um cadastro precisa atender alguns requisitos definidos com ajuda do Joi
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
    //Validação dos dados do formulario
    await schema.validateAsync(req.body)

    //Extrai as informações do formulario
    const { name, cpf, email, password } = req.body

    //faço a verificação para ver se eu tenho já o usuario com esse email e cpf cadastrado
    const existingUser = await Users.findOne({ cpf, email })

    //Caso eu tenha um usuario cadastrado no banco com cfp e email  faço um retorno
    if (existingUser) {
      return res.status(400).send(`
        <script>
          alert('Já existe um usuário com as mesmas informações.');
          window.history.back();
        </script>
      `)
    }

    //Crio um novo usuario
    const user = new Users({ name, cpf, email, password })

    //Salvando o usuario no banco
    await user.save()
    res.send(`
      <script>
        alert('Cadastro realizado com sucesso!');
        window.location.href = '/login';
      </script>
    `)
  } catch (error) {
    res.send(`
      <script>
        alert('Erro ao cadastrar usuário. Verifique todos os campos do cadastro.');
        window.history.back();
      </script>
    `)
  }
}
