const express = require('express');
const BankAccount = require('../controller/BankAccount');
const router = express.Router();


router.post('/addbankaccount',BankAccount.AddBankAccount);
router.put('/editbankaccount/:id',BankAccount.EditBankAccount);
router.delete('/deletebankaccount/:id',BankAccount.DeleteBankAccount)
router.get('/getallbankaccount',BankAccount.GetBankAccount)


module.exports = router;
