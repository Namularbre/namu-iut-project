'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('film', (table) => {
           table.increments('id').primary();
           table.string('title');
           table.string('description');
           table.datetime('dateDeSortie');
           table.string('realisateur');
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('film');
    }
};
