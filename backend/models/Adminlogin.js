const mongoose = require('mongoose')

const AdminLoginSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        trim:true,
    },
    username:{
        type:String,
        require:true,
        trim:true,
    },
    password:{
        type:String,
        require:true,
        trim:true,
    }
});
const AdminLogin = mongoose.model('AdminLogin',AdminLoginSchema);
module.exports=AdminLogin;