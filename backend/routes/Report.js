const express= require('express');
const Report = require('../controller/Report');
const router = express.Router();

router.post("/pfreport",Report.GetPFReport);
router.post("/esireport",Report.GetESIReport);

module.exports = router;