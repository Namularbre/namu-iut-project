'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('favorites', (table) => {
            table.increments('id').primary();
            table.foreign('userId')
                .references('id')
                .inTable('user');
            table.foreign('filmId')
                .references('id')
                .inTable('film');
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('favorites');
    }
};
