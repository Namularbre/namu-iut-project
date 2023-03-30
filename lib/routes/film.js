'use strict';

const Joi = require('joi')
const {server} = require("@hapi/hapi");

const Jwt = require('@hapi/jwt');

module.exports = [
    {
        method: 'post',
        path: '/film',
        options: {
            auth: {
                scope: [ 'admin' ]
            },
            tags: [ 'api' ],
            validate: {
                payload: Joi.object({
                    title: Joi.string().required().min(3).max(255).example('Titanic').description('Title of the film'),
                    description: Joi.string().required().min(3).max(255).example('A romantic movie on the famous boat'),
                    releaseDate: Joi.date().example('1997').description('The release date of the film'),
                    filmMaker: Joi.string().min(3).max(255).example('James Cameron').description('The creator of the film')
                })
            },
            handler: async (request, h) => {
                const { filmService } = request.services();

                const response = await filmService.create(request.payload);

                if (response === false) {
                    return h.response('Film already exists').code(418);
                } else {
                    return response;
                }
            }
        }
    },
    {
        method: 'get',
        path: '/film',
        options: {
            auth : false,
            tags: ['api'],
        },
        handler: async (request, h) => {
            const { filmService } = request.services();

            return await filmService.show();
        }
    },
    {
        method: 'delete',
        path: '/film/{id}',
        options: {
            auth: {
                scope: [ 'admin' ]
            },
            tags: ['api'],
        },
        handler: async (request, h) => {
            const { filmService } = request.services();

            return await filmService.delete(request.params['id']);
        }
    },
    {
        method: 'patch',
        path: '/film/{id}',
        options: {
            auth : {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    title: Joi.string().required().min(3).max(255).example('Titanic').description('Title of the film'),
                    description: Joi.string().required().min(3).max(255).example('A romantic movie on the famous boat'),
                    releaseDate: Joi.date().example('1997').description('The release date of the film'),
                    filmMaker: Joi.string().min(3).max(255).example('James Cameron').description('The creator of the film')
                })
            }
        },
        handler: async (request, h) => {
            const { filmService } = request.services();

            const response = await filmService.modify(request.params['id'], request.payload);

            if (!response) {
                return h.response('Film already exists').code(403);
            } else {
                return response;
            }
        }
    }
]
