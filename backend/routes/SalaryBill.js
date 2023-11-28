const express= require('express');
const SalaryBill = require('../controller/SalaryBill');

const router = express.Router();

router.post('/addsalarybill',SalaryBill.AddSalaryBill);

module.exports = router;