const mongoose=require('mongoose');

const UnitSchema=new mongoose.Schema({
    
    name:{
        type:String,
        require:true,
        trim:true
    }

})
const Unit = mongoose.model('Unit',UnitSchema);
module.exports=Unit