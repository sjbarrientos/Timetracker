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

module.exports=mongoose.model('status',statusSchema);