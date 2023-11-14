const Unit = require("../models/Unit");

module.exports={
    GetUnit:async(req,res)=>{
        try{
            const response= await Unit.find({ isdeleted: { $ne: true } })
            console.log("Unit data get Successfully");
            res.status(200).json({
              success: true,
              message: "Unit data get Successfully",
              data:response
            });
        }catch(err){
            res.status(500).json({
                success: false,
                message: "Failed to Get Unit.",
                error: err.message,
            });
        }
    },
    AddUnit:async(req,res)=>{
        try{
            const data = req.body;
            const existingUnit = await Unit.findOne({ unitid: data.unitid });

            if (existingUnit) {
              return res.status(409).json({
                success: false,
                message: "Unit already exists.",
              });
            }
            const newUnit = new Unit(data)
            await newUnit.save()

            console.log("Unit Added Successfully");
          res.status(200).json({
            success: true,
            message: "Unit added successfully.",
            data:newUnit
          });

        }catch(err){
            res.status(500).json({
                success: false,
                message: "Failed to add Unit.",
                error: err.message,
            });
        }
    },
    EditUnit: async (req, res) => {
        try {
          const data = req.body;
          const {id } = req.params;
    
          // Check if an Employeetype with the specified employeeid exists
          const existingUnit = await Unit.findOne({_id:id});
    
          if (!existingUnit) {
            return res.status(404).json({
              success: false,
              message: "Unit not found.",
            });
          }
    
          // Update the existing Employeetype with new data
          await Unit.updateOne({ _id: id }, data);
          // await Unit.updateOne(data);
    
          console.log("Unit Edited Successfully");
          res.status(200).json({
            success: true,
            message: "Unit edited successfully.",
          });
        } catch (err) {
          res.status(500).json({
            success: false,
            message: "Failed to edit Unit.",
            error: err.message,
          });
        }
      },
    
      DeleteUnit: async (req, res) => {
        try {
          const {id } = req.params;
    
          // Check if an Employeetype with the specified employeeid exists
          const existingUnit = await Unit.findOne({_id:id });
    
          if (!existingUnit) {
            return res.status(404).json({
              success: false,
              message: "Unit not found.",
            });
          }
    
          // Delete the existing Employeetype
          await Unit.updateOne({ _id: id }, { $set: { isdeleted: true } });
          res.status(200).json({
            success: true,
            message: "Unit deleted successfully.",
          });
        } catch (err) {
          res.status(500).json({
            success: false,
            message: "Failed to delete Unit.",
            error: err.message,
          });
        }
      },
}