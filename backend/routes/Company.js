const express = require('express');
const Companymaster = require('../controller/Companymaster');
const upload = require('../util/multer');

const router =  express.Router();

router.post('/addcompany',Companymaster.Addcompany);


module.exports = router;