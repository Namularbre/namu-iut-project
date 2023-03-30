'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('film', (table) => {
           table.increments('id').primary();
           table.string('title').unique().notNull();
           table.string('description').notNull();
           table.datetime('releaseDate').notNull();
           table.string('filmMaker').notNull();
           table.datetime('createdAt').defaultTo(knex.fn.now());
           table.datetime('updatedAt').defaultTo(knex.fn.now());
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('film');
    }
};
