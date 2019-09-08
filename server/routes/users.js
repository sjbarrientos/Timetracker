const express = require('express');
const _ = require('underscore');
const httpStatus = require('http-status-codes');

const User = require('../models/user');
const Task = require('../models/task');

const app = express();


/**
 * @api {get} /api/users Request a list of users 
 * @apiVersion 1.0.0
 * @apiGroup User
 *
 * @apiDescription Get a list of users in the application
 *
 * @apiSuccess {Boolean}   ok               status
 * @apiSuccess {Object[]}  users            users in the app
 * @apiSuccess {String}    users.username   user's username.
 * @apiSuccess {String}    users.email      user's email.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "ok":true,
 *          "users":[
 *              {
 *                  "_id":"id",
 *                  "username":"username",
 *                  "email":"email"
 *              }
 *          ]
 *     }
 *
 * 
 * @apiError (Error 5XX) ConnectionFail The API couldn't connect to DB. 
 * @apiErrorExample Response (example):
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *          "ok": false,
 *          "err": "ConnectionFail",
 *          "message": "The API couldn't connect to DB"
 *     }
 */
app.get('/api/users', async (req, res) => {
    try {
        let users = await User.find({});
        return res.json({
            ok: true,
            users
        })
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            ok: false,
            err: 'ConnectionFail',
            message: 'The API couldn\'t connect to DB'
        })

    }

});

/**
 * @api {post} /api/users/add Insert user 
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
 *              "_id":"id",
 *              "username":"username",
 *              "email":"email"
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
app.post('/api/users/add', async (req, res) => {
    try {
        let body = req.body;

        let user = new User({
            username: body.username,
            email: body.email
        });
        let userDB = await user.save();
        return res.json({
            ok: true,
            user: userBD
        });
    } catch (err) {
        return res.status(httpStatus.BAD_REQUEST).json({
            ok: false,
            err: err.name,
            message: err.message
        });
    }
});
/**
 * @api {get} /api/users/tasks/:id Required task's user 
 * @apiVersion 1.0.0
 * @apiGroup User
 *
 * @apiDescription Required task's user 
 * 
 * @apiParam {String} id  user's id.
 *
 @apiSuccess {Boolean}   ok                    status
 * @apiSuccess {Object}    task                  task
 * @apiSuccess {String}    task._id              task's id.
 * @apiSuccess {String}    task.name             task' name.
 * @apiSuccess {String}    task.hours            task's hours.
 * @apiSuccess {String}    task.minutes          task's minutes.
 * @apiSuccess {String}    task.seconds          task's seconds.
 * @apiSuccess {Object}    task.status           task's status.
 * @apiSuccess {Sting}     task.status.status    status' description.
 * @apiSuccess {Sting}     task.status.abr       status' abr.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "ok":true,
 *          "tasks":[
 *              {
 *                  "startDate":"2019-09-08T03:27:02.000Z",
 *                  "_id":"id",
 *                  "name":"task1",
 *                  "hours":1,
 *                  "minutes":1,
 *                  "seconds":1,
 *                  "status":{
 *                      "_id":"id",
 *                      "status":"active",
 *                      "abr":"A"
 *                  },
 *                  "user":"5d7431312c699b18b4211b68",
 *                  "__v":0
 *              }
 *          ]
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
app.get('/api/users/tasks/:id', async (req, res) => {
    try {
        let id = req.params.id;
        if (!id)
            throw new Error("Validation failed: id is required");

        let user = await User.findById(id);
        if (!user)
            throw new Error("Validation failed: id is required");
        let tasks = await Task.find({ user: user._id }).sort({ 'startDate': -1 }).populate('status');
        
        res.json({
            ok: true,
            tasks
        });
    } catch (err) {
        console.log(err);

        return res.status(httpStatus.BAD_REQUEST).json({
            ok: false,
            err: err.name,
            message: err.message
        });
    }
});

module.exports = app;