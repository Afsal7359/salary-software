const mongoose = require('mongoose');

const designationSchema = new mongoose.Schema({
     designationid:{
       type: String,
       require:true,
       trim:true
      },
      name: {
        type: String,
        require: true,
        trim: true,
      },
      isdeleted:{
        type:Boolean,
        require:true,
        default:false
    }
  
 
});

const Designation = mongoose.model('Designation', designationSchema);
module.exports = Designation;
