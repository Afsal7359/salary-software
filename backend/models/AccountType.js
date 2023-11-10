const mongoose = require('mongoose');

const AccountTypeSchema= new mongoose.Schema({
    accounttypeid:{
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
const newaccounttype = mongoose.model('accounttype',AccountTypeSchema);
module.exports=newaccounttype;
