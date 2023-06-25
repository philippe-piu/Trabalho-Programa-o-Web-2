//Importe mongoose
const mongoose = require('mongoose');

//Criando um novo Schema 
const userSchema = new mongoose.Schema({
  //Campos dentro do Schema
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

//Craiação do modelo pro exportes
const User = mongoose.model('User', userSchema);

module.exports = User;