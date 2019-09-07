const express = require('express');
const _ = require('underscore');
const httpStatus = require('http-status-codes');

const User = require('../models/user');

const app = express();


/**
 * @api {get} /users Request a list of users 
 * @apiVersion 1.0.0
 * @apiGroup User
 *
 * @apiDescription Get a list of users in the application
 *
 * @apiSuccess {Boolean}   ok               status
 * @apiSuccess {Object[]}  users            users in the app
 * @apiSuccess {String}    users.username   username.
 * @apiSuccess {String}    users.email      email.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "ok": true,
 *       "users": "Doe"
 *     }
 *
 * 
 * @apiError (Error 5XX) ConnectionFail The API couldn't connect to DB. 
 * @apiErrorExample Response (example):
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *          "ok": false,
 *          "err": "ConnectionFail"
 *     }
 */
app.get('/api/users', (req, res) => {
    User.find({})
        .exec((err, users) => {
            if (err) {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                    ok: false,
                    err: 'ConnectionFail'
                })
            }
            res.json({
                ok: true,
                users
            })
        });

});

/**
 * @api {post} /users/add Insert user 
 * @apiVersion 1.0.0
 * @apiGroup User
 *
 * @apiDescription Create a new user
 * 
 * @apiParam {String} username  user's username.
 * @apiParam {String} email     user's email.
 *
 * @apiSuccess {Boolean}   ok               status
 * @apiSuccess {Object}    users            users object
 * @apiSuccess {String}    users.username   username.
 * @apiSuccess {String}    users.email      email.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "ok":true,
 *          "user":{
 *              "_id":"5d74326a00286d1957c913a0",
 *              "username":"username",
 *              "email":"email",
 *              "__v":0
 *          }
 *     }
 *
 * 
 * @apiError (Error 4XX) ValidationError  
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *          "ok":false,
 *          "err":"ValidationError",
 *          "message":"User validation failed: username: username is required, email: email is required"
 *     }
 */
app.post('/api/users/add', (req, res) => {
    let body = req.body;
   
    let user = new User({
        username: body.username,
        email: body.email
    });
    user.save((err, userBD) => {
        if (err)
            return res.status(httpStatus.BAD_REQUEST).json({
                ok: false,
                err:err.name,
                message:err.message
            });
        res.json({
            ok:true,
            user:userBD
        });
    });



});
//get user tasks
app.get('/api/user/task/:id', (req, res) => res.send('Hello World!'));

module.exports = app;