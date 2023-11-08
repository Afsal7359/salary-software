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
    }

})
const Department = mongoose.model('Department',DepartmentSchema);
module.exports=Department