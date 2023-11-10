const express = require('express');
 const Bankcontroller = require('../controller/bankmaster');
const router = express.Router();


router.post('/addbank',Bankcontroller.AddBankMaster);
router.put('/editbank/:id',Bankcontroller.EditBankMaster);
router.get('/getallbank',Bankcontroller.GetallBank)
router.delete('/deletebank/:id',Bankcontroller.DeleteBank)
module.exports = router;
