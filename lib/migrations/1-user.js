'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.alterTable('user', (table) => {

            table.string("password").notNull();
            table.string("email").notNull();
            table.string("userName").notNull();
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('user');
    }
};
