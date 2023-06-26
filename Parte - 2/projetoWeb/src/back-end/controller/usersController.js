//Importes 
const Users = require('../model/users');

//Função de verificação para verificar se existe usuario cadastrado
exports.checkExistingUser = async ({ cpf, email }) => {
  //Verificação no banco de dados 
  const existingUser = await Users.findOne({ cpf, email });
  return existingUser;
};


//Função para criar um usuario
exports.createUser = async ({ name, cpf, email, password }) => {
  //Criação de um novo usuario
  const user = new Users({ name, cpf, email, password });
  //Salvando um usuario no banco de dados
  await user.save();
  return user;
};


// Função para atualizar um usuário
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cpf, email, password } = req.body;
    const updatedUser = await Users.findByIdAndUpdate(id, { name, cpf, email, password }, { new: true });
    res.render('perfil', { user: updatedUser.toObject() });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
  }
};


//Função para deletar um usuario 
exports.deleteUser = async (req, res) => {
  try {
    //pego o id do usuario cadastrado
    const { id } = req.params;
    //Faço a procura do id e excluo o usuario
    await Users.findByIdAndDelete(id);
    res.json({ message: 'Usuário excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o usuário.' });
  }
};
