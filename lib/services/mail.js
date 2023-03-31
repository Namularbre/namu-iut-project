'use strict';

const { Service } = require('@hapipal/schmervice');
const nodemailer = require("nodemailer");

module.exports = class MailService extends Service {
    // https://knexjs.org/ => pour les requêtes
    static async sendWelcomeMail(user){
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
            subject: 'Welcome !',
            text: `Hi ! ${user.userName} we are happy to have you in our user list !`
        };

        transporter.sendMail(message, () => {
            console.log("mail send !");
        });
    }

    static async sendNewFavoriteMail(user, film) {
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
            subject: 'New Favorite',
            text: `Hi ${user.userName} ! ${film.title} added succesfully !`
        };

        transporter.sendMail(message, () => {
            console.log("mail send !");
        });
    }

}
