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
    phone:{
        type:Number,
        require:true,
        trim:true,
    },
    isdeleted:{
        type:Boolean,
        require:true,
        default:false
    }
});
const Bankmaster = mongoose.model('Bankmaster',bankSchema);
module.exports=Bankmaster;