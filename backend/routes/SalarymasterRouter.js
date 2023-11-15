const express = require('express');
const salarymaster = require('../controller/salarymaster');
const router = express.Router();


router.post('/addsalarymaster',salarymaster.AddSalarymaster);
router.delete('/deletesalarymaster/:id',salarymaster.DeleteSalarymaster)
router.get('/getallsalary',salarymaster.GetSalarymaster)
router.post('/editsalarymaster/:id',salarymaster.EditSalaryMaster);


module.exports = router;