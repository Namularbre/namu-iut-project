'use strict';

const { Service } = require('@hapipal/schmervice');
const { encrypt } = require("namuencryption/namuEncryption");
const { compare } = require("namuencryption/namuEncryption");

const MailService = require('./mail');

module.exports = class UserService extends Service {
    // https://knexjs.org/ => pour les requêtes
    async create(user){
        user.password = await encrypt(user.password);

        const { User } = this.server.models();

        const userWithSameEmail = await User.query().findOne({'email': user.email});

        if (userWithSameEmail !== undefined) {
            return false;
        }

        await MailService.sendWelcomeMail(user);

        return User.query().insertAndFetch(user);
    }

    show(){
        const { User } = this.server.models();

        return User.query().select();
    }

    delete(userId){

        const { User } = this.server.models();

        return User.query().delete().where('id', userId);
    }

    async modify(userId, updateData){
        const { User } = this.server.models();

        const userWithSameEmail = await User.query().findOne({'email': updateData.email});

        if (userWithSameEmail !== undefined) {
            return false;
        }

        return User.query().patch(updateData).findOne({'id': userId});
    }

    async login(userData){
        const { User } = this.server.models();

        const user = await User.query().findOne({email : userData.email});

        if (user === undefined) {
            return false;
        }

        return (compare(userData.password, user.password));
    }

    async get(userEmailAndPassword) {
        const { User } = this.server.models();

        return User.query().findOne({email: userEmailAndPassword.email});
    }

}
