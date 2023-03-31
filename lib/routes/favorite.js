'use strict';

const Joi = require('joi')
const {server} = require("@hapi/hapi");

const Jwt = require('@hapi/jwt');

module.exports = [
    {
        method: 'post',
        path: '/favorite',
        options: {
            auth: {
                scope: [ 'admin', 'user' ]
            },
            tags: [ 'api' ],
            validate: {
                payload: Joi.object({
                    userId: Joi.number().greater(0).example(3).description('Your user id'),
                    filmId: Joi.number().greater(0).example(4).description('The id of the film')
                })
            },
            handler: async (request, h) => {
                const responseAlreadyExists = 1;
                const responseWrongUserOrFilm = 2;
                const { favoriteService } = request.service();

                const response = await favoriteService.create(request.payload);

                if (response === responseAlreadyExists) {
                    return h.response('Favorite already exists').code(403);
                } else if (response === responseWrongUserOrFilm) {
                    return h.response('User id of film id uncorrect').code(403);
                } else {
                    return h.response(response).code(200);
                }
            }
        }
    },
    {
        method: 'get',
        path: '/favorite/{id}',
        options: {
            auth: {
                scope: [ 'admin', 'user' ]
            },
            tags: [ 'api' ],
            handler: async (request, h) => {
                const { favoriteService } = request.service();

                return await favoriteService.show(request.params['id']);
            }
        }
    },
    {
        method: 'delete',
        path: '/favorite/{userId}-{filmId}',
        options: {
            auth: {
                scope: [ 'admin', 'user' ]
            },
            tags: [ 'api' ],
            handler: async (request, h) => {
                const { favoriteService } = request.service();

                return await favoriteService.show(request.params['id']);
            }
        }
    }
]
