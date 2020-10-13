const nodemailer = require("nodemailer");

const credentials = require("./private/credentialsGmail.json");




const smtpTransport = nodemailer.createTransport({    
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: credentials.user, 
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
        refreshToken: credentials.refreshToken
    }
});


const mailOptions = {
  from: credentials.user,
  to: "joeybarten94@hotmail.com",
  subject: "Vraag van klant - via Sandy",
  generateTextFromHTML: true,
  html: ""
};

const sendEmail = (htmlContent) =>{
    mailOptions.html = htmlContent;
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {            
          console.log(error);
        }
        else if (response) {            
          console.log(response);
        }
        smtpTransport.close();
    });
};

module.exports.sendEmail = sendEmail;
