const Superadmin = require("../models/SuperAdmin");
const jwt = require('jsonwebtoken');

module.exports={
    LoginSuperAdmin : async(req,res)=>{
        console.log('loginnnnnnnnnnnnnnnnnnn',req.body);
        try {
            const user = await Superadmin.findOne({ username: req.body.username })
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
                    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });
                    console.log(token,"tocken");
                    res.json({
                        success: true,
                        message: "user logged in successfully",
                        data:token,
                    })
                }
            } else {
                throw new Error("user not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
}