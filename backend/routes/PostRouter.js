const express = require('express');
const postcontroller =require('../controller/Post')
const router = express.Router();


router.post('/addpost',postcontroller.AddPost);
// router.put('/edittype/:id',Typemaster.EditType);
router.delete('/deletepost/:id',postcontroller.DeletePost)
router.get('/getallpost',postcontroller.GetPost)


module.exports = router;
