const AdminLogin = require("../models/Adminlogin");

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
    
}