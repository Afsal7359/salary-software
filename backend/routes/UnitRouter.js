const express = require('express');
const Unit = require('../controller/Unit');
const router = express.Router();


router.post('/addUnit',Unit.AddUnit);
router.put('/editUnit/:id',Unit.EditUnit);
router.delete('/deleteUnit/:id',Unit.DeleteUnit)
router.get('/getallUnit',Unit.GetUnit)


module.exports = router;
