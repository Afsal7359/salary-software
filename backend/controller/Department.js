const Department = require("../models/Department");

module.exports={

    GetDepartment:async(req,res)=>{
        try{
            const response= await Department.find({ isdeleted: { $ne: true } })
            console.log("Department data get Successfully");
            res.status(200).json({
              success: true,
              message: "Department data get Successfully",
              data:response
            });
        }catch(err){
            res.status(500).json({
                success: false,
                message: "Failed to Get Department.",
                error: err.message,
            });
        }
    },
    AddDepartment:async(req,res)=>{
      try {
        const data = req.body;
        const existingDepartment = await Department.findOne({ name: data.name });
    
        if (existingDepartment && existingDepartment.isdeleted) {
          // Update the isdeleted flag to false and get the updated document
          const updatedDepartment = await Department.findOneAndUpdate(
            { name: data.name },
            { isdeleted: false },
            { new: true } // To get the updated document
          );
    
          console.log("Department Added successfully.");
          res.status(200).json({
            success: true,
            message: "Department Added successfully.",
            data: updatedDepartment,
          });
        } else if (existingDepartment) {
          return res.status(409).json({
            success: false,
            message: "Department already exists.",
          });
        } else {
          const newAccountType = new Department(data);
          await newAccountType.save();
    
          console.log("Department added successfully.");
          res.status(200).json({
            success: true,
            message: "Department added successfully.",
            data: newAccountType,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error.",
        });
      }
    },
    UpdateDepartment:async(req,res)=>{
        try{
            const {id}=req.params;
            const data=req.body;

            const existingDepartment = await Department.findOne({_id:id});
    
            if (!existingDepartment) {
              return res.status(404).json({
                success: false,
                message: "Designation not found.",
              });
            }

            await Department.updateOne({ _id: id }, data);
            res.json({
                success: true,
                message: "Department edited successfully."
            });

        }catch(err){
            res.status(500).json({
                success: false,
                message: "Failed to Update company.",
                error: err.message,
            });
        }
    },
    DeleteDepartment: async (req, res) => {
        try {
          const {id } = req.params;
    
          // Check if an Employeetype with the specified employeeid exists
          const existingDepartment = await Department.findOne({_id:id });
    
          if (!existingDepartment) {
            return res.status(404).json({
              success: false,
              message: "Department not found.",
            });
          }
    
          // Delete the existing Employeetype
          await Department.updateOne({ _id: id }, { $set: { isdeleted: true } });
          res.status(200).json({
            success: true,
            message: "Department deleted successfully.",
          });
        } catch (err) {
          res.status(500).json({
            success: false,
            message: "Failed to delete Department.",
            error: err.message,
          });
        }
      },
}