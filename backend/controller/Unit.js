const Unit = require("../models/Unit");

module.exports={
    GetUnit:async(req,res)=>{
        try{
            const response= await Unit.find()
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
            const newUnit = new Unit(data)

            await newUnit.save()

            console.log("Unit Added Successfully");
          res.status(200).json({
            success: true,
            message: "Unit added successfully.",
          });

        }catch(err){
            res.status(500).json({
                success: false,
                message: "Failed to add Unit.",
                error: err.message,
            });
        }
    },
}