const Department = require("../models/Department");

module.exports={

    GetDepartment:async(req,res)=>{
        try{
            const response= await Department.find()
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
        try{
            const data = req.body;
            const newDepartment = new Department(data)

            await newDepartment.save()

            console.log("Department Added Successfully");
          res.status(200).json({
            success: true,
            message: "Department added successfully.",
          });

        }catch(err){
            res.status(500).json({
                success: false,
                message: "Failed to add Department.",
                error: err.message,
            });
        }
    },
    UpdateDepartment:async(req,res)=>{
        try{
            const {id}=req.params;
            const {name}=req.body;

            await Department.findByIdAndUpdate(
               { _id : id},
                {name},
                {new:true}
            )
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
}