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
   

})
const Employeetype = mongoose.model('Employeetype',EmployeetypeSchema);
module.exports=Employeetype;
