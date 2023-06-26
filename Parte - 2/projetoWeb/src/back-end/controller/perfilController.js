//Importes
const Users = require('../model/users')
const {updateUser} = require('./usersController')
const TaskSValidadorRegister = require('../../front-end/javascripts/TaskSValidadorRegister')

exports.getUser = async (req, res) => {
  try {
    // Pega o ID do usuário logado
    const { id } = req.user;
    // Procura o usuário pelo ID
    const user = await User.findById(id);
    // Renderiza a página de perfil com as informações do usuário
    res.render('dynamic/perfil', { user });
  } catch (error) {
    
    res.status(500).json({ error: 'Erro ao obter as informações do usuário.' });
  }
};
