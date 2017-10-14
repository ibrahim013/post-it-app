import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.load();

module.exports = (mailObject) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER, // my mail
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: '"Post It App" <notification@postit.com>',

    subject: '!critical Message Posted',
    text: `You have a new message in ${mailObject.groupname}`,
    html: `<b>You have a new message in ${mailObject.groupname} group.
     Kindly log into the application to view.</b>`,
  };
  mailObject.userEmail.map((email) => {
    const sendto = email.email;
    mailOptions.to = sendto;
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
      }
      console.log('Message %s sent: %s');
    });
  });
};
