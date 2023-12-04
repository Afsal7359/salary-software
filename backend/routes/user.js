const express = require('express');
const userlogin = require('../controller/userlogin');

const router = express.Router();


router.post('/login',userlogin.LoginUser);

module.exports = router;