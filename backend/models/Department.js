const mongoose=require('mongoose');

const DepartmentSchema=new mongoose.Schema({
    Departmentid:{
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
const Department = mongoose.model('Department',DepartmentSchema);
module.exports=Department