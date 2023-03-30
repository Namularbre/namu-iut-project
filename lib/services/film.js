'use strict';

const { Service } = require('@hapipal/schmervice');

const MailService = require('./mail');

module.exports = class FilmService extends Service {

    async create(film) {
        const { Film } = this.server.models();

        const filmWithSameNameAndFilmMaker = await Film.query().findOne(
            {
                'title': film.title,
                'filmMaker': film.filmMaker
            }
        );

        if (filmWithSameNameAndFilmMaker !== undefined) {
            return false;
        }

        return Film.query().insertAndFetch(film);
    }

    async show() {
        const { Film } = this.service.models();

        return Film.query().select();
    }

    /* Dans le sujet, vous avez dit "Uniquement les utilisateurs admin peuvent créer, rajouter et modifier les films."
    * Ne voyant pas la différence entre créer et rajouter, j'ai donc pensé qu'il s'agissait d'une erreur et que vous
    * voulais dire supprimer.
    *
    */
    async delete(filmId) {
        const { Film } = this.server.models();

        return Film.query().delete().where('id', filmId);
    }

    async modify(filmId, updateData) {
        const { Film } = this.server.models();

        const filmWithSameNameAndFilmMaker = await Film.query().findOne(
            {
                'title': updateData.title,
                'filmMaker': updateData.filmMaker
            }
        );

        if (filmWithSameNameAndFilmMaker !== undefined) {
            return false;
        }

        return Film.query().patch(updateData).findOne({'id': filmId});
    }
}
