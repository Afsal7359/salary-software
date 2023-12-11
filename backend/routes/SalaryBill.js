const express= require('express');
const SalaryBill = require('../controller/SalaryBill');

const router = express.Router();

router.post('/addsalarybill',SalaryBill.AddSalaryBill);
router.get('/getallSalarybill',SalaryBill.GetSalaryBill);
router.get('/deleteSalarybill/:id',SalaryBill.DeleteSalaryBill);
router.post('/editSalarybill/:id',SalaryBill.EditSalaryBill);
router.get('/getallSalarybillcount',SalaryBill.getSalaryBillCount);
router.post('/getSalarybydate',SalaryBill.GetSalaryMonthData);


module.exports = router;