const mongoose = require('mongoose');

const EmployeeSchema= new mongoose.Schema({
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
    type:{
        type: String,
        require:true,
        trim:true
    },
    post:{
        type: String,
        require:true,
        trim:true
    },
    employeeno:{
        type: String,
        require:true,
        trim:true
    },
    address1:{
        type: String,
        require:true,
        trim:true
    },
    address2:{
        type: String,
        trim:true
    },
    address3:{
        require:true,
        trim:true
    },
    email:{
        type: String,
        require:true,
        trim:true
    },
    phone:{
        type: Number,
        require:true,
        trim:true
    },
    bank:{
        type: String,
        require:true,
        trim:true
    },
    branch:{
        type: String,
        require:true,
        trim:true
    },
    accountno:{
        type: String,
        require:true,
        trim:true
    },
    ifsc:{
        type: String,
        require:true,
        trim:true
    },
    pancard:{
        type: String,
        require:true,
        trim:true
    },
    panname:{
        type: String,
        require:true,
        trim:true
    },
    dof:{
        type: String,
        require:true,
        trim:true
    },
    dob:{
        type: String,
        require:true,
        trim:true
    },
    guardianname :{
        type: String,
        require:true,
        trim:true
    },
    basicsalary:{
        type: String,
        require:true,
        trim:true
    },
    universalacno:{
        type: String,
        require:true,
        trim:true
    },
    maritalstatus:{
        type: String,
        require:true,
        trim:true
    },
    

})
const Employee = mongoose.model('Employee',EmployeeSchema);
module.exports=Employee;
