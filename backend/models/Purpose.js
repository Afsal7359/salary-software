const mongoose = require('mongoose');

const PurposeSchema= new mongoose.Schema({
    Purposeid:{
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
const Purposedata = mongoose.model('Purpose',PurposeSchema);
module.exports=Purposedata;
