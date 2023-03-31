'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('favorite', (table) => {
            table.integer("userId").unsigned().notNull();
            table.integer("filmId").unsigned().notNull();
            table.foreign("userId").references('id').inTable('user');
            table.foreign("filmId").references('id').inTable('film');
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('favorite');
    }
};
