const AdminLogin = require("../models/Adminlogin");
const jwt = require('jsonwebtoken');


module.exports={
    AddAdmin: async (req, res) => {
        try {
            const data = req.body;
            console.log('data:', data);
            const newAdmin = new AdminLogin(data);
            await newAdmin.save();
    
            // Populate the fields and return the populated post
            const Admin = await AdminLogin.findById(newAdmin._id)    

            res.status(200).json({
                success: true,
                message: "Admin Added successfully.",
                data: Admin,
            });
    
            console.log('Added Successfully');
        } catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Failed to add Admin.",
                error: err.message,
            });
        }
    },

    GetAdmin: async(req,res)=>{
      
        const Admins=await AdminLogin.find()
       
        if(!Admins){
            return res.status(404).json({
                success:false,
                message:"No admin found."
                })
                }else{
                    res.status(200).json({
                        success:true,
                        count:Admins.length,
                        data:Admins,
                        message:"Data Get Successfully"
                        })
                  }
       
    },

    LoginAdmin: async(req,res)=>{
        try {
            let userInfo = req.body;
            console.log(userInfo,"req.body");
            const user = await AdminLogin.findOne({ username: req.body.username })
            if (user) {
                let validaPassword
                if(req.body.password===user.password){
                    validaPassword=true
                }else{
                    validaPassword=false
                }

                if (!validaPassword) {
                    throw new Error("Invalid password !");
                } else {
                    const tokens = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });
                    console.log(tokens,"tocken");
                    res.json({
                        success: true,
                        message: "logged in successfully",
                        data:tokens,
                    })
                }
            } else {
                throw new Error("user not found !!");
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false, 
                message: 'Server Error'
            })
        }
    }
    
}