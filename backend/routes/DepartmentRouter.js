const express = require('express');
const Department = require('../controller/Department');
const router = express.Router();


router.post('/addDepartment',Department.AddDepartment);
router.put('/editDepartment/:id',Department.UpdateDepartment);
router.delete('/deleteDepartment/:id',Department.DeleteDepartment)
router.get('/getallDepartment',Department.GetDepartment)


module.exports = router;
