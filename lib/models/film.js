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
            releaseDate: Joi.date().description('The date when the film became available in cinema club'),
            filmMaker: Joi.string().min(3).max(255).example('Fanta').description('The author of the film'),
            createdAt: Joi.date().description('The date where the film was added in this API'),
            updatedAt: Joi.date().description('The date of the last update (default : now)')
        });
    }

    $beforeInsert(queryContext) {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }
}
