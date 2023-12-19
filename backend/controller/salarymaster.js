const Salarymaster = require("../models/salary");


module.exports={
    GetSalarymaster:async(req,res)=>{
        try{
            const response = await Salarymaster.find({ isdeleted: { $ne: true } })
            .populate('purpose')
            res.status(200).json({
              success: true,
              message: "Salarymaster data get Successfully",
              data:response
            });
        }catch(err){
            res.status(500).json({
                success: false,
                message: "Failed to Get Salarymaster.",
                error: err.message,
            });
        }
    },
    AddSalarymaster: async (req, res) => {
      try {
        const { name, PurposeId, type, salarymasterId } = req.body;
        const existingSalaryMaster = await Salarymaster.findOne({ name: name });
    
        if (existingSalaryMaster) {
          if (existingSalaryMaster.isdeleted) {
            const updatedSalaryMaster = await Salarymaster.findOneAndUpdate(
              { name: name },
              { isdeleted: false },
              { new: true }
            );
            res.status(200).json({
              success: true,
              message: "Salary master added successfully.",
              data: updatedSalaryMaster,
            });
          } else {
            return res.status(409).json({
              success: false,
              message: "Salary master already exists.",
            });
          }
        } else {
          const newSalaryMaster = new Salarymaster({
            name,
            purpose: PurposeId,
            type,
            salarymasterId,
          });
    
          await newSalaryMaster.save();
    
          // Populate the fields and return the populated post
          const Salary = await Salarymaster.populate(newSalaryMaster, [
            { path: 'purpose' },
          ]);
    
          res.status(200).json({
            success: true,
            message: "Salary master added successfully.",
            data: Salary,
          });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Failed to add Salary Master.",
          error: err.message,
        });
      }
    },
    
    

            EditSalaryMaster: async (req, res) => {
              try {
                  const { name, purposeId, type, salarymasterId } = req.body;
                  const { id } = req.params;
          
                  // Use updateOne directly on the model to update the document
                  await Salarymaster.updateOne({ _id: id }, {
                      name,
                      purpose: purposeId,
                      type: type,
                      salarymasterId
                  });
          
                  const populatedSalary = await Salarymaster.findById(id)
                  .populate([
                    { path: 'purpose' },
                  ]);
                  res.status(200).json({
                      success: true,
                      message: "Salary master Edited successfully.",
                      data: populatedSalary,
                  });
              } catch (err) {
                  res.status(500).json({
                      success: false,
                      message: "Failed to Edit Salary Master.",
                      error: err.message,
                  });
              }
          },
          

    DeleteSalarymaster: async (req, res) => {
        try {
          const {id } = req.params;
    
          // Check if an Employeetype with the specified employeeid exists
          const existingPost = await Salarymaster.findOne({_id:id });
    
          if (!existingPost) {
            return res.status(404).json({
              success: false,
              message: "Salarymaster not found.",
              
            });
          }
         
         
         // Soft delete by updating isdeleted field
      await Salarymaster.updateOne({ _id: id }, { $set: { isdeleted: true } });
          res.status(200).json({
            success: true,
            message: "Deleted successfully.",
          });
        } catch (err) {
          res.status(500).json({
            success: false,
            message: "Failed to delete Salarymaster.",
            error: err.message,
          });
        }
      },
      GetsalarymasterCount : async (req, res) => {
        try {
          const SalarymasterCount = await Salarymaster.countDocuments();
          
          res.status(200).json({
            success: true,
            message: "Account type count retrieved successfully.",
            data: { count: SalarymasterCount },
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