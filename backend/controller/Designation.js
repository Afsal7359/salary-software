const Designation = require("../models/Designation");

module.exports={
    GetDesignation:async(req,res)=>{
        try{
            const response= await Designation.find({ isdeleted: { $ne: true } })
            console.log("Designation data get Successfully");
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
    AddDesignation:async(req,res)=>{
        try{
            const data = req.body;

            const existingDesignation = await Designation.findOne({ name: data.name});

            if (existingDesignation) {
              return res.status(409).json({
                success: false,
                message: "Designation already exists.",
              });
            }
            const newDesignation = new Designation(data)

            await newDesignation.save()

            console.log("Designation Added Successfully");
          res.status(200).json({
            success: true,
            message: "Designation added successfully.",
            data:newDesignation
          });

        }catch(err){
            res.status(500).json({
                success: false,
                message: "Failed to add Designation.",
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
          console.log("Designation Edited Successfully");
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
}