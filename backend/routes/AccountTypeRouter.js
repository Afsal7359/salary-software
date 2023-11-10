const express = require('express');
const Accounttypetypecontroller =require('../controller/AccountType')
const router = express.Router();


router.post('/addaccounttype',Accounttypetypecontroller.Adaccounttype);
router.put('/editaccounttype/:id',Accounttypetypecontroller.Editaccounttype);
router.delete('/deleteaccounttype/:id',Accounttypetypecontroller.Deleteaccounttype)
router.get('/getallaccounttype',Accounttypetypecontroller.Getallaccounttype)


module.exports = router;
