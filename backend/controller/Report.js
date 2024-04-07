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
    },

    GetESIReport : async(req,res)=>{
        try {
            console.log(req.body,":::boooody");
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
                            { path: "EmployeeTypeId" },
                            { path: "PostId" },
                            { path: "bank"}
                        ],
                        })
                .populate('departmentid')
                .populate('unitid')
                // .populate('departmentid')
                // .populate('unitid')
                // .populate({ path: 'tablerow.salaryComponent' })
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
            res.status(500).json({
                success:false,
                message:'Error in Fetching ESI Report Data',
                error:error.message
            })
        }
    },

    GetSalaryMonthlyReport : async(req,res)=>{
        try {
            console.log(req.body,":::boooody");
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
                            { path: "EmployeeTypeId" },
                            { path: "PostId" }
                        ],
                        })
                .populate('departmentid')
                .populate('unitid')
                .populate({ path: 'tablerow.salaryComponent' })
                
                const data = salaryData.map(dataItem => {
                    return {
                      name: dataItem.employeeid.name,
                      EmployeeTypeId: dataItem.employeeid.EmployeeTypeId._id,
                      EmployeeType: dataItem.employeeid.EmployeeTypeId.name,
                      basicSalary: dataItem.basicSalary,
                      LossOfPayDays: dataItem.absentDays,
                      LossOfPay: dataItem.lossOfPay,
                      EligiblePay: dataItem.eligiblePay,
                      TotalGrossSalary: dataItem.totalAmount,
                      TotalDeduction: dataItem.totaldeduction,
                      TotalIncrement: dataItem.totalincrement,
                      tabledata: dataItem.tablerow,
                    };
                  });
              
                console.log(data);

                if (salaryData.length === 0) {
                    return res.status(404).json({
                      success: false,
                      message: 'No salary data found within the specified date range',
                    });
                  }
           
                  

                  res.status(200).json({
                    success: true,
                    message:` Salary data fetched successfully from ${fromMonth} to ${toMonth}`,
                    data: data
                  });

            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success:false,
                message:'Error in Fetching ESI Report Data',
                error:error.message
            })
        }
    },
    
}