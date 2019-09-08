const express = require('express');
const app = express();

const httpStatus = require('http-status-codes');

let Task = require('../models/task');
let Status = require('../models/status');

let TaskUtils = require('../utils/task.utils');
let Utils = require('../utils/utils');

//get task
app.get('/api/task/:id', (req, res) => res.send('Hello World!'));
/**
 * @api {post} /api/task/add Create new Task 
 * @apiVersion 1.0.0
 * @apiGroup Task
 *
 * @apiDescription Create new task
 * 
 * @apiParam {String} user_id     user's id.
 * @apiParam {String} name        task's name.
 * @apiParam {Number} hours       hours of the task.
 * @apiParam {Number} minutes     minutes of the task
 * @apiParam {Number} seconds     second of the task.
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
 * @apiSuccess {Number}    task.dhours           task's duration hours.
 * @apiSuccess {Number}    task.dminutes         task's duration minutes.
 * @apiSuccess {Number}    task.dseconds         task's duration seconds.
 * @apiSuccess {Number}    task.chours           task's current hours.
 * @apiSuccess {Number}    task.cminutes         task's current minutes.
 * @apiSuccess {Number}    task.cseconds         task's current seconds.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "ok":true,
 *          "task":
 *          {
 *              "current_time":0
 *              ,"startDate":"2019-09-08T18:46:27.000Z",
 *              "_id":"5d754ca02ebb7a406b598d6a",
 *              "name":"task",
 *              "duration":3661000,
 *              "status":
 *              {
 *                  "status":"active",
 *                  "abr":"A"
 *              },
 *              "dhours":1,
 *              "dminutes":1,
 *              "dseconds":1,
 *              "chours":0,
 *              "cminutes":0,
 *              "cseconds":0
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
 *          "message":"Task validation failed: hours: hours is required"
 * }
 */
app.post('/api/task/add', async (req, res) => {
    try {
        let body = req.body;
        let status = await Status.findOne({ abr: 'A' });

        let duration = Utils.timeToMiliseconds(Number(body.hours), Number(body.minutes), Number(body.seconds));

        let task = new Task({
            name: body.name,
            duration,
            status: status ? status._id : undefined,
            user: body.user_id

        });
        let taskDB = await task.save();
        await taskDB.populate('status').execPopulate();

        return res.json({
            ok: true,
            task: taskDB
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
 * @api {put} /api/task/:id Change task's status
 * @apiVersion 1.0.0
 * @apiGroup Task
 *
 * @apiDescription Change task's status
 * 
 * @apiParam {String} id             task's id.
 * @apiParam {String} new_status     new status.
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
 * @apiSuccess {String}    task.project          project's id.
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
 *          "task":
 *          {
 *              "current_time":0
 *              ,"startDate":"2019-09-08T18:46:27.000Z",
 *              "_id":"5d754ca02ebb7a406b598d6a",
 *              "name":"task",
 *              "duration":3661000,
 *              "status":
 *              {
 *                  "status":"active",
 *                  "abr":"A"
 *              },
 *              "project": "5d75746cb6c7724566271b90",
 *              "dhours":1,
 *              "dminutes":1,
 *              "dseconds":1,
 *              "chours":0,
 *              "cminutes":0,
 *              "cseconds":0
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
 *          "message":"Task validation failed: hours: hours is required"
 * }
 */
app.put('/api/task/:id', async (req, res) => {
    try {
        let id = req.params.id;

        let body = req.body;

        let data = {
            startDate: new Date()
        }

        let task = await TaskUtils.updateTask(id, body.new_status, data)
        return res.json({
            ok: true,
            task
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
 * @api {put} /api/task/restart/:id Restart task
 * @apiVersion 1.0.0
 * @apiGroup Task
 *
 * @apiDescription Reset the task's current time and put it in state active
 * 
 * @apiParam {String} id             task's id.
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
 * @apiSuccess {Number}    task.project          task's project id
 * @apiSuccess {Number}    task.dhours           task's duration hours.
 * @apiSuccess {Number}    task.dminutes         task's duration minutes.
 * @apiSuccess {Number}    task.dseconds         task's duration seconds.
 * @apiSuccess {Number}    task.chours           task's current hours.
 * @apiSuccess {Number}    task.cminutes         task's current minutes.
 * @apiSuccess {Number}    task.cseconds         task's current seconds.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "ok":true,
 *          "task":
 *          {
 *              "current_time":0
 *              ,"startDate":"2019-09-08T18:46:27.000Z",
 *              "_id":"5d754ca02ebb7a406b598d6a",
 *              "name":"task",
 *              "duration":3661000,
 *              "status":
 *              {
 *                  "status":"active",
 *                  "abr":"A"
 *              },
 *              "project": "5d75746cb6c7724566271b90",
 *              "dhours":1,
 *              "dminutes":1,
 *              "dseconds":1,
 *              "chours":0,
 *              "cminutes":0,
 *              "cseconds":0
 *          }
 *     }
 *
 * 
 * @apiError (Error 4XX) ValidationError  Error with all validation messages
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *          "ok":false,
 *          "err":"Error",
 *          "message":"Validation failed: id is required""
 * }
 */
app.put('/api/task/restart/:id', async (req, res) => {
    try {
        let id = req.params.id;

        let body = req.body;

        let data = {
            startDate: new Date()
        }

        let task = await TaskUtils.updateTask(id, 'A', data, true)
        return res.json({
            ok: true,
            task
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
//associate project
app.put('/api/task/rel_project/', (req, res) => res.send('Hello World!'));

module.exports = app;