const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let projectSchema = new Schema({
    name: {
        type: String,
        required: [true, '{PATH} is required']
    },
    created_date: {
        type: Date,
        default: new Date()
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, '{PATH} is required']
    }
});

module.exports = mongoose.model('project', projectSchema);