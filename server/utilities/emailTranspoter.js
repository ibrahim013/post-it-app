import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.load();

module.exports = (mailObject) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER, // my mailtrap
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: '"Post It App" <notification@postit.com>',

    subject: '!critical Message Posted',
    text: 'You have been sent a message with piority as critical Kindly, login to view Message',
    html: `<b>You have been sent a message with piority as critical
     Kindly log into the application to view.</b>`,
  };
  mailObject.userEmail.map((email) => {
    const sendto = email.email;
    mailOptions.to = sendto;
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
      }
    });
  });
};
