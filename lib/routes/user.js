'use strict';

const Joi = require('joi')
const {server} = require("@hapi/hapi");

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
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

            return await userService.create(request.payload);
        }
    },
    {
        method: 'get',
        path : '/user',
        options: {
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
            tags: ['api'],
        },
        handler: async (request, h) => {

            const {userService} = request.services();

            console.log(request.params);

            return await userService.delete(request.params['id']);
        }
    }
];
