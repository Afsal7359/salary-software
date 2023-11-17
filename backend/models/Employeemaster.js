const mongoose = require('mongoose');

const EmployeeSchema= new mongoose.Schema({
    employeeid:{
        type: String,
      
        trim:true
    },
    name:{
        type: String,
       
        trim:true
    },
    EmployeeTypeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employeetype', // This should be the model name that you want to reference
       
    },
    PostId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', // This should be the model name that you want to reference
       
    },
    employeeno:{
        type: String,
       
        trim:true
    },
    address1:{
        type: String,
        
        trim:true
    },
    address2:{
        type: String,
        trim:true
    },
    address3:{
        type: String,
        trim:true
    },
    email:{
        type: String,
     
        trim:true
    },
    phone:{
        type: Number,
       
        trim:true
    },
    bank:{
        type: String,
     
        trim:true
    },
    branch:{
        type: String,
      
        trim:true
    },
    accountNo:{
        type: String,
       
        trim:true
    },
    ifsc:{
        type: String,
      
        trim:true
    },
    panNo:{
        type: String,
       
        trim:true
    },
    panName:{
        type: String,
      
        trim:true
    },
    dateOfBirth:{
        type: String,
       
        trim:true
    },
    dateOfJoining:{
        type: String,
        
        trim:true
    },
    guardianName :{
        type: String,
      
        trim:true
    },
    basicSalary:{
        type: String,
        
        trim:true
    },
   
    gender:{
        type: String,
      
        trim:true
    },
    universalAcNo:{
        type: String,
      
        trim:true
    },
    city:{
        type: String,
       
        trim:true
    },
    country:{
        type: String,
      
        trim:true
    },

    tablerow: [{
        id: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
        salaryComponent: {
            type: mongoose.Schema.Types.ObjectId,
        ref: 'Salarymaster', // This should be the model name that you want to reference
       
        },
        percentage: {
            type: Number,
            
        },
        value: {
            type: String,
         
        },
        price: {
            type: Number,
            required: true
        }
    }],
   
    
    TotalSalary:{
        type:Number
    },

    
    

})
const Employee = mongoose.model('Employee',EmployeeSchema);
module.exports=Employee;

