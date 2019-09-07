 const mongoose= require('mongoose');
 const uniqueValidator= require('mongoose-unique-validator');

 let Schema=mongoose.Schema;

 let userSchema= new Schema({
     username:{
         type:String,
         required:[true,'username is required']
     },
     email:{
         type: String,
         unique:true,
         required:[true,'email is required']
     }
 });

 userSchema.plugin(uniqueValidator,{message: '{PATH} can\'t be duplicated'})

 module.exports=mongoose.model('User',userSchema);