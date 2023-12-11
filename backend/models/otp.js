const mongoose = require('mongoose');

const otpSchema= new mongoose.Schema({
    otp:{
        type: String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    }
   
   

})
const  otps = mongoose.model('otp',otpSchema);
module.exports=otps;
