'use strict';

const { Service } = require('@hapipal/schmervice');
const { encrypt } = require("namuencryption/namuEncryption");
const { compare } = require("namuencryption/namuEncryption");

module.exports = class UserService extends Service {
    // https://knexjs.org/ => pour les requêtes
    async create(user){
        //Hashage du mdp de l'utilisateur
        user.password = await encrypt(user.password);

        const { User } = this.server.models();

        /*const userInDb = User.query().findOne({mail : user.email});

        if (userInDb != undefined) {
            return false;
        }*/

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

    modify(userId, updateData){
        const { User } = this.server.models();

        return User.query().patch(updateData).findOne({'id': userId});
    }

    async login(userData){
        const { User } = this.server.models();

        const user = await User.query().findOne({email : userData.email});

        if (user == undefined) {
            return false;
        }

        return (compare(userData.password, user.password));
    }

}
