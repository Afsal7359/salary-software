const mongoose = require('mongoose');

const EmployeetypeSchema= new mongoose.Schema({
    employeeid:{
        type: String,
        require:true,
        trim:true
    },
    name:{
        type: String,
        require:true,
        trim:true
    },
    isdeleted:{
        type:Boolean,
        require:true,
        default:false
    }
   

})
const Employeetype = mongoose.model('Employeetype',EmployeetypeSchema);
module.exports=Employeetype;
