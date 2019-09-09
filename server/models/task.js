const mongoose = require('mongoose');

let Utils = require('../utils/utils');

let Schema = mongoose.Schema;

let taskSchema = new Schema({
    name: {
        type: String
    },
    duration: {
        type: Number,
        required: [true, '{PATH} is required']
    },
    current_time: {
        type: Number,
        default: 0
    },
    startDate: {
        type: Date,
        default: Date()
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: 'status',
        required: [true, '{PATH} is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, '{PATH} is required']
    }
    ,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'project'
    }

});
taskSchema.methods.toJSON = function () {
    let task = this.toObject();

    let time = Utils.milisecondsToTime(task.duration);
    task.dhours = time.h;
    task.dminutes = time.m;
    task.dseconds = time.s;

    time = Utils.milisecondsToTime(task.current_time);
    task.chours = time.h;
    task.cminutes = time.m;
    task.cseconds = time.s;
    delete task.__v;
    delete task.status._id;

    return task
}
module.exports = mongoose.model('task', taskSchema);