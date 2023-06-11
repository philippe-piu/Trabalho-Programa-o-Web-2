//Função para carregamento do arquivo txt
fetch('/descricao/resumo.txt')
  //carrega o texto do arquivo txt informado pela fetch
  .then(response => response.text())
  .then(text => {
    //Exibindo uma mensagem no navegagor que foi 
    console.log("Texto exibido na tela");
    //pego as informações no no mustache onde eu define o div com id texto
    document.getElementById('texto').innerText = text.replace(/\n/g, "<br>");
  })
  .catch(error => {
    console.error('Erro ao carregar o arquivo de texto:', error);
  }); 