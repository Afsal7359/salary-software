const jwt = require('jsonwebtoken');
const Employee = require('../models/Employeemaster');
const  cloudinary= require("../util/cloudinary");

module.exports={
     LoginUser : async(req,res)=>{
        console.log('loginnnnnnnnnnnnnnnnnnn');
        try {
            const user = await Employee.findOne({ phone: req.body.phone })
            .populate("EmployeeTypeId")
            .populate({
                path: "PostId",
                populate: [
                  { path: "unit" },
                  { path: "department" },
                ],
              })
              .populate({
                path: "tablerow",
                populate: [
                  { path: "salaryComponent" },
                 
                ],
              });
                console.log(user);
                const employeedata= {
                  id:user._id,
                  name:user.name,
                  email:user.email,
                  employeeid:user.employeeid,
                  employeetype:user.EmployeeTypeId.name,
                  department:user.PostId.department.name,
                  designation:user.PostId.designation,
                  address:user.address1,
                  employeeNo:user.employeeno,
                  bank:user.bank,
                  phone:user.phone,
                  branch:user.branch,
                  accountNumber:user.accountNo,
                  ifsc:user.ifsc,
                  panNo:user.panNo,
                  panName:user.panName,
                  dateOfBirth:user.dateOfBirth,
                  dateOfJoining:user.dateOfJoining,
                  guardianName:user.guardianName,
                  basicSalary:user.basicSalary,
                  allowedLeave:user.allowedleave,
                  gender:user.gender,
                  universalAccountNumber:user.universalAcNo,
                  city:user.city,
                  country:user.country,
                  image:user.image,
                   tablerow : user.tablerow.map(tablerow => ({
                       id: tablerow.id,
                      salaryComponent: tablerow.salaryComponent.name,
                      percentage: tablerow.percentage,
                      value: tablerow.value,
                      price: tablerow.price,
                    })),
                  totalSalary:user.TotalSalary,
  
              }
            if (user) {
                // const validaPassword = await bcrypt.compare(req.body.password, user.password);
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
                    
                    res.json({
                        success: true,
                        message: "user logged in successfully",
                        authtoken:token,
                        data: employeedata
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

    GetEmployeeData: async(req,res)=>{
        console.log("haaaaaaaaaaaaaaai");
        try {
            const userId = req.params.id;
            
            const user = await Employee.findById(userId)
            .populate("EmployeeTypeId")
                .populate({
                    path: "PostId",
                    populate: [
                      { path: "unit" },
                      { path: "department" },
                    ],
                  })
                  .populate({
                    path: "tablerow",
                    populate: [
                      { path: "salaryComponent" },
                     
                    ],
                  });
                    console.log(user);
                    const employeedata= {
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    employeeid:user.employeeid,
                    employeetype:user.EmployeeTypeId.name,
                    department:user.PostId.department.name,
                    designation:user.PostId.designation,
                    address:user.address1,
                    employeeNo:user.employeeno,
                    bank:user.bank,
                    phone:user.phone,
                    branch:user.branch,
                    accountNumber:user.accountNo,
                    ifsc:user.ifsc,
                    panNo:user.panNo,
                    panName:user.panName,
                    dateOfBirth:user.dateOfBirth,
                    dateOfJoining:user.dateOfJoining,
                    guardianName:user.guardianName,
                    basicSalary:user.basicSalary,
                    allowedLeave:user.allowedleave,
                    gender:user.gender,
                    universalAccountNumber:user.universalAcNo,
                    city:user.city,
                    image:user.image,
                    country:user.country,
                     tablerow : user.tablerow.map(tablerow => ({
                        id:tablerow.id,
                        salaryComponent: tablerow.salaryComponent.name,
                        percentage: tablerow.percentage,
                        value: tablerow.value,
                        price: tablerow.price,
                      })),
                    totalSalary:user.TotalSalary,
                     
                }
                res.status(200).json({
                    success: true,
                    message:"Employee Data Get Sucessfully",
                    data:employeedata
                })

        } catch (error) {
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
    },

    AddProfilePhoto: async(req,res)=>{
      try {
        const userId = req.params.id;
        const image = req.file.path;
        console.log(image,"image");
        console.log(userId,"userid");
        const result = await cloudinary.uploader.upload(image);
        const imageurl = result.url
        console.log(imageurl,"imageurlllllll");
        const user = await Employee.findById(userId);

        if(user.image){
          user.image = imageurl;
          await user.updateOne(user)
         
        }else{
          user.image = imageurl;
          await user.save();
        }

       const imagedata = user.image

       
        res.status(200).json({
          success:true,
          message:'Image Uploaded Successfully',
          data:imagedata
        })

      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Error Occured",
          error:error.message
        })
      }
    },

    UpdatePassword: async (req, res) => {
      try {
        const userId = req.params.id;
        const oldPassword = req.body.oldpassword;
        const newPassword = req.body.newpassword;
    
        // Find the user by ID
        const user = await Employee.findById(userId);
    
        // Check if the user exists
        if (!user) {
          return res.status(404).json({
            success: false,
            error: "User not found"
          });
        }
    
        // Check if the old password matches the stored password directly
        if (user.password !== oldPassword) {
          return res.status(400).json({
            success: false,
            error: "Invalid old password"
          });
        }
    
        // If old password is correct, update to the new password
        user.password = newPassword;
        await user.save();
    
        res.status(200).json({
          success: true,
          message: 'Password Updated Successfully'
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          error: "Error Occurred"
        });
      }
    }
    

     }
