const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: [true, '{PATH} is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, '{PATH} is required']
    }
});

userSchema.plugin(uniqueValidator, { message: '{PATH} can\'t be duplicated' })

userSchema.methods.toJSON = function () {
    let user = this.toObject();
    delete user.__v;
    return user
}

module.exports = mongoose.model('user', userSchema);