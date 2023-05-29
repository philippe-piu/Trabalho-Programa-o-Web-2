//Importando o módulo do Express
const express = require('express')
//Criando uma instâcia do aplicativo Express
const app = express()
//Definição da Porta do servidor
const port = 3000

app.get('Projeto/front-end/',(req, res) => {
  res.send('Olá Mundo!')
})

//Inicialização do servidor para execução na porta definida
app.listen(port, () => {
  //Mensagem no console para avisar que o servidor está ativo
  console.log('Servidor ativo na porta ${port}')
})