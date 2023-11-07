const mongoose = require('mongoose');

const designationSchema = new mongoose.Schema({
 
      name: {
        type: String,
        require: true,
        trim: true,
      },
     
  
 
});

const Designation = mongoose.model('Designation', designationSchema);
module.exports = Designation;
