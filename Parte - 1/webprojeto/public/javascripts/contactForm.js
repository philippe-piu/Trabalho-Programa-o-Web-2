/*Relacionado a formContact.mustache */
//Import nodemailer e dotenv
const nodemailer = require('nodemailer');

console.log(process.env.USER);
//evento de envio do formulario
exports.chamadaForm = (req, res) => {

  //Armazenando ar informações do formulario
  const { nome, email, assunto, mensagem } = req.body

  //Configuração do email que vai receber a mensagem no mailtrap
  /*
  var smtp = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      //Senha e usuario disponibilizado no Integrations no mailtrap
      user:"5fe90707358a9b",
      pass: "fe09415cbe9632"
    }
  });
  */
  var smtp = nodemailer.createTransport({
    
    host: "smtp.office365.com",
    port: 587,
    secure:false,
    auth: {
      //Senha e usuario disponibilizado no Integrations no mailtrap
      
      user:process.env.USER,
      pass:"teste123456"
    }
  });
  console.log(process.env.USER);

  //criação da mensagem do email
  var message = {
    //endereço de email do remetente
    from: "teste5080@hotmail.com",
    //endereço de email do destinatario
    to: ['teste2@TrabalhoWeb.com.br'],
    subject: assunto,
    text: `Nome: ${nome}\nE-mail: ${email}\nAssunto: ${assunto}\n\n${mensagem}`
  }

  //envio do email
  smtp.sendMail(message, (error, info) => {
    if (error) {
      console.error(error)
      res.send('Ocorreu um erro ao enviar a mensagem.')
    } else {
      console.log('Mensagem enviada: ' + info.response)
      res.send('Mensagem enviada com sucesso!')
    }
  })
};
