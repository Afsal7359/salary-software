const jwt = require('jsonwebtoken');
const Employee = require('../models/Employeemaster');

module.exports={
     LoginUser : async(req,res)=>{
        console.log('loginnnnnnnnnnnnnnnnnnn');
        try {
            const user = await Employee.findOne({ phone: req.body.phone })
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
                Id:user._id,
                Name:user.name,
                Email:user.email,
                Employeeid:user.employeeid,
                Department:user.PostId.department.name,
                Designation:user.PostId.designation,
                Address:user.address1,
                EmployeeNo:user.employeeno,
                Bank:user.bank,
                Phone:user.phone,
                Branch:user.branch,
                AccountNumber:user.accountnumber,
                Ifsc:user.ifsc,
                PanNo:user.panNo,
                PanName:user.panName,
                DateOfBirth:user.dateOfBirth,
                DateOfJoining:user.dateOfJoining,
                GuardianName:user.guardianName,
                BasicSalary:user.basicSalary,
                AllowedLeave:user.allowedleave,
                Gender:user.gender,
                UniversalAccountNumber:user.universalAcNo,
                City:user.city,
                Country:user.country,
                 Tablerow : user.tablerow.map(tablerow => ({
                    SalaryComponent: tablerow.salaryComponent.name,
                    Percentage: tablerow.percentage,
                    Value: tablerow.value,
                    Price: tablerow.price,
                  })),
                TotalSalary:user.TotalSalary,

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
                    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "172800" });
                    
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
                    Id:user._id,
                    Name:user.name,
                    Email:user.email,
                    Employeeid:user.employeeid,
                    Department:user.PostId.department.name,
                    Designation:user.PostId.designation,
                    Address:user.address1,
                    EmployeeNo:user.employeeno,
                    Bank:user.bank,
                    Phone:user.phone,
                    Branch:user.branch,
                    AccountNumber:user.accountNo,
                    Ifsc:user.ifsc,
                    PanNo:user.panNo,
                    PanName:user.panName,
                    DateOfBirth:user.dateOfBirth,
                    DateOfJoining:user.dateOfJoining,
                    GuardianName:user.guardianName,
                    BasicSalary:user.basicSalary,
                    AllowedLeave:user.allowedleave,
                    Gender:user.gender,
                    UniversalAccountNumber:user.universalAcNo,
                    City:user.city,
                    Country:user.country,
                     Tablerow : user.tablerow.map(tablerow => ({
                        SalaryComponent: tablerow.salaryComponent.name,
                        Percentage: tablerow.percentage,
                        Value: tablerow.value,
                        Price: tablerow.price,
                      })),
                    TotalSalary:user.TotalSalary,
    
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
    }

     }
