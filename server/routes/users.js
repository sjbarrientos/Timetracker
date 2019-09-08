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
 * @apiSuccess {String}    users._id        user's id.
 * @apiSuccess {String}    users.username   user's username.
 * @apiSuccess {String}    users.email      user's email.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "ok":true,
 *          "users":[
 *              {
 *                  "_id":"5d75351c24d7433e90fa23e1",
 *                  "username":"sj2",
 *                  "email":"sj2@gmail.com"
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
 *              "_id":"5d75351c24d7433e90fa23e1",
 *              "username":"sj2",
 *              "email":"sj2@gmail.com"
 *          }
 *     }
 *
 * 
 * @apiError (Error 4XX) ValidationError  Error with all validation messages
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
            user: userDB
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
 * @api {get} /api/users/tasks/:id request user's tasks
 * @apiVersion 1.0.0
 * @apiGroup User
 *
 * @apiDescription This method returns and object with all tasks for the user send by parameters
 * 
 * @apiParam {String} id    User ID.
 *
 * @apiSuccess {Boolean}   ok                    status
 * @apiSuccess {Object}    task                  task
 * @apiSuccess {Numeric}   task.current_time     task's curent time.
 * @apiSuccess {Date}      task.startDate        task's start date.
 * @apiSuccess {String}    task._id              task's id.
 * @apiSuccess {String}    task.name             task' name.
 * @apiSuccess {Number}    task.duration         task's duration.
 * @apiSuccess {Object}    task.status           task's status.
 * @apiSuccess {Sting}     task.status.status    status' description.
 * @apiSuccess {Sting}     task.status.abr       status' abr.
 * @apiSuccess {String}    task.dhours           task's duration hours.
 * @apiSuccess {String}    task.dminutes         task's duration minutes.
 * @apiSuccess {String}    task.dseconds         task's duration seconds.
 * @apiSuccess {String}    task.chours           task's current hours.
 * @apiSuccess {String}    task.cminutes         task's current minutes.
 * @apiSuccess {String}    task.cseconds         task's current seconds.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "ok":true,
 *          "tasks":[
 *              {
 *                  "current_time":0
 *                  ,"startDate":"2019-09-08T18:46:27.000Z",
 *                  "_id":"5d754ca02ebb7a406b598d6a",
 *                  "name":"task",
 *                  "duration":3661000,
 *                  "status":
 *                  {
 *                      "status":"active",
 *                      "abr":"A"
 *                  },
 *                  "dhours":1,
 *                  "dminutes":1,
 *                  "dseconds":1,
 *                  "chours":0,
 *                  "cminutes":0,
 *                  "cseconds":0
 *              }
 *          ]
 *     }
 *
 * 
 * @apiError (Error 4XX) ValidationError  Error with all validation messages
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