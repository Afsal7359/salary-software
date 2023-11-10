const express = require('express');
const Typemaster =require('../controller/Typemaster')
const router = express.Router();


router.post('/addtype',Typemaster.AddType);
router.put('/edittype/:id',Typemaster.EditType);
router.delete('/deletetype/:id',Typemaster.DeleteType)
router.get('/getalltype',Typemaster.GetallType)


module.exports = router;
