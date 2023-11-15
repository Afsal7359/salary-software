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
    EmployeeTypeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'type', // This should be the model name that you want to reference
        required: true,
    },
    PostId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', // This should be the model name that you want to reference
        required: true,
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
    accountNo:{
        type: String,
        require:true,
        trim:true
    },
    ifsc:{
        type: String,
        require:true,
        trim:true
    },
    panNo:{
        type: String,
        require:true,
        trim:true
    },
    panName:{
        type: String,
        require:true,
        trim:true
    },
    dateOfBirth:{
        type: String,
        require:true,
        trim:true
    },
    dateOfJoining:{
        type: String,
        require:true,
        trim:true
    },
    guardianName :{
        type: String,
        require:true,
        trim:true
    },
    basicSalary:{
        type: String,
        require:true,
        trim:true
    },
   
    gender:{
        type: String,
        require:true,
        trim:true
    },
    universalAcNo:{
        type: String,
        require:true,
        trim:true
    },
    city:{
        type: String,
        require:true,
        trim:true
    },
    country:{
        type: String,
        require:true,
        trim:true
    },
    salarymasterId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salarymaster', // This should be the model name that you want to reference
        required: true,
    },
    SalaryCompPercantage:{
        type: Number, 
    },
    SalaryCompAmount:{
        type:Number
    },
    SalaryCompTotal:{
        type:Number
    },
    TotalSalary:{
        type:Number
    }
    
    

})
const Employee = mongoose.model('Employee',EmployeeSchema);
module.exports=Employee;

