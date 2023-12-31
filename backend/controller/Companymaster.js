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

    },
    EditCompany: async (req, res) => {
        try {
            const { id } = req.params;
            console.log(req.body);
            const { name, email, phone, gst, address, pincode, image } = req.body;
            
            let imageurl = null;
            if (image) {
                const result = await cloudinary.uploader.upload(image);
                imageurl = result.url;
            }
    
            const updateData = {
                name: name,
                email: email,
                phone: phone,
                gst: gst,
                address: address,
                pincode: pincode
            };
    
            if (imageurl) {
                updateData.image = imageurl;
            }
    
            await Company.updateOne({ _id: id }, updateData);
    
            res.status(200).json({
                success: true,
                message: "Company edited successfully."
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Company Edit Failed",
                error: error.message
            });
        }
    }
    
}
