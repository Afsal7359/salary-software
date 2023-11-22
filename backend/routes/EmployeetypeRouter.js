const express = require('express');
const EmployeeType =require('../controller/EmployeeType')
const router = express.Router();


router.post('/addemployeetype',EmployeeType.AddEmployeetype);
router.put('/editemployeetype/:id',EmployeeType.EditEmployeetype);
router.delete('/deleteemployeetype/:id',EmployeeType.DeleteEmployeetype)
router.get('/getallemployeetype',EmployeeType.GetallEmployeetype)
router.get('/getemployeetype/:id',EmployeeType.GetEmployeetype)
router.get('/getallemployeecount',EmployeeType.GetEmployeeTypeCount)
module.exports = router;
