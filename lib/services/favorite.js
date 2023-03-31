'use strict';

const { Service } = require('@hapipal/schmervice');
const { encrypt } = require("namuencryption/namuEncryption");
const { MailService } = require("./mail");

module.exports = class FavoriteService extends Service {

    async create(favorite) {
        const { Favorite } = this.server.models();
        const { Film } = this.server.models();
        const { User } = this.server.models();

        const favoriteAlreadyExists = await Favorite.query().findOne({'idUser': favorite.idUser, 'filmId' : favorite.filmId });

        const film = await Film.query().findOne({'id' : favorite.filmId });
        const user = await User.query().findOne({'id': favorite.idUser });

        if (favoriteAlreadyExists !== undefined) {
            return 1;
        } else if (user === undefined || film === undefined) {
            return 2;
        }

        await MailService.sendNewFavoriteMail(user, film);

        return Favorite.query().insertAndFetch(favorite);
    }


    async show(userId) {
        const { Favorite } = this.server.models();

        return Favorite.query().select().where('userId', userId);
    }

    async delete(favorite) {
        const { Favorite } = this.server.models();

        return Favorite.query().delete().where('userId', favorite.userId).where('filmId', favorite.filmId);
    }
}
