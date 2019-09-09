const express = require('express');
const app = express();

const httpStatus = require('http-status-codes');


const Project = require('../models/project');
const Task = require('../models/task');
const TaskUtils = require('../utils/task.utils');
const Utils = require('../utils/utils');

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
        let tasks = [];
        let errors = [];
        let arrTask = body.tasks.split(',');

        let projectDB = (await project.save()).toObject();
        delete projectDB.user;

        for (let i = 0; i < arrTask.length; i++) {
            let task_id = arrTask[i];

            let data = {
                project: projectDB._id
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
            project: projectDB,
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
/**
 * @api {post} /api/project/list List all projects
 * @apiVersion 1.0.0
 * @apiGroup Project
 *
 * @apiDescription return all projects with information about project's time, project's working time, users and working time by user
 * 
 *  
 * @apiSuccess {Boolean}      ok                             status
 * @apiSuccess {Object[]}     project                        project's list 
 * @apiSuccess {String}       project._id                    project id.
 * @apiSuccess {String}       project.name                   project name.
 * @apiSuccess {Date}         project.created_date           project start date.
 * @apiSuccess {Number}       project.time_project           project's time
 * @apiSuccess {Number}       project.time_project_h         project's time in hours.
 * @apiSuccess {Number}       project.time_project_m         project's time in minutes.
 * @apiSuccess {Number}       project.time_project_s         project's time in seconds.
 * @apiSuccess {Number}       project.current_time           project's working time.
 * @apiSuccess {Number}       project.current_time_h         project's working time in hours.
 * @apiSuccess {Number}       project.current_time_m         project's working time in minutes.
 * @apiSuccess {Number}       project.current_time_s         project's working time in seconds.
 * @apiSuccess {Object[]}     project.users                  project users.
 * @apiSuccess {Sting}        project.users.username         username.
 * @apiSuccess {Sting}        project.users.current_time     user's working time. 
 * @apiSuccess {Number}       project.users.current_time_h         user's working time in hours.
 * @apiSuccess {Number}       project.users.current_time_m         user's working time in minutes.
 * @apiSuccess {Number}       project.users.current_time_s         user's working time in seconds.
 * 
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "ok": true,
 *        "projects": [        
 *            {
 *                "created_date": "2019-09-09T01:34:39.370Z",
 *                "_id": "5d75ac9597bf00560118e32c",
 *                "name": "project2",
 *                "user": "5d75350e24d7433e90fa23e0",
 *                "__v": 0,
 *                "time_project": 7322000,
 *                "time_project_h": 2,
 *                "time_project_m": 2,
 *                "time_project_s": 2,
 *                "current_time": 363725,
 *                "current_time_h": 0,
 *                "current_time_m": 6,
 *                "current_time_s": 3,
 *                "users": [
 *                    {
 *                        "username": "sj2",
 *                        "current_time": 363725,
 *                        "current_time_h": 0,
 *                        "current_time_m": 6,
 *                        "current_time_s": 3
 *                    }
 *                ]
 *            }
 *        ]
 *    }
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
app.get('/api/project/list', async (req, res) => {
    try {

        let projects = await Project.find({}).sort('_id');
        let tasks = await Task.find({}).populate('user').sort('poject');

        for (let i = 0; i < projects.length; i++) {

            let project = projects[i].toObject();
            let p = String(project._id);

            let temp_task = tasks.filter(task => task.project == p);

            let time_project = temp_task.reduce((sum, val) => (sum + val.duration), 0);
            let current_time = temp_task.reduce((sum, val) => (sum + val.current_time), 0);

            let users = temp_task.map((task) => {
                return task.user.username
            }).filter((user, index, arr_users) => {
                let indexUsr = arr_users.indexOf(user);

                if (index === indexUsr) {
                    return true;
                } else {
                    return false;
                }
            }).map((usr) => {
                let current_time = temp_task.filter(task => task.user.username == usr)
                    .reduce((sum, val) => (sum + val.current_time), 0);
                let t_current = Utils.milisecondsToTime(current_time);
                return {
                    username: usr,
                    current_time,
                    current_time_h: t_current.h,
                    current_time_m: t_current.m,
                    current_time_s: t_current.s,
                }
            });
            let t_project = Utils.milisecondsToTime(time_project);
            let t_current = Utils.milisecondsToTime(current_time);

            let data = {
                ...project,
                time_project,
                time_project_h: t_project.h,
                time_project_m: t_project.m,
                time_project_s: t_project.s,
                current_time,
                current_time_h: t_current.h,
                current_time_m: t_current.m,
                current_time_s: t_current.s,
                users
            }
            projects[i] = data;

        }

        return res.json({
            ok: true,
            projects
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