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

}