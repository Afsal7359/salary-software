const mongoose = require('mongoose');

const TypeSchema= new mongoose.Schema({
    Typeid:{
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
const newtype = mongoose.model('type',TypeSchema);
module.exports=newtype;
