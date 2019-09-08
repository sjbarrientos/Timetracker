const express = require('express');
const app = express();

const httpStatus = require('http-status-codes');

const Task = require('../models/task');
const Status = require('../models/status');

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
 * @apiSuccess {String}    task._id              task's id.
 * @apiSuccess {Date}      task.startDate        task's start date.
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
 *          "taks":{
 *              "_id":"id",
 *              "startDate":"2019-09-08T04:51:18.766Z" 
 *              "name":"task's name",
 *              "hours":1,
 *              "minutes":1,
 *              "seconds":1,
 *              "status": {
 *                  "status": "active",
 *                  "abr": "A"
 *              }
 *     }
 *
 * 
 * @apiError (Error 4XX) ValidationError  
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
        let task = new Task({
            name: body.name,
            hours: body.hours,
            minutes: body.minutes,
            seconds: body.seconds,
            status: status ? status._id : undefined,
            user: body.user_id

        });
        let taskDB = await task.save();
        await taskDB.populate('status').execPopulate();
        task = taskDB.toObject();
        delete task.user;
        delete task.__v;
        delete task.status._id;

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
 * @api {put} /api/task/:id Change task's status
 * @apiVersion 1.0.0
 * @apiGroup Task
 *
 * @apiDescription Change task's status
 * 
 * @apiParam {String} id             user's id.
 * @apiParam {String} new_status     new status.
 *
 * @apiSuccess {Boolean}   ok                    status
 * @apiSuccess {Object}    task                  task
 * @apiSuccess {String}    task._id              task's id.
 * @apiSuccess {Date}      task.startDate        task's start date.
 * @apiSuccess {String}    task.name             task' name.
 * @apiSuccess {String}    task.hours            task's hours.
 * @apiSuccess {String}    task.minutes          task's minutes.
 * @apiSuccess {String}    task.seconds          task's seconds.
 * @apiSuccess {Numeric}   task.current_time     task's curent time.
 * @apiSuccess {Object}    task.status           task's status.
 * @apiSuccess {Sting}     task.status.status    status' description.
 * @apiSuccess {Sting}     task.status.abr       status' abr.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "ok":true,
 *          "taks":{
 *              "_id":"id",
 *              "startDate":"2019-09-08T04:51:18.766Z"
 *              "name":"task's name",
 *              "hours":1,
 *              "minutes":1,
 *              "seconds":1,
 *              "current_time":0
 *              "status": {
 *                  "status": "active",
 *                  "abr": "A"
 *              }
 *     }
 *
 * 
 * @apiError (Error 4XX) ValidationError  
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

        let task = await Task.findById(id);
        if (!task)
            throw Error("Validation failed: id is required");
        let body = req.body;
        let status = await Status.findOne({ abr: body.new_status });

        let timer = task.current_time || 0;
        let current_date = new Date();
        if (status.abr === 'P') {
            let start_date = new Date(task.startDate);
            timer += (current_date.getTime() - start_date.getTime());
        }
        let data = {
            status: status ? status._id : undefined,
            current_time: timer,
            startDate: current_date
        }
        let taskDB = await Task.findByIdAndUpdate(task._id, data, { new: true, runValidators: true });
        await taskDB.populate('status').execPopulate();

        let taskObject = taskDB.toObject();
        delete taskObject.user;
        delete taskObject.__v;
        delete taskObject.status._id;

        return res.json({
            ok: true,
            task: taskObject
        });
    } catch (err) {
        return res.status(httpStatus.BAD_REQUEST).json({
            ok: false,
            err: err.name,
            message: err.message
        });
    }

});
//associate project
// app.put('/api/task/rel_project/', (req, res) => res.send('Hello World!'));

module.exports = app;