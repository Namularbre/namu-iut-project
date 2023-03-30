'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('film', (table) => {
           table.increments('id').primary();
           table.string('title').unique().notNull();
           table.string('description').notNull();
           table.datetime('creationDate').notNull();
           table.string('filmMaker').notNull();
           table.datetime('lastUpdated')
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('film');
    }
};
