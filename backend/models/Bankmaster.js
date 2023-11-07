const mongoose = require('mongoose');

const bankSchema= new mongoose.Schema({
    bankid:{
        type:String,
        require:true,
        trim:true,
    },
    name:{
        type:String,
        require:true,
        trim:true,
    },
    address:{
        type:String,
        require:true,
        trim:true,
    },
    branch:{
        type:String,
        require:true,
        trim:true,
    },
    number:{
        type:Number,
        require:true,
        trim:true,
    },
});
const Bankmaster = mongoose.model('Bankmaster',bankSchema);
module.exports=Bankmaster;