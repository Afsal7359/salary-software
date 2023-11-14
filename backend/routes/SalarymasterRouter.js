const express = require('express');
const salarymaster = require('../controller/salarymaster');
const router = express.Router();


router.post('/addsalarymaster',salarymaster.AddSalarymaster);
// router.delete('/deletepost/:id',postcontroller.DeletePost)
router.get('/getallsalary',salarymaster.GetSalarymaster)
router.post('/editsalarymaster/:id',salarymaster.EditSalaryMaster);


module.exports = router;