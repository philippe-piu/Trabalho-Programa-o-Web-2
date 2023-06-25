//Importando o joi para validar os dados do formulario de login em vez de joi usando o @hapi/joi eu pego apropriedade do email corretamente
const Joi = require("@hapi/joi");

//Função definindo o taskschema como objeto do joi
const TaskSchema = Joi.object({
  //email é uma string do tipo email assim ele pega o tipo padrão de construção de email e o required lembra que é obrigatorio não pode ficar em branco.
  email:Joi.string().email().required(),
  //senha é do tipo string para validar precisa de no minimo 8 caracteres e maximo de 10 pode ser misturado com numeros e o required lembra que é obrigatorio não pode ficar em branco.
  senha: Joi.string().min(8).max(10).required(),
}).with("email","senha");
//esssa parte deve estar sempre junta with("email","senha")tem que ser os dois campos

//Exportando o TaskSchema
module.exports = TaskSchema;