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

    departmentid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    },

    employeeid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
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
    isdeleted:{
        type:Boolean,
        require:true,
        default:false
    }

},{timestamps:true});
const SalaryBill = mongoose.model('SalaryBill',SalarybillSchema);
module.exports= SalaryBill;