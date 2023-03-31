'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FilmService extends Service {

    async create(film) {
        const { Film } = this.server.models();

        const existingFilm = await Film.query().findOne({
            title: film.title,
            filmMaker: film.filmMaker
        });

        if (existingFilm) {
            return false;
        }

        return await Film.query().insert(film).returning('*');
    }


    async show() {
        const {Film} = this.server.models();

        return Film.query().select();
    }

    /* Dans le sujet, vous avez dit "Uniquement les utilisateurs admin peuvent créer, rajouter et modifier les films."
    * Ne voyant pas la différence entre créer et rajouter, j'ai donc pensé qu'il s'agissait d'une erreur et que vous
    * voulais dire supprimer.
    *
    */
    async delete(filmId) {
        const { Film } = this.server.models();
        const { Favorite } = this.server.models();

        Favorite.query().delete().where('filmId', filmId);
        return Film.query().delete().where('id', filmId);
    }

    async modify(filmId, updateData) {
        const { Film } = this.server.models();

        const existingFilm = await Film.query().findOne({
            title: updateData.title,
            filmMaker: updateData.filmMaker,
        });

        if (existingFilm && existingFilm.id !== filmId) {
            return false;
        }

        await Film.query().findById(filmId).patch(updateData);

        return Film.query().findById(filmId);
    }
}
