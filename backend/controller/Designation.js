const Designation = require("../models/Designation");

module.exports={
    GetDesignation:async(req,res)=>{
        try{
            const response= await Designation.find()
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
            const newDesignation = new Designation(data)

            await newDesignation.save()

            console.log("Designation Added Successfully");
          res.status(200).json({
            success: true,
            message: "Designation added successfully.",
          });

        }catch(err){
            res.status(500).json({
                success: false,
                message: "Failed to add Designation.",
                error: err.message,
            });
        }
    },
}