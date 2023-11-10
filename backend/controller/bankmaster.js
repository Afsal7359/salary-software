const Bankmaster = require("../models/bankmaster");


module.exports={

    GetBankMaster:async(req,res)=>{
        try{
            const response= await Bankmaster.find({ isdeleted: { $ne: true } })
            console.log("Bank data get Successfully");
            res.status(200).json({
              success: true,
              message: "Bank data get Successfully",
              data:response
            });
        }catch(err){
            res.status(500).json({
                success: false,
                message: "Failed to Get Bank.",
                error: err.message,
            });
        }
    },
    AddBankMaster: async (req, res) => { 
        try{
          const data = req.body;

          const existingBankmaster = await Bankmaster.findOne({ name: data.name });

          if (existingBankmaster) {
            return res.status(409).json({
              success: false,
              message: "Bankmaster already exists.",
            });
          }
          const newBankmaster = new Bankmaster(data)

          await newBankmaster.save()

          console.log("Bankmaster Added Successfully");
        res.status(200).json({
          success: true,
          message: "Bankmaster added successfully.",
          data:newBankmaster
        });

      }catch(err){
          res.status(500).json({
              success: false,
              message: "Failed to add Bankmaster.",
              error: err.message,
          });
      }
      },
      EditBankMaster: async (req, res) => {
        try {
          const data = req.body;
          const {id } = req.params;
          // Check if an Employeetype with the specified employeeid exists
          const existingBankMaster = await Bankmaster.findOne({_id:id});
    
          if (!existingBankMaster) {
            return res.status(404).json({
              success: false,
              message: "BankMaster not found.",
            });
          }
          // Update the existing Employeetype with new data
          await Bankmaster.updateOne({ _id: id }, data);
          console.log("BankMaster Edited Successfully");
          res.status(200).json({
            success: true,
            message: "BankMaster edited successfully.",
          });
        } catch (err) {
          res.status(500).json({
            success: false,
            message: "Failed to edit BankMaster.",
            error: err.message,
          });
        }
      },
      GetallBank:async(req,res)=>{
        try{
            const response= await Bankmaster.find({ isdeleted: { $ne: true } })
            console.log("Bankmaster data get Successfully");
            res.status(200).json({
              success: true,
              message: "Bankmaster data get Successfully",
              data:response
            });
        }catch(err){
            res.status(500).json({
                success: false,
                message: "Failed to Get Bankmaster.",
                error: err.message,
            });
        }
    },
    DeleteBank: async (req, res) => {
      try {
        const {id } = req.params;
  
        // Check if an Employeetype with the specified employeeid exists
        const existingBankmaster = await Bankmaster.findOne({_id:id });
  
        if (!existingBankmaster) {
          return res.status(404).json({
            success: false,
            message: "Bankmaster not found.",
            
          });
        }
       
       
       // Soft delete by updating isdeleted field
    await Bankmaster.updateOne({ _id: id }, { $set: { isdeleted: true } });
        console.log(" Deleted Successfully");
        res.status(200).json({
          success: true,
          message: "Deleted successfully.",
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          message: "Failed to delete Bankmaster.",
          error: err.message,
        });
      }
    },


}
