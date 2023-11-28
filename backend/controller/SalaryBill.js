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
                    .populate('employeeid')
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



}
