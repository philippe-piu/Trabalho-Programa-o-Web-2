//Classe Game(Jogos)
class Game{
  //Método Contrutor para inializar os valores passados por ele.
  constructor(idGame, title, gameGenre, platform, price, description){
    this.idGame = idGame;
    this.title = title;
    this.gameGenre = gameGenre;
    this.platform = platform;
    this.price = price;
    this.description = description;
  }
}

module.exports = Game;