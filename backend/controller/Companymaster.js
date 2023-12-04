const Company = require("../models/Companymaster");
const  cloudinary= require("../util/cloudinary");

module.exports={

    Addcompany: async (req, res) => {
        try {
            console.log('req',req.body);
        if (req.body) {
            const { name,email,phone,gst,address,password,pincode } = req.body;
            const image = req.body.image
            const result = await cloudinary.uploader.upload(image);
            const imageurl = result.url
    
            await Company.create({ name,email,phone,gst,address,password,pincode, image: imageurl });
            console.log('sucessfull saved');
            const companyData = await Company.findOneAndUpdate(
                { name:name },
                { isdeleted: false },
                { new: true } 
              );
            res.status(200).json({
                success: true,
                message: "Company Added successfully.",
                data: companyData,
              });
        } else {
          
            console.log("No file uploaded.");
        }
    
        console.log("Company Added ...");
       
        } catch (err) {
        console.log(err);
        }
    },
    GetAllCompany: async(req,res) => {
        try{
        const response = await Company.find().sort({_id: -1})
        res.status(200).json({
            success:true,
            message:'Company Data Get Sucessfully',
            data:response
        });
       }catch(err){
        res.status(500).json({
            success:false,
            message:"failed to Get Company data",
            error:err.message
        });
       }

    }
}
