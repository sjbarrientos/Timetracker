const express = require('express');
const app = express();

const httpStatus = require('http-status-codes');

const Project = require('../models/project');
const TaskUtils = require('../utils/task.utils');

/**
 * @api {post} /api/project/add Create new Project
 * @apiVersion 1.0.0
 * @apiGroup Project
 *
 * @apiDescription Create new project
 * 
 * @apiParam {String} user_id     user's id.
 * @apiParam {String} name        task's name.
 * @apiParam {String} tasks       string with tasks' ids separate with comma (,)
 *
 * @apiSuccess {Boolean}   ok                      status
 * @apiSuccess {Object}    project                 project 
 * @apiSuccess {String}    project._id             project id.
 * @apiSuccess {String}    project.name            project name.
 * @apiSuccess {Date}      project.created_date    project start date.
 * @apiSuccess {Object[]}  task                    project 
 * @apiSuccess {Number}    task.duration           project duration.
 * @apiSuccess {Object}    task.status             project status.
 * @apiSuccess {Sting}     task.status.status      status description.
 * @apiSuccess {Sting}     task.status.abr         status abr.
 * @apiSuccess {String}    task.dhours             task duration hours.
 * @apiSuccess {String}    task.dminutes           task duration minutes.
 * @apiSuccess {String}    task.dseconds           task duration seconds.
 * @apiSuccess {String}    task.chours             task current hours.
 * @apiSuccess {String}    task.cminutes           task current minutes.
 * @apiSuccess {String}    task.cseconds           task current seconds.
 * @apiSuccess {Object[]}  errors                  object with task's id with error
 * @apiSuccess {String}    errors.id_task          task ID.
 * @apiSuccess {Object}    errors.error            Error 
 * @apiSuccess {String}    errors.error.err        Error mname.
 * @apiSuccess {String}    errors.error.message    Error message.
 * 
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "ok": true,
 *         "project": {
 *             "created_date": "2019-09-08T21:36:42.356Z",
 *             "_id": "5d75746cb6c7724566271b90",
 *             "name": "project1"
 *         },
 *         "tasks": [
 *             {
 *                 "current_time": 4711525,
 *                 "startDate": "2019-09-08T21:15:29.752Z",
 *                 "_id": "5d754ca02ebb7a406b598d6a",
 *                 "name": "task",
 *                 "duration": 3661000,
 *                 "status": {
 *                     "status": "paused",
 *                     "abr": "P"
 *                 },
 *                 "project": "5d75746cb6c7724566271b90",
 *                 "dhours": 1,
 *                 "dminutes": 1,
 *                 "dseconds": 1,
 *                 "chours": 1,
 *                 "cminutes": 18,
 *                 "cseconds": 31
 *             }
 *         ],
 *         "errors": [
 *             {
 *                 "id_task": "sdsd",
 *                 "error": {
 *                     "err": "CastError",
 *                     "message": "Cast to ObjectId failed for value \"sdsd\" at path \"_id\" for model \"task\""
 *                 }
 *             }
 *         ]
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
 *     }
 */
app.post('/api/project/add', async (req, res) => {
    try {
        let body = req.body;
        let project = new Project({
            name: body.name,
            user: body.user_id
        });

        let projectDB = await project.save();
        let tasks = [];
        let errors = [];
        let arrTask = body.tasks.split(',');

        let projectObj = projectDB.toObject();
        delete projectObj.user;
        delete projectObj.__v;

        for (let i = 0; i < arrTask.length; i++) {
            let task_id = arrTask[i];

            let data = {
                project: projectObj._id
            };
            try {
                let task = await TaskUtils.updateTask(task_id, null, data);
                tasks.push(task);
            } catch (err) {
                errors.push({
                    id_task: task_id,
                    error: {
                        err: err.name,
                        message: err.message
                    }
                });
            }
        }
        res.json({
            ok: true,
            project: projectObj,
            tasks,
            errors
        });
    } catch (err) {
        return res.status(httpStatus.BAD_REQUEST).json({
            ok: false,
            err: err.name,
            message: err.message
        });
    }


});


module.exports = app;