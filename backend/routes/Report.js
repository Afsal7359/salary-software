const express= require('express');
const Report = require('../controller/Report');
const router = express.Router();

router.post("/pfreport",Report.GetPFReport);
router.post("/esireport",Report.GetESIReport);
router.post('/monthlyreport',Report.GetSalaryMonthlyReport);

module.exports = router;