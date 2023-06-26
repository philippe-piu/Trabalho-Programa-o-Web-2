// Importações
const Users = require('../model/users')
const TaskSchema = require('../../front-end/javascripts/TaskSValidador')

// Função de login
exports.login = async (req, res) => {
  try {
    // Validar os dados do formulário de login
    await TaskSchema.validateAsync(req.body);

    // Extrair as informações do formulário
    const { email, password } = req.body;

    // Verificar se o usuário existe no banco de dados
    const user = await Users.findOne({ email });

    // Verificar se o usuário foi encontrado e se a senha está correta
    if (user && user.password === password) {
      // Autenticação bem-sucedida, redirecionar para a página inicial
      res.redirect('/home');
    } else {
      // Credenciais inválidas, redirecionar para a página de login com uma mensagem de erro
      res.send(`
        <script>
          alert('Credenciais inválidas. Verifique seu email e senha.');
          window.history.back();
        </script>
      `);
    }
  } catch (error) {
    // Erro de validação, redirecionar para a página de login com uma mensagem de erro
    res.send(`
      <script>
        alert('Erro ao fazer login. Verifique seus dados de login.');
        window.history.back();
      </script>
    `);
  }
};