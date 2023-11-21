const mongoose = require('mongoose');

const BankaccountSchema = new mongoose.Schema({
    BankId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bankmaster', // This should be the model name that you want to reference
        required: true,
    },
    OperationalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'operational', // This should be the model name that you want to reference
        required: true,
    },
    accountTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'accounttype', // This should be the model name that you want to reference
        required: true,
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department', // This should be the model name that you want to reference
        required: true,
    },
    unitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit', // This should be the model name that you want to reference
        required: true,
    },
    bankAccountId:{
        type: String,
        require:true,
        trim:true
    },
    accountNo:{
        type: String,
        require:true,
        trim:true
    },
    isdeleted:{
        type:Boolean,
        require:true,
        default:false
    }
});

const BankAccount = mongoose.model('BankAccount', BankaccountSchema);
module.exports = BankAccount;