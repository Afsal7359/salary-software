const express = require('express');
const Adminlogin = require('../controller/Adminlogin');
const router = express.Router();


router.post('/add-admin',Adminlogin.AddAdmin);
router.get('/get-admin',Adminlogin.GetAdmin);
router.post('/login',Adminlogin.LoginAdmin);


module.exports = router;
