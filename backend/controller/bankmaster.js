const Bankmaster = require("../models/bankmaster");


module.exports={

    GetBankMaster:async(req,res)=>{
        try{
            const response= await Bankmaster.find()
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
        try {
          const data= req.body;
          const newBank = new Bankmaster(data)
       
      
          await newBank.save();
      
          console.log("Bank Added Successfully");
          res.status(200).json({
            success: true,
            message: "Bank added successfully.",
          });
        } catch (err) {
         res.status(500).json({
                success: false,
                message: "Failed to add Bank.",
                error: err.message,
            });
        }
      },
      


}
