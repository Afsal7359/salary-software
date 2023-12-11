const SalaryBill = require("../models/SalaryBill");


module.exports={

    AddSalaryBill:async(req,res)=>{
        try {
            const data = req.body;
            console.log('dataa:',data);
            const newPost = new SalaryBill(data);
            await newPost.save();
             // Populate the fields and return the populated post
            const Salarybill = await SalaryBill.populate(newPost, [
                { path: 'employeeid' },
                { path: 'departmentid' },
                { path: 'unitid' },
                { path: 'salaryComponent'},
              ]);
            console.log('salar bill',Salarybill);
                    res.status(200).json({
                        success: true,
                        message: "Salary Billed Added successfully.",
                        data: Salarybill,
                    });
                    console.log('Added Sucessfully');
                } catch (err) {
                  console.log(err);
                    res.status(500).json({
                        success: false,
                        message: "Failed to add Salary Master.",
                        error: err.message,
                    });
                }
            },
         GetSalaryBill:async(req,res)=>{
                try{
                    const response = await SalaryBill.find({ isdeleted: { $ne: true } }).sort({ _id: -1 })
                    .populate({
                      path: "employeeid",
                      populate: [
                       
                        { path: "PostId" }
                      ],
                    })
                    .populate('departmentid')
                    .populate('unitid')
                    .populate({ path: 'tablerow.salaryComponent' })
                    res.status(200).json({
                      success: true,
                      message: "Salary Bill data get Successfully",
                      data:response
                    });
                }catch(err){
                    res.status(500).json({
                        success: false,
                        message: "Failed to Get SalaryBill.",
                        error: err.message,
                    });
                }
            },

            DeleteSalaryBill: async (req, res) => {
                try {
                  const {id } = req.params;
            console.log("id",id);
                  // Check if an Employeetype with the specified employeeid exists
                  const existingPost = await SalaryBill.findOne({_id:id });
            
                  if (!existingPost) {
                    return res.status(404).json({
                      success: false,
                      message: "Salarbill not found.",
                      
                    });
                  }
                 
                 
                 // Soft delete by updating isdeleted field
              await SalaryBill.updateOne({ _id: id }, { $set: { isdeleted: true } });
                  res.status(200).json({
                    success: true,
                    message: "Deleted successfully.",
                  });
                } catch (err) {
                  res.status(500).json({
                    success: false,
                    message: "Failed to delete Salarymaster.",
                    error: err.message,
                  });
                }
              },

              getSalaryBillCount : async (req, res) => {
                try {
                  const SalaryBillCount = await SalaryBill.countDocuments();
                  
                  res.status(200).json({
                    success: true,
                    message: "Salary Bill count retrieved successfully.",
                    data: { count: SalaryBillCount },
                  });
                } catch (error) {
                  console.error("Error:", error);
                  res.status(500).json({
                    success: false,
                    message: "Internal server error.",
                    error: error.message,
                  });
                }
              },
              EditSalaryBill: async (req, res) => {

                try {
                  const data = req.body;
                  const {id } = req.params;
                  console.log(id,'idddddddddddddddddddddddd');
            console.log(data,'dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaas');
                  // Check if an Employee with the specified employeeid exists
                  const existingBill = await SalaryBill.findOne({ _id: id });
            
                  if (!existingBill) {
                    return res.status(404).json({
                      success: false,
                      message: "Bill not found.",
                    });
                  }
                  const updatedBill = await SalaryBill.findOneAndUpdate(
                    { _id: id },
                    data,
                    { new: true }
                  );
                  res.status(200).json({
                    success: true,
                    message: "SalaryBill edited successfully.",
                    data:updatedBill,
                  });
                } catch (err) {
                  console.log(err);
                  res.status(500).json({
                    success: false,
                    message: "Failed to edit SalaryBill.",
                    error: err.message,
                  });
                }
              },
            
           GetSalaryMonthData : async (req, res) => {
            try {
              const { fromMonth, toMonth } = req.body;
          
              // Assuming 'EmployeeSalary' is the model to fetch salary data
              const salaryData = await SalaryBill.find({
                date: {
                  $gte:  (fromMonth),
                  $lte:  (toMonth),
                },
              })
               .populate({
                      path: "employeeid",
                      populate: [
                       
                        { path: "PostId" }
                      ],
                    })
                    .populate('departmentid')
                    .populate('unitid')
                    .populate({ path: 'tablerow.salaryComponent' })
          
              if (salaryData.length === 0) {
                return res.status(404).json({
                  success: false,
                  message: 'No salary data found within the specified date range',
                });
              }
          
              res.status(200).json({
                success: true,
                message:` Salary data fetched successfully from ${fromMonth} to ${toMonth}`,
                data: salaryData,
              });
            } catch (error) {
              console.log(error);
              res.status(500).json({
                success: false,
                message: 'Error Occurred',
                error: error.message,
              });
            }
          },
              
              
}
