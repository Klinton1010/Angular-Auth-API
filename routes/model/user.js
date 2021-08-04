const mangoose=require('mongoose');

const Schema= mangoose.Schema;

const userSchema=new Schema({
    email:String,
    password:String

})
module.exports=mangoose.model('user',userSchema,'users');

//mongodb+srv://klinton:<password>@eventdb.h3ket.mongodb.net/myFirstDatabase?retryWrites=true&w=majority