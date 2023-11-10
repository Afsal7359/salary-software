const express = require('express');
const employeemaster =require('../controller/Employeemaster')
const router = express.Router();


router.post('/addemployeetype',employeemaster.AddEmployeetype);
router.put('/editemployeetype/:id',employeemaster.EditEmployeetype);
router.delete('/deleteemployeetype/:id',employeemaster.DeleteEmployeetype)
router.get('/getallemployeetype',employeemaster.GetallEmployeetype)
router.get('/getemployeetype/:id',employeemaster.GetEmployeetype)

module.exports = router;
