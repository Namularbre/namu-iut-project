'use strict'

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Film extends Model {

    static get tableName() {
        return 'film';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(3).max(255).example('Minecraft, le film').description('Title of the film'),
            description: Joi.string().min(3).max(255).example('Un film sur Minecraft, pour toute la famille !').description('Film description'),
            creationDate: Joi.date().description('The date when the film became available in cinema club'),
            filmMaker: Joi.string().min(3).max(255).example('Fanta').description('The author of the film')
        });
    }

    $beforeInsert(queryContext) {

    }


}
