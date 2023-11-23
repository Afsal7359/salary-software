const express = require('express');
const Employeemaster = require('../controller/Employeemaster');
const router = express.Router();


router.post('/addemployee',Employeemaster.AddEmployee);
router.put('/editemployee/:id',Employeemaster.EditEmployee);
router.delete('/deleteemployee/:id',Employeemaster.DeleteEmployee)
router.get('/getallemployee',Employeemaster.GetallEmployee)
router.get('/getallemployeecount',Employeemaster.GetallEmployeeCount)
module.exports = router;
