const mongoose=require('mongoose');

const UnitSchema=new mongoose.Schema({
    unitid:{
        type: String,
        require:true,
        trim:true
    },
    name:{
        type:String,
        require:true,
        trim:true
    },
    isdeleted:{
        type:Boolean,
        require:true,
        default:false
    }

})
const Unit = mongoose.model('Unit',UnitSchema);
module.exports=Unit