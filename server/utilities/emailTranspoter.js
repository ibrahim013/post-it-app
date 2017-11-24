import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.load();
/**
 * @description: This module sends email notification message to all users
 * in a group
 *
 * @param {object} mailobject
 *
 * @return {void}
 *
 */

module.exports = (mailObject) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // my mailtrap
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: '"Post It App" <notification@postit.com>',
    subject: '!Notification Message Posted',
    text: `You have been sent a message with piority as "${mailObject.piority}" 
    in ${mailObject.groupName} 
    group. Kindly, login to view Message`,
    html: `
    <header>
    <h2 style="padding-top: 5px; color: #1bb188;">Postit Message Notification</h2>
   </header>
   <b>You have been sent 
    a message with piority as "${mailObject.piority}"  in "${mailObject.groupName}" group
    .Kindly <a href="post-it-app.herokuapp.com">log into the application to 
    view</a>.</b>
    <footer>
    <h2 style="padding-top: 5px; color: #1bb188;">Postit Team</h2>
    </footer>
    `,
  };
  mailObject.userEmail.map((email) => {
    const sendto = email;
    mailOptions.to = sendto;
    transporter.sendMail(mailOptions);
  });
};
