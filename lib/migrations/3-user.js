'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('film', (table) => {
           table.increments('id').primary();
           table.string('title').unique().notNull();
           table.string('description').notNull();
           table.datetime('dateDeSortie').notNull();
           table.string('realisateur').notNull();
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('film');
    }
};
