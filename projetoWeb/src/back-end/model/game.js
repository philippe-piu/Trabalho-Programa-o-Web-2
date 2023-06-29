//Importe mongoose
const mongoose = require('mongoose');

//Criando um novo Schema 
const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

//Craiação do modelo pro exportes
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;