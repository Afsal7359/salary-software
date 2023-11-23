const Designation = require("../models/Designation");

module.exports={
    GetDesignation:async(req,res)=>{
        try{
            const response= await Designation.find({ isdeleted: { $ne: true } }).sort({_id:-1})
            res.status(200).json({
              success: true,
              message: "Designation data get Successfully",
              data:response
            });
        }catch(err){
            res.status(500).json({
                success: false,
                message: "Failed to Get Designation.",
                error: err.message,
            });
        }
    },
    AddDesignation: async (req, res) => {
      try {
        const data = req.body;
        const existingDesignation = await Designation.findOne({ name: data.name });
    
        if (existingDesignation && existingDesignation.isdeleted) {
          // Update the isdeleted flag to false and get the updated document
          const updatedDesignation = await Designation.findOneAndUpdate(
            { name: data.name },
            { isdeleted: false },
            { new: true } // To get the updated document
          );
          res.status(200).json({
            success: true,
            message: "Designation added successfully.",
            data: updatedDesignation,
          });
        } else if (existingDesignation) {
          return res.status(409).json({
            success: false,
            message: "Designation already exists.",
          });
        } else {
          const newDesignation = new Designation(data);
          await newDesignation.save();
          res.status(200).json({
            success: true,
            message: "Designation added successfully.",
            data: newDesignation,
          });
        }
      } catch (err) {
        res.status(500).json({
          success: false,
          message: "Failed to add/update Designation.",
          error: err.message,
        });
      }
    },
    
    EditDesignation: async (req, res) => {
        try {
          const data = req.body;
          const {id } = req.params;
    
          // Check if an Employeetype with the specified employeeid exists
          const existingDesignation = await Designation.findOne({_id:id});
    
          if (!existingDesignation) {
            return res.status(404).json({
              success: false,
              message: "Designation not found.",
            });
          }
    
          // Update the existing Employeetype with new data
          await Designation.updateOne({ _id: id }, data);
          res.status(200).json({
            success: true,
            message: "Designation edited successfully.",
          });
        } catch (err) {
          res.status(500).json({
            success: false,
            message: "Failed to edit Designation.",
            error: err.message,
          });
        }
      },
    
      DeleteDesignation: async (req, res) => {
        try {
          const {id } = req.params;
    
          // Check if an Employeetype with the specified employeeid exists
          const existingDesignation= await Designation.findOne({_id:id });
    
          if (!existingDesignation) {
            return res.status(404).json({
              success: false,
              message: "Designation not found.",
            });
          }
    
          // Delete the existing Employeetype
          await Designation.updateOne({ _id: id }, { $set: { isdeleted: true } });
          res.status(200).json({
            success: true,
            message: "Designation deleted successfully.",
          });
        } catch (err) {
          res.status(500).json({
            success: false,
            message: "Failed to delete Designation.",
            error: err.message,
          });
        }
      },
      GetallDesignationCount : async (req, res) => {
        try {
          const DesignationCount = await Designation.countDocuments();
          
          res.status(200).json({
            success: true,
            message: "Designation count retrieved successfully.",
            data: { count: DesignationCount },
          });
        } catch (error) {
          console.error("Error:", error);
          res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
          });
        }
      }
}