//Importe da classe Users
const Users = require('./users');

//Classe Game(Jogos)
class Game{
  //Método Contrutor para inializar os valores passados por ele.
  constructor(idGame, userId, title, gameGenre, platform, price, description){
    this.idGame = idGame;
    this.userId = userId;
    this.title = title;
    this.gameGenre = gameGenre;
    this.platform = platform;
    this.price = price;
    this.description = description;
  }

  //Função para utilizar o id do usuario da users.js dentro da game.js
  getUser(){
    //O user pega as informações do usuarrio capiturada no this.userId
    const user = Users.getUserById(this.userId);
    //Imprimir no console informação do id do usuari oassociado ao jogo no momento deixei para teste
    console.log("Usuario relacionado a esse jogo possui o ID: ", user);
  }

}

module.exports = Game;