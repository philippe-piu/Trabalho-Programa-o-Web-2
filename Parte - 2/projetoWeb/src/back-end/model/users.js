//Classe Usuário
class Users{
  //Método Contrutor para inializar os valores passados por ele.
  construtor(idUsers, name, email, password){
    this.idUsers = idUsers;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

module.exports = Users;