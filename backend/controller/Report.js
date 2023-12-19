const SalaryBill = require("../models/SalaryBill");

module.exports={

    GetPFReport : async(req,res)=>{
        try {
            console.log(req.body);
            const {fromMonth,toMonth}=req.body

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
                success:false,
                message:"Server Error",
                error:error.message
            })
        }
    }
}