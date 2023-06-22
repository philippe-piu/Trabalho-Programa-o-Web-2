/*Relacionado a formContact.mustache */
//Import nodemailer e dotenv
const nodemailer = require('nodemailer');

console.log(process.env.USER);
//evento de envio do formulario
exports.chamadaForm = (req, res) => {

  //Armazenando as informações do formulario
  const { nome, email, assunto, mensagem } = req.body

  //Configuração do email que vai receber a mensagem no mailtrap
  var smtp = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT_P,
    auth: {
      //Senha e usuario disponibilizado no Integrations no mailtrap
      user:process.env.USER_EMAIL,
      pass: process.env.USER_PASS
    }
  });

  //criação da mensagem do email
  var message = {
    //endereço de email do remetente
    from: process.env.USER_EMAIL,
    //endereço de email do destinatario
    to: process.env.TO,
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