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
   

})
const newtype = mongoose.model('type',TypeSchema);
module.exports=newtype;
