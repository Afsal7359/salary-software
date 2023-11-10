const mongoose = require('mongoose');

const operationalSchema= new mongoose.Schema({
    operationalid:{
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
const newoperational = mongoose.model('operational',operationalSchema);
module.exports=newoperational;
