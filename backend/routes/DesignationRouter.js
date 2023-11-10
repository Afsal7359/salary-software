const express = require('express');
const Designation = require('../controller/Designation');
const router = express.Router();


router.post('/addDesignation',Designation.AddDesignation);
router.put('/editDesignation/:id',Designation.EditDesignation);
router.delete('/deleteDesignation/:id',Designation.DeleteDesignation)
router.get('/getallDesignation',Designation.GetDesignation)


module.exports = router;
