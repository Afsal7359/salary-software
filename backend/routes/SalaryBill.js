const express= require('express');
const SalaryBill = require('../controller/SalaryBill');

const router = express.Router();

router.post('/addsalarybill',SalaryBill.AddSalaryBill);
router.get('/getallSalarybill',SalaryBill.GetSalaryBill);
router.get('/deleteSalarybill/:id',SalaryBill.DeleteSalaryBill);


module.exports = router;