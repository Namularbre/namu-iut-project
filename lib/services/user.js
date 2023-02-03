'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class UserService extends Service {
    // https://knexjs.org/ => pour les requêtes
    create(user){

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
