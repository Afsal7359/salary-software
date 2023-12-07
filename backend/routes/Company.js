const express = require('express');
const Companymaster = require('../controller/Companymaster');
const upload = require('../util/multer');

const router =  express.Router();

router.post('/addcompany',Companymaster.Addcompany);
router.get('/getallcompany',Companymaster.GetAllCompany);
router.put('/editcompany/:id',Companymaster.EditCompany);


module.exports = router;