'use strict';

const Joi = require('joi')
const {server} = require("@hapi/hapi");

const Jwt = require('@hapi/jwt');

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            auth: false,
            tags:['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('Bob').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Lebricoleur').description('Lastname of the user'),
                    password : Joi.string().required().min(8).example('Agfhd541234èç').description('Password of the user'),
                    email : Joi.string().required().min(5).example('toto@domain.tld').description('Email of the user'),
                    userName : Joi.string().required().min(3).example('Calm Tree 63').description('Username of the user')
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            const response = await userService.create(request.payload);

            if (!response) {
                h.response('User already exists').code(403);
            } else {
                return response;
            }
        }
    },
    {
        method: 'get',
        path : '/user',
        options: {
            auth : {
                scope: [ 'admin', 'user' ]
            },
            tags: ['api'],
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return await userService.show();
        }
    },
    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            auth : {
                scope: [ 'admin' ]
            },
            tags: ['api'],
        },
        handler: async (request, h) => {

            const {userService} = request.services();

            return await userService.delete(request.params['id']);
        }
    },
    {
        method: 'patch',
        path: '/user/{id}',
        options: {
            auth : {
                scope: [ 'admin' ]
            },
            tags : ['api'],
            validate: {
                payload: Joi.object( {
                    firstName: Joi.string().required().min(3).example('Bob').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Lebricoleur').description('Lastname of the user'),
                    password : Joi.string().required().min(8).example('Agfhd541234èç').description('Password of the user'),
                    email : Joi.string().required().min(5).example('toto@domain.tld').description('Email of the user'),
                    userName : Joi.string().required().min(3).example('Calm Tree 63').description('Username of the user')
                })
            }
        },
        handler: async (request, h) => {
            const {userService} = request.services();

            return await userService.modify(request.params['id'], request.payload);
        }
    },
    {
        method : 'post',
        path : '/user/login',
        options: {
            auth: false,
            tags : ['api'],
            validate:  {
                payload: Joi.object( {
                    email : Joi.string().required().min(5).example('toto@domain.tld').description('Email of the user'),
                    password : Joi.string().required().min(8).example('Agfhd541234èç').description('Password of the user'),
                })
            }
        },
        handler: async (request, h) => {
            const {userService} = request.services();

            const isLogged = await userService.login(request.payload);

            if (isLogged) {

                return Jwt.token.generate(
                    {
                        aud: 'urn:audience:iut',
                        iss: 'urn:issuer:iut',
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'test@example.com'
                    },
                    {
                        key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                        algorithm: 'HS512'
                    },
                    {
                        ttlSec: 14400 // 4 hours
                    }
                );
            } else {
                return h.response("Unauthorized").code(401);
            }
        }
    }
];
