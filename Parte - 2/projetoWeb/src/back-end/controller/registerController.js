//Importes
const Users = require('../model/users')
const TaskSValidadorRegister = require('../../front-end/javascripts/TaskSValidadorRegister')

exports.register = async (req, res) => {
  try {
    //Para fazer um cadastro precisa atender alguns requisitos definidos com ajuda do Joi
    await TaskSValidadorRegister.validateAsync(req.body)

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
