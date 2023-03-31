'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('favorites', (table) => {
            table.increments('id').primary();
            table.bigInteger('userId')
                .unsigned()
                .index()
                .references('id')
                .inTable('user');
            table.bigInteger('filmId')
                .unsigned()
                .index()
                .references('id')
                .inTable('film');
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('favorites');
    }
};
