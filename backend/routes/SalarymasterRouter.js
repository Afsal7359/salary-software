const express = require('express');
const salarymaster = require('../controller/salarymaster');
const router = express.Router();


router.post('/addsalarymaster',salarymaster.AddSalarymaster);
// router.delete('/deletepost/:id',postcontroller.DeletePost)
// router.get('/getallpost',postcontroller.GetPost)


module.exports = router;