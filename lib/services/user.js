'use strict';

const { Service } = require('@hapipal/schmervice');
const { encrypt } = require("namuencryption/namuEncryption");

module.exports = class UserService extends Service {
    // https://knexjs.org/ => pour les requêtes
    create(user){
        //Hashage du mdp de l'utilisateur
        user.password = encrypt(user.password);

        const { User } = this.server.models();

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

}
