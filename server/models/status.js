const mongoose= require('mongoose');
const uniqueValidator= require('mongoose-unique-validator');

let Schema=mongoose.Schema;

let statusSchema= new Schema({    
    status:{
        type: String,
        unique:true,
        required:[true,'{PATH} is required']
    },
    abr:{
        type: String,
        unique:true,
        required:[true,'{PATH} is required']
    }
});


statusSchema.plugin(uniqueValidator,{message: '{PATH} can\'t be duplicated'})

statusSchema.methods.toJSON = function () {
    let status = this.toObject();
    delete status.__v;
    return status
}

module.exports=mongoose.model('status',statusSchema);