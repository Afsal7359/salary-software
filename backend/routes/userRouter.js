const express = require('express');
const bankmaster = require('../controller/bankmaster');
const Department = require('../controller/Department');
const Designation = require('../controller/Designation');
const Unit = require('../controller/Unit');
const Post = require('../controller/Post');
const router = express.Router();


router.get('/bankmaster',bankmaster.GetBankMaster);
router.post('/addbankmaster',bankmaster.AddBankMaster);

router.get('/department',Department.GetDepartment);
router.post('/adddepartment',Department.AddDepartment);
router.post('/updatedepartment',Department.UpdateDepartment);

router.get('/designation',Designation.GetDesignation);
router.post('/adddesignation',Designation.AddDesignation);

router.get('/unit',Unit.GetUnit);
router.post('/addunit',Unit.AddUnit);

router.get('/post',Post.GetPost)
router.post('/addpost',Post.AddPost);

module.exports = router;
