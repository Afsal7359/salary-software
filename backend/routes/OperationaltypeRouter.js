const express = require('express');
const Operationaltypecontroller =require('../controller/Operationaltype')
const router = express.Router();


router.post('/addoperatinaltype',Operationaltypecontroller.Addoperational);
router.put('/editoperatinaltype/:id',Operationaltypecontroller.Editoperational);
router.delete('/deleteoperatinaltype/:id',Operationaltypecontroller.Deleteoperational)
router.get('/getalloperatinaltype',Operationaltypecontroller.Getalloperational)
router.get('/getalloperatinaltypecount',Operationaltypecontroller.GetoperationalTypeCount)

module.exports = router;
