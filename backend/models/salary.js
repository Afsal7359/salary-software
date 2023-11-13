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
        ref: 'Purpose', // This should be the model name that you want to reference
        require: true,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'type', // This should be the model name that you want to reference
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
