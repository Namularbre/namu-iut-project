'use strict';

const { Service } = require('@hapipal/schmervice');
const nodemailer = require("nodemailer");

module.exports = class MailService extends Service {
    // https://knexjs.org/ => pour les requêtes
    async sendWelcomeMail(user){
        //La doc nodemailer : https://nodemailer.com/about/
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PASSWORD,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });

        let message = {
            from: process.env.MAIL_SITE_EMAIL,
            to: user.email,
            subject: 'Welcoming',
            text: 'Hi ! ' + user.userName + ' we are happy to have you in yours users list !'
        };

        transporter.sendMail(message, () => {
            console.log("mail send !");
        });

        return false;
    }

}
