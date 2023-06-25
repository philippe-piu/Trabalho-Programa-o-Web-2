//Importes
const express = require('express');
const userController = require('../controller/usersController');
const router = express.Router();

// Rota para cadastrar um novo usuário
router.post('/', userController.createUser);

// Rota para editar um usuário existente
router.put('/:id', userController.updateUser);

// Rota para excluir um usuário
router.delete('/:id', userController.deleteUser);

module.exports = router;