const mongoose = require('mongoose');


const SalarybillSchema = new mongoose.Schema({
    SalaryBillNo:{
        type: String,
        trim:true
    },
    absentDays:{
        type:Number,
    },

    allowedleave:{
        type:Number,
    },
    date:{
        type:String,
    },

    basicSalary:{
        type:String,
        require:true
    },
    totaldeduction:{
        type:String,
    },
    totalincrement:{
        type:String,
    },
    totalcontribution:{
        type:Array,
        
    },
    
    departmentid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    },

    employeeid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    employeeTypeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employeetype'
    },

    unitid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Unit'
    },

    tablerow: {
        type: [{
            id: {
                type:Number,
            },
            salaryComponent: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Salarymaster',
                default: null,
            },
            percentage: {
                type: Number,
            },
            value: {
                type: String,
            },
            price: {
                type: Number,
            }
        }],
        default: []
    },
    totalAmount :{
        type:Number,
        require:true
    },
    EPFWage:{
        type: Number,
    },
    EPFContri:{
        type:Number,
    },
    EPSWage:{
        type:Number,
    },
    EPSContri:{
        type:Number
    },
    EPSEPFDiff:{
        type:Number
    },
    EDLIWage:{
        type:Number
    },
    isdeleted:{
        type:Boolean,
        require:true,
        default:false
    }

},{timestamps:true});
const SalaryBill = mongoose.model('SalaryBill',SalarybillSchema);
module.exports= SalaryBill;