const mongoose =require('mongoose');

const SuperAdminSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        trim:true,
    },
    password:{
        type:String,
        require:true,
        trim:true,
    },
})
const Superadmin = mongoose.model('superadmin',SuperAdminSchema);
module.exports = Superadmin