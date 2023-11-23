const express = require('express');
const Purposecontroller =require('../controller/Purposemaster')
const router = express.Router();


router.post('/addpurpose',Purposecontroller.AddPurpose);
router.put('/editpurpose/:id',Purposecontroller.EditPurpose);
router.delete('/deletepurpose/:id',Purposecontroller.DeletePurpose)
router.get('/getallpurpose',Purposecontroller.GetallPurpose)
router.get('/getallpurposecount',Purposecontroller.GetpurposeCount)

module.exports = router;
