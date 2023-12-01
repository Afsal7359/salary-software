const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String ,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    pincode:{
        type:String,
        require:true,
    },
    gst:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true,
    }

})
const Company =  mongoose.model('company',CompanySchema);
module.exports=Company;