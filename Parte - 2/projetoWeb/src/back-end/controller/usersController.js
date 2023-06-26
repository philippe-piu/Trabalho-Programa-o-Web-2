const Users = require('../model/users');

exports.checkExistingUser = async ({ cpf, email }) => {
  const existingUser = await Users.findOne({ cpf, email });
  return existingUser;
};

exports.createUser = async ({ name, cpf, email, password }) => {
  const user = new Users({ name, cpf, email, password });
  await user.save();
  return user;
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByIdAndUpdate(id, req.body);
    res.json({ message: 'Usuário atualizado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Users.findByIdAndDelete(id);
    res.json({ message: 'Usuário excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o usuário.' });
  }
};
