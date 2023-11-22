const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({

    salarymasterId:{
        type: String,
        require:true,
        trim:true
    },
    name:{
        type:String,
        require:true,
        trim:true
    
    },
    purpose: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Purpose', 
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
 
   
    isdeleted:{
        type:Boolean,
        require:true,
        default:false
    }
});

const Salarymaster = mongoose.model('Salarymaster', SalarySchema);
module.exports = Salarymaster;
