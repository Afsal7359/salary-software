const express = require('express');
const userlogin = require('../controller/userlogin');
const userAuthMid = require('../MiddileWear/Auth-middlewear');


const router = express.Router();


router.post('/login',userlogin.LoginUser);
router.get('/userdata/:id',userAuthMid,userlogin.GetEmployeeData);
router.post('/profile-update/:id',userAuthMid,userlogin.AddProfilePhoto);
router.post('/updatepassword/:id',userlogin.UpdatePassword);

module.exports = router;