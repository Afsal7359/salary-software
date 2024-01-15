const express = require('express');
const Adminlogin = require('../controller/Adminlogin');
const router = express.Router();


router.post('/add-admin',Adminlogin.AddAdmin);


module.exports = router;
