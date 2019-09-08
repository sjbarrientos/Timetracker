const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let taskSchema = new Schema({
    name: {
        type: String
    },
    hours: {
        type: Number,
        required: [true, '{PATH} is required']
    },
    minutes: {
        type: Number,
        required: [true, '{PATH} is required']
    },
    seconds: {
        type: Number,
        required: [true, '{PATH} is required']
    },
    current_time: {
        type: Number
    },
    startDate:{
     type:Date,
     default:Date()   
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
    // ,
    // project:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'status'
    // }

});

module.exports = mongoose.model('task', taskSchema);