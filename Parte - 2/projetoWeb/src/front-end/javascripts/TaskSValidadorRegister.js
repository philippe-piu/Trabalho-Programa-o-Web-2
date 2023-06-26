//Importando o joi 
const Joi = require('@hapi/joi')

//Função definindo o taskschema como objeto do joi
const TaskSValidadorRegister = Joi.object({
  //name é um tipo string com no minimo 8 e maximo de 10 e o required obrigatorio campo não pode ser em branco
  name: Joi.string().min(4).max(50).required(),
  cpf: Joi.string().min(8).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(10).required()
}).with('email', 'password')

//Exportando o TaskSchema
module.exports = TaskSValidadorRegister
